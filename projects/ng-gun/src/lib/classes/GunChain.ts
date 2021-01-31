import { Inject, Injectable, NgZone, Optional, SkipSelf } from '@angular/core';
import * as Gun from 'gun';
import { IGunChainReference } from 'gun/types/chain';
import { IGunStaticSEA } from 'gun/types/static/sea';
import {
  AlwaysDisallowedType,
  ArrayAsRecord,
  ArrayOf,
  DisallowArray,
  DisallowPrimitives,
} from 'gun/types/types';
import { from, fromEventPattern, Observable, of, throwError } from 'rxjs';
import {
  delay,
  filter,
  map,
  mergeAll,
  mergeMap,
  retryWhen,
  scan,
  shareReplay,
  take,
} from 'rxjs/operators';
import { LexicalQuery } from './LexicalQuery';
import { tap } from 'rxjs/operators';

export const GUN_NODE = Symbol('GUN_NODE');

export interface GunChainCallbackOptions {
  includeKeys?: boolean;
}

export interface GunChainFunctions {
  secret: (value: any) => IGunChainReference;
  grant: (value: any) => IGunChainReference;
}

export interface GunChainMeta {
  _: any;
}

@Injectable()
export class GunChain<
  DataType = Record<string, any>,
  ReferenceKey = any,
  IsTop extends 'pre_root' | 'root' | false = false
> {
  constructor(
    protected ngZone: NgZone,
    @Optional()
    @Inject(GUN_NODE)
    public gun: IGunChainReference<DataType, ReferenceKey, IsTop> &
      Partial<GunChainFunctions> &
      Partial<GunChainMeta>
  ) {
    if (!gun) {
      this.gun = new Gun() as any;
    } else {
      this.gun = gun;
    }
  }
  private sources = new Map<string, Observable<any>>();
  private _auth: GunAuthChain<DataType, ReferenceKey> | null = null;
  SEA: IGunStaticSEA & {
    certify: (
      certificants: any,
      policies: any,
      authority: any,
      cb?: any,
      opt?: any
    ) => Promise<any>;
  } = Gun.SEA as any;

  from<T>(gun: IGunChainReference<T>) {
    return new GunChain<T>(this.ngZone, gun);
  }

  get<K extends keyof DataType>(
    key: ArrayOf<DataType> extends never ? K : ArrayOf<DataType>
  ) {
    return this.from(this.gun.get(key));
  }

  put(
    data: Partial<
      AlwaysDisallowedType<DisallowPrimitives<IsTop, DisallowArray<DataType>>>
    >
  ) {
    return this.from(this.gun.put(data));
  }

  set(
    data: AlwaysDisallowedType<
      DataType extends Array<infer U>
        ? U extends {
            [key: string]: any;
            [key: number]: any;
          }
          ? ArrayOf<DataType>
          : never
        : never
    >
  ) {
    return this.from(this.gun.set(data));
  }

  unset(data: ArrayOf<DataType>) {
    if (this.gun.unset) {
      return this.from(this.gun.unset(data));
    } else {
      throw new Error('CANNOT FIND Gun.chain.unset!');
    }
  }

  query(query: LexicalQuery): GunChain<DataType, ReferenceKey, IsTop> {
    return this.from(this.gun.get(query as any)) as any;
  }

  map() {
    return this.from(this.gun.map());
  }

  reduce(options?: GunChainCallbackOptions) {
    return this.from(this.gun.map())
      .on({ includeKeys: true })
      .pipe(
        scan((acc: any, val: any) => {
          if (val[0] === null || undefined === val[0]) {
            delete acc[val[1]];
          } else {
            acc[val[1]] = val[0];
          }
          return acc;
        }, {} as DataType[]),
        map((v) =>
          options?.includeKeys
            ? v
            : Object.values(v).filter((v) => v !== undefined)
        )
      );
  }

  on(
    options?: GunChainCallbackOptions
  ): Observable<AlwaysDisallowedType<ArrayAsRecord<DataType>>> {
    return fromEventPattern(
      (handler) => {
        const signal = { stopped: false };
        this.gun.on(
          (
            data: AlwaysDisallowedType<ArrayAsRecord<DataType>>,
            key,
            at?: any,
            ev?: any
          ) => {
            if (signal.stopped) {
              return ev.off();
            }
            const dispatchHandler = () => {
              if (options?.includeKeys) {
                handler(data, key);
              } else {
                handler(data);
              }
            };
            // FIXME: this is causing an infinite recursion?
            this.ngZone.run(dispatchHandler);
          }
        );
        return signal;
      },
      (handler, signal) => {
        signal.stopped = true;
      }
    );
  }

  once() {
    return fromEventPattern(
      (handler) => {
        const signal = { stopped: false };
        this.gun.once(
          (
            data:
              | AlwaysDisallowedType<ArrayAsRecord<DataType>>
              | DisallowPrimitives<
                  IsTop,
                  AlwaysDisallowedType<ArrayAsRecord<DataType>>
                >
              | undefined,
            key,
            at?: any,
            ev?: any
          ) => {
            if (ev && signal.stopped) {
              return ev.off();
            }
            this.ngZone.run(() => {
              handler(data);
            });
          }
        );
        return signal;
      },
      (handler, signal) => {
        signal.stopped = true;
      }
    ).pipe(take(1));
  }

  auth() {
    if (!this._auth) {
      this._auth = new GunAuthChain<DataType, ReferenceKey>(
        this.ngZone,
        // FIXME gun.user.is is static! can't have multiple logins on a single gun instance
        this.gun.user() as any,
        this as any
      );
    }
    return this._auth;
  }

  user(pubKey?: string) {
    return this.from(this.gun.user(pubKey));
  }

  onEvent(event: string, node = this.gun): Observable<any> {
    if (!this.sources.has(event)) {
      const source = fromEventPattern((handler) => {
        // console.log('add handler');
        (node as any).on(event, (...args: any) => {
          this.ngZone.run(() => {
            handler(...args);
          });
        });
      }).pipe(shareReplay(1));
      this.sources.set(event, source);
    }
    return this.sources.get(event) as Observable<any>;
  }
}

