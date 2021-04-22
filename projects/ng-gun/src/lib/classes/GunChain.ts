import { Inject, Injectable, NgZone, Optional, SkipSelf } from '@angular/core';
import * as Gun from 'gun';
import { IGunChainReference } from 'gun/types/chain';
import {
  AlwaysDisallowedType,
  ArrayAsRecord,
  ArrayOf,
  DisallowArray,
  DisallowPrimitives,
} from 'gun/types/types';
import {
  from,
  fromEventPattern,
  Observable,
  of,
  Subject,
  throwError,
} from 'rxjs';
import {
  debounceTime,
  delay,
  filter,
  map,
  mergeAll,
  mergeMap,
  retryWhen,
  scan,
  shareReplay,
  take,
  tap,
  timeout,
} from 'rxjs/operators';
import { gunChainArray, gunPath } from '../functions/gun-utils';
import { GunRuntimeOpts } from '../GunRuntimeOpts';
import { ICertStore } from './ICertStore';
import { LexicalQuery } from './LexicalQuery';

export const GUN_NODE = Symbol('GUN_NODE');

export interface GunChainCallbackOptions {
  includeKeys?: boolean;
  includeNulls?: boolean;
  changes?: boolean;
  bypassZone?: boolean;
}

export interface GunChainFunctions {
  secret: (value: any) => IGunChainReference;
  grant: (value: any) => IGunChainReference;
}

export interface GunChainMeta {
  _: {
    root: {
      opt: GunRuntimeOpts;
    };
  } & any;
}

@Injectable()
export class GunChain<
  DataType = Record<string, any>,
  ReferenceKey = any,
  IsTop extends 'pre_root' | 'root' | false = false
