import { IGunChainReference } from 'gun/types/chain';
import { Observable, fromEventPattern } from 'rxjs';
import { GunBase } from '../directives/GunBase';
import { cleanGun } from './gun-common';
import { IGunOnOptions, OnDefaultOptions } from './IOnPipeOptions';

export const on$ = <
  G extends IGunChainReference | IGunChainReference<GunBase, any, 'root'>
>(
  {
    node,
    options,
  }:
    | {
        node: G;
        options?: IGunOnOptions;
      }
    | any,
  ...args: any[]
): Observable<Partial<G>> => {
  if (args?.length === 1) {
    options = { ...args, ...(options || {}) };
  }
  options = { ...OnDefaultOptions, ...(options || {}) };
  if (!node) {
    console.error('on$ called without node!');
    return;
  }
  return fromEventPattern(
    (handler) => {
      // there is no way to off() an on() until at least one value is trigerred
      // so that we can access the event listener to off() it
      const signal = { stop: false };
      // zone.run(() => {
      (node as IGunChainReference)
        .not((k) => {
          const message = `no match for ${k}`;
          // throw new Error(message);
          console.log(message);
        })
        .on(
          (
            data: any,
            key: string | number,
            at?: any,
            ev?: { off: () => void }
          ) => {
            if (signal.stop) {
              ev.off();
            } else {
              handler(
                typeof data === 'string'
                  ? data
                  : options.cleanup
                  ? cleanGun(data)
                  : data
              );
            }
          },
          options.change
        );
      // });
      return signal;
    },
    (handler, signal) => {
      signal.stop = true;
    }
  );
};