export class GunAuthChain<
  DataType = Record<string, any>,
  ReferenceKey = any
> extends GunChain<DataType, ReferenceKey, false> {
  is: any;
  auth$ = this.root.onEvent('auth').pipe(
    tap((ack) => {
      if (!ack.err) {
        this.is = ack.put;
      }
    }),
    shareReplay(1)
  );

  constructor(
    ngZone: NgZone,
    @Optional()
    @SkipSelf()
    gun: IGunChainReference<DataType, ReferenceKey, false> &
      Partial<GunChainFunctions> &
      Partial<GunChainMeta>,
    @Optional() @SkipSelf() public root: GunChain
  ) {
    super(ngZone, gun);
  }

  login(alias: string, pass: string) {
    const auth$ = this.root.onEvent('auth').pipe(
      filter((ack) => !ack.err),
      filter((ack) => {
        return ack.put.alias === alias;
      }),
      take(1)
    );

    const login$ = fromEventPattern(
      (handler) => {
        const signal = { stopped: false };
        this.gun.auth(alias, pass, (ack: any) => {
          this.ngZone.run(() => {
            handler(ack);
          });
        });
        return signal;
      },
      (handler, signal) => {
        signal.stopped = true;
      }
    ).pipe(
      mergeMap((ack: any) => (ack.wait ? throwError(new Error(ack)) : of(ack))),
      retryWhen((errors) => errors.pipe(delay(1000), take(10)))
    );
    const loginOrAuth$ = from([auth$, login$]).pipe(mergeAll(), take(1));
    return loginOrAuth$;
  }

  create(alias: string, pass: string) {
    const auth$ = this.root.onEvent('auth').pipe(
      filter((ack) => {
        return ack.put.alias === alias;
      }),
      take(1)
    );
    this.gun.create(alias, pass);
    return auth$;
  }

  secret(value: any) {
    if (this.gun.secret) {
      return this.from(this.gun.secret(value));
    }
    throw new Error('GUN.chain.secret NOT FOUND');
  }

  from<T>(gun: IGunChainReference<T>) {
    return new GunAuthChain<T>(this.ngZone, gun, this.root);
  }

  certify(certificants: any, policies: any, authority: any) {
    return from(this.SEA.certify(certificants, policies, authority));
  }

  recall() {
    this.gun.recall({ sessionStorage: true }, (ack) => {
      console.log('recall ack', ack);
    });
    return this.auth$;
  }

  logout() {
    this.gun.leave();
  }
}

/**
 * gun.user() : AuthChain
 * gun.user(pub) : UserChain
 * gun.get('~@alias') : GunChain<{pub: string}>
 */
export class GunUserChain extends GunChain {}
