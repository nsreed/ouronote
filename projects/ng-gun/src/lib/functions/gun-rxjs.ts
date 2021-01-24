import { IGunChainReference } from 'gun/types/chain';
import { AlwaysDisallowedType, ArrayAsRecord } from 'gun/types/types';
import { fromEventPattern, Observable, of } from 'rxjs';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';
import { map, scan } from 'rxjs/operators';
import { cleanGun } from './gun-common';
import { GunBase, GunKey } from './GunBase';
import { IGunOnOptions } from './IOnPipeOptions';
export * from './gun-on';
export * from './IOnPipeOptions';
const log = console;

type GunAny =
  | IGunChainReference
  | IGunChainReference<GunBase, any, 'root'>
  | IGunChainReference<GunBase, GunKey, false>;

type GunCallbackArgs<G extends GunAny> = {
  gun: G;
  options?: IGunOnOptions;
  handler?: (...args: any[]) => any;
};

type GunCallback<G extends GunAny> = ({
  gun,
  options,
  handler,
}: GunCallbackArgs<G> | any) => any;

export const fromGun = <FG extends GunAny>(fn: GunCallback<FG>) => <
  G extends GunAny
>({
  node,
  options,
}: GunCallbackArgs<G> | any) =>
  fromEventPattern(
    (eventHandler) => {
      const signal = { stop: false };
      const result = fn({ node, options, handler: eventHandler });
      eventHandler(result);
      return signal;
    },
    (_handler, signal) => {
      signal.stop = true;
    }
  );

export const not$ = (node: IGunChainReference) => {
  return fromEventPattern(
    (handler) => {
      const signal = { stop: false };
      if (node === undefined || node.not === undefined) {
        return;
      }
      node.not((key) => {
        handler(key);
      });

      return signal;
    },
    (_handler, signal) => {
      signal.stop = true;
    }
  );
};

export const once$ = <
  R = any,
  _K = keyof R,
  T extends AlwaysDisallowedType<ArrayAsRecord<R>> = AlwaysDisallowedType<
    ArrayAsRecord<R>
  >
>(
  node: IGunChainReference<R>,
  cleanup = true
): Observable<IGunChainReference<T>> => {
  if (node === null || node === undefined) {
    throw new Error('Node cannot be null');
  }
  const gunCallback: GunCallback<GunAny> = ({ gun, options, handler }) => {};
  fromGun(gunCallback);
  return fromEventPattern(
    (handler) => {
      const signal = { stop: false };
      if (node === undefined || node.not === undefined) {
        return;
      }
      node
        .not((_k) => {
          // TODO how should not() be implemented, if at all?
          // console.error(`no match for ${k}`);
          // throw new Error(`no match for ${k}`);
        })
        .once((data: any) => {
          handler(
            cleanup
              ? Object.keys(data).reduce((acc: any, k: string) => {
                  if (data[k] === null || k === '_') {
                    return acc;
                  }
                  acc[k] = data[k];
                  return acc;
                }, {})
              : data
          );
        });
      return signal;
    },
    (_handler, signal) => {
      signal.stop = true;
    }
  );
};

export const auth$ = (
  node: IGunChainReference<Record<string, any>, any, false>,
  alias: string,
  pass: string
): Observable<any> => {
  const authStart$ = fromEventPattern(
    (handler) => {
      const signal = { stop: false };
      node.auth(alias, pass, (ack: any) => {
        if (signal.stop) {
          return;
        }
        if (ack.err) {
          log.error(ack);
          handler(ack);
        } else {
          handler(ack);
        }
      });
      return signal;
    },
    (_handler, signal) => {
      signal.stop = true;
    }
  );

  return authStart$;
};

/**
 *
 * @param node the gun node to map
 * @param cleanup if true, remove gun metadata properties from output
 * @param keys if true, provide results as key/value pairs
 * @param reduce if true, reduce/scan results into single object
 */
export function map$(
  node: IGunChainReference,
  cleanup = false,
  keys = true,
  reduce = false
): Observable<any> {
  if (!node) {
    console.warn('no node given');
    return of({});
  } else if (!node.map) {
    console.warn('node given is not a gun node... %o', node);
    return of({});
  }
  const source$ = fromEventPattern(
    (handler: NodeEventHandler) => {
      const signal = { stop: false };
      try {
        const gunMap = (
          data: any,
          key: any,
          _at?: any,
          ev?: { off: () => void }
        ) => {
          // console.log({ data, key, at, ev });
          if (signal.stop) {
            ev?.off();
            return;
          }
          // modifying data directly does not seem to work...
          const callbackData = cleanup ? cleanGun(data) : data;
          const callbackArgs = [callbackData, key];
          handler(...callbackArgs);
        };

        ((node as any).map$() as any).on$(gunMap);
      } catch (e: any) {
        console.error('map$ encounted an error:', {
          error: e instanceof Error ? (e as Error) : e,
          node,
          cleanup,
          keys,
          reduce,
        });
      }
      return signal;
    },
    (_handler, signal) => {
      signal.stop = true;
    }
  );
  if (!reduce) {
    return source$;
  }

  return source$.pipe(
    scan((acc: any, val: any) => {
      if (val[0] === null) {
        delete acc[val[1]];
        return acc;
      }
      acc[val[1]] = val[0];
      return acc;
    }, {}),
    map((values) => Object.values(values))
  );
}