> {
  path!: string[];
  isNested = false;
  recordPub!: any;
  record?: any;
  certificate!: string;

  certificate$ = new Subject<string>();

  private _gun!: IGunChainReference<DataType, ReferenceKey, IsTop> &
    GunChainFunctions &
    GunChainMeta;
  public get gun(): IGunChainReference<DataType, ReferenceKey, IsTop> &
    GunChainFunctions &
    GunChainMeta {
    return this._gun;
  }
  public set gun(
    value: IGunChainReference<DataType, ReferenceKey, IsTop> &
      GunChainFunctions &
      GunChainMeta
  ) {
    this._gun = value;
    const myKey = (value as any)._.get;

    const path = gunPath(value as any);
    const chainArray = gunChainArray(value as any);
    this.path = path;

    const userPair = (this.gun.user() as any).is;
    if (!userPair) {
      // TODO figure out how to handle this case

      return;
    }
    const myPub = `~${(this.gun.user() as any).is?.pub}`;
    const pubs = path.filter((key) => key.startsWith('~'));
    if (pubs.length === 0 || pubs[0] !== myPub) {
      pubs.push(myPub);
    }
    if (pubs.length > 1) {
      this.isNested = true;
      this.recordPub = pubs[0];
      const firstPub = path.findIndex((key) => key.startsWith('~'));
      const pathFromRecord = [...path];
      const recordPath = pathFromRecord.splice(firstPub).reverse();
      pathFromRecord.reverse();

      if (myKey === this.recordPub) {
        // console.log('sub root', myKey);
      } else {
        const keyInRecord = pathFromRecord[0];
        const record = chainArray[firstPub];
        const recordCerts = record.get('certs');
        const pathCerts = recordCerts.get(keyInRecord);
        const myCert = pathCerts.get(userPair.pub);
        // console.log('  %s', keyInRecord);
        myCert.on(async (cert: any) => {
          if (cert === null || cert === undefined) {
            return;
          }
          // console.log('cert', cert);
          // TODO verify cert later, the await causes chained put() calls to fail
          // const verified = await SEA.verify(
          //   cert,
          //   this.recordPub.replace('~', '')
          // );
          this.certificate = cert;
          this.certificate$.next(cert);
          // console.log(
          //   'verified cert for %s.%s',
          //   this.recordPub,
          //   keyInRecord,
          //   pathFromRecord.join('.')
          // );
        });

        this.record = record;
      }
    }
  }

  constructor(
    protected ngZone: NgZone,
    @Optional()
    @Inject(GUN_NODE)
    gun: IGunChainReference<DataType, ReferenceKey, IsTop> &
      GunChainFunctions &
      GunChainMeta
  ) {
    if (!gun) {
      this.gun = new Gun() as any;
    } else {
      this.gun = gun;
    }
  }
  certificates: ICertStore = {};
  private sources = new Map<string, Observable<any>>();
  private _auth: GunAuthChain<DataType, ReferenceKey> | null = null;

  from<T>(gun: IGunChainReference<T>) {
    return new GunChain<T>(this.ngZone, gun as any);
  }

  get<K extends keyof DataType>(
    key: ArrayOf<DataType> extends never ? K : ArrayOf<DataType>
  ) {
    const soul: ArrayOf<DataType> extends never
      ? K
      : ArrayOf<DataType> = this.getSoul(key);
    return this.from(this.gun.get(soul));
  }

  put(
    data: Partial<
      AlwaysDisallowedType<DisallowPrimitives<IsTop, DisallowArray<DataType>>>
    >,
    certificate: string = this.certificate
  ) {
    // FIXME "unverified data" - certified put values must be signed?

    if (this.isNested && !certificate) {
      console.warn('NO CERTIFICATE FOUND FOR FOREIGN RECORD!');
    }
    const result = this.from(
      (this.gun.put as any)(
        data,
        null,
        certificate ? { opt: { cert: certificate } } : undefined
      )
    );
    // this.once().subscribe((me) => {
    //   console.log('me', me);
    // });
    return result;
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
    >,
    certificate: string = this.certificate
  ) {
    return this.from(
      this.gun.set(
        data,
        null,
        certificate
          ? {
              opt: {
                cert: certificate,
              },
            }
          : undefined
      )
    );
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

  load() {
    // return this.from((this.gun as any).load((d: any) => d) as any);
    return fromEventPattern(
      (handler) => {
        const signal = { stopped: false };
        (this.gun as any).load((data: any) => {
          const converted = data;
          this.ngZone.run(() => {
            handler(converted);
          });
        });
        return signal;
      },
      (handler, signal) => {
        signal.stopped = true;
      }
    ).pipe(take(1));
  }
  open() {
    // return this.from((this.gun as any).load((d: any) => d) as any);
    return fromEventPattern(
      (handler) => {
        const signal = { stopped: false };
        (this.gun as any).open((data: any) => {
          const converted = data;
          this.ngZone.run(() => {
            handler(converted);
          });
        });
        return signal;
      },
      (handler, signal) => {
        signal.stopped = true;
      }
    ).pipe(debounceTime(25));
  }

  map(options?: GunChainCallbackOptions) {
    return this.from(this.gun.map());
  }

  reduce(options?: GunChainCallbackOptions) {
    const base = this.from(this.gun.map());

    return base.on({ includeKeys: true }).pipe(
      scan((acc: any, val: any) => {
        if (val[0] === null || undefined === val[0]) {
          delete acc[val[1]];
        } else {
          acc[val[1]] = val[0];
        }
        return acc;
      }, {} as DataType[]),
      map((v) =>
        options?.includeNulls
          ? v
          : Object.values(v).filter((ov) => ov !== undefined)
      ),
      debounceTime(100)
    );
  }

  not() {
    return fromEventPattern((handler) => {
      const signal = { stopped: false };
      if (this.gun.not) {
        this.gun.not((key: ReferenceKey) => {
          handler(key);
        });
      }
    });
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
            // FIXME: ngZone.run() causes infinite recursion
            if (options?.bypassZone) {
              dispatchHandler();
            } else {
              this.ngZone.run(dispatchHandler);
            }
          },
          options as any
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
        //// no fix for this... gun.user.is is static! can't have multiple logins on a single gun instance
        // TODO allow option to create a new gun instance for this auth call
        this.gun.user().recall({ sessionStorage: true }) as any,
        this as any
      );
    }
    return this._auth;
  }

  user(pubKey?: string) {
    return this.from(this.gun.user(pubKey?.replace(/^~/, '')));
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

  protected getSoul(key: any) {
    return typeof key === 'object' && Gun.node.is(key)
      ? (Gun.node.soul(key) as any)
      : key;
  }
}

/** Represents a top-level authenticated node (user or key pair) */
export class GunAuthChain<
  DataType = Record<string, any>,
  ReferenceKey = any,
  IsTop = false
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
    super(ngZone, gun as any);
    this.is = (gun as any).is;
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

  recall() {
    this.gun.recall({ sessionStorage: true });
    return this.auth$.pipe(timeout(5000));
  }

  logout() {
    this.gun.leave();
  }
  put(
    data: Partial<
      AlwaysDisallowedType<DisallowPrimitives<IsTop, DisallowArray<DataType>>>
    >,
    certificate: string = this.certificate
  ) {
    return super.put(data, certificate);
  }
}

/** Represents a node nested under a user/pair
 * gun.user() : AuthChain
 * gun.user(pub) : UserChain
 * gun.get('~@alias') : GunChain<{pub: string}>
 */
export class GunCertChain extends GunChain {}
