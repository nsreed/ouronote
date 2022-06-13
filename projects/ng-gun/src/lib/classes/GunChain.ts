import {
  EventEmitter,
  Inject,
  Injectable,
  NgZone,
  Optional,
  SkipSelf,
} from '@angular/core';
import * as Gun from 'gun';
import { IGunChainReference } from 'gun/types/chain';
import {
  AlwaysDisallowedType,
  ArrayAsRecord,
  ArrayOf,
  DisallowArray,
  DisallowPrimitives,
  IGunCryptoKeyPair,
} from 'gun/types/types';
import {
  from,
  fromEventPattern,
  Observable,
  of,
  ReplaySubject,
  throwError,
  timer,
} from 'rxjs';
import {
  debounceTime,
  delay,
  filter,
  map,
  mergeAll,
  mergeMap,
  pluck,
  retryWhen,
  scan,
  shareReplay,
  take,
  tap,
  timeout,
} from 'rxjs/operators';
import { LogService } from '../../../../log/src/lib/log.service';
import { gunChainArray, gunPath } from '../functions/gun-utils';
import { GunRuntimeOpts } from '../GunRuntimeOpts';
import { NgGunSessionService } from '../ng-gun-session.service';
import { ICertStore } from './ICertStore';
import { LexicalQuery } from './LexicalQuery';

export const GUN_NODE = Symbol('GUN_NODE');

export interface GunChainCallbackOptions {
  includeKeys?: boolean;
  includeNulls?: boolean;
  changes?: boolean;
  bypassZone?: boolean;
  clean?: boolean;
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
  logger = LogService.getLogger('gun-chain');
  settings = {
    retryPut: false,
  };

  protected get userPair() {
    return (this.gun.user() as any).is;
  }
  protected get userPub() {
    return this.userPair.pub;
  }
  protected get myKey() {
    return (this.gun as any)._.get;
  }

  private _path!: string[];
  get path() {
    this._path = this._path || gunPath(this.gun as any);
    return this._path;
  }
  protected get pubs() {
    return this.path.filter((key) => key.startsWith('~'));
  }
  get recordPub(): string {
    return this.pubs[0];
  }
  private _chainArray!: any[];
  get chainArray() {
    this._chainArray = this._chainArray || gunChainArray(this.gun as any);
    return this._chainArray;
  }
  get record() {
    const firstPub = this.path.findIndex((k) => k.startsWith('~'));
    return this.chainArray[firstPub];
  }

  private _pathFromRecord!: any[];
  get pathFromRecord() {
    if (!this._pathFromRecord) {
      const p = [...this.path];
      p.reverse();
      const recordIndex = p.findIndex((v) => v === this.recordPub);
      this._pathFromRecord = p.slice(recordIndex);
    }
    return this._pathFromRecord;
  }
  get keyInRecord() {
    return this.pathFromRecord[1];
  }
  get isNested() {
    return this.pubs.length > 0 && this.recordPub.indexOf(this.userPub) < 0;
  }
  get isSubRoot() {
    return this.myKey === this.recordPub;
  }

  _allCertificates$!: Observable<ICertStore>;
  get allCertificates$(): Observable<ICertStore> {
    if (!this._allCertificates$) {
      if (this.isNested) {
        if (this.isSubRoot) {
          const ac$ = new ReplaySubject(1);
          this.record.get('certs').open((certs: any) => ac$.next(certs));
          this._allCertificates$ = ac$ as any;
        } else {
          this._allCertificates$ = this.closestRoot.allCertificates$;
        }
      } else {
        this._allCertificates$ = of({});
      }
    }
    return this._allCertificates$;
  }

  get pathCertificates$(): Observable<any> {
    return this.allCertificates$.pipe(pluck(this.keyInRecord));
  }

  private _userCertificate$!: Observable<any>;
  get userCertificate$(): Observable<any> {
    if (!this._userCertificate$) {
      this._userCertificate$ = this.pathCertificates$.pipe(
        tap((certs) => console.log('looking for user in ', certs)),
        pluck(this.userPub),
        shareReplay(1)
      );
    }
    return this._userCertificate$;
  }

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
    const userPair = (this.gun.user() as any).is;
    if (!userPair) {
      // TODO figure out how to handle this case
      this.logger.warn(
        'User is not logged in, certificates for %s will not be loaded.',
        this.myKey
      );
      return;
    }

    if (this.isNested) {
      this.logger.verbose('foreign key', this.path.join(' > '));

      if (this.isSubRoot) {
        this.record?.get('certs').open((certs: any) => {
          this.certificates = certs;
        });
      } else {
        const pathCerts$ = this.closestRoot.certificates$.pipe(
          tap((store) =>
            this.logger.verbose(
              'closestRoot cert store looking for',
              this.keyInRecord,
              store
            )
          ),
          pluck(this.keyInRecord),
          filter((pathStore) => pathStore !== null && pathStore !== undefined)
        );
        pathCerts$
          .pipe(
            pluck(userPair.pub),
            filter((c) => c !== null && c !== undefined),
            take(1)
          )
          .subscribe((store: any) => {
            this.logger.verbose('user certificate', store);
            this.certificate = store;
          });
        pathCerts$
          .pipe(
            pluck('*'),
            filter((c) => c !== null && c !== undefined),
            take(1)
          )
          .subscribe((store: any) => {
            this.logger.verbose('public certificate', store);
            this.certificate = this.certificate || store;
          });
        this.back?.certificate$.subscribe((c) => {
          this.logger.verbose('certificate from back emitter', c);
          this.certificate = this.certificate || c;
        });
      }
    }
  }

  public get canEdit(): boolean {
    return (
      !this.isNested ||
      (this.certificate !== null && this.certificate !== undefined)
    );
  }

  private _closestRoot: any;
  get closestRoot(): GunChain {
    if (this._closestRoot) {
      return this._closestRoot;
    }
    let c: any = this;
    do {
      if (c.isSubRoot) {
        break;
      }
      c = c.back;
    } while (c !== null);
    this._closestRoot = c;
    return c;
  }

  constructor(
    protected ngZone: NgZone,
    @Optional()
    @Inject(GUN_NODE)
    gun: IGunChainReference<DataType, ReferenceKey, IsTop> &
      GunChainFunctions &
      GunChainMeta,
    @Optional()
    @SkipSelf()
    protected back: GunChain<any>
  ) {
    if (!gun) {
      this.logger.warn('Constructing gun with no options');
      this.gun = new Gun() as any;
    } else {
      this.gun = gun;
    }
  }

  certificate$ = new ReplaySubject<string>(1);
  private _certificate?: string | undefined;
  public get certificate(): string | undefined {
    return this._certificate || this.back?.certificate;
  }
  public set certificate(value: string | undefined) {
    this._certificate = value;
  }

  certificates$ = new ReplaySubject<ICertStore>(1);
  private _certificates: ICertStore = {};
  public get certificates(): ICertStore {
    if (!this.isSubRoot && this.closestRoot?.certificates) {
      return this.closestRoot.certificates;
    }
    return this._certificates;
  }
  public set certificates(value: ICertStore) {
    if (value !== this._certificates) {
      this.logger.verbose('loaded certificate store', value);
      this._certificates = value;
      this.certificates$.next(value);
    }
  }

  private sources = new Map<string, Observable<any>>();
  protected _auth: GunAuthChain<DataType, ReferenceKey> | null = null;

  from<T>(gun: IGunChainReference<T>): GunChain<T> {
    return new GunChain<T>(this.ngZone, gun as any, this);
  }

  public get updateTime(): number {
    return (
      ((Object.values(this.gun._.put._['>']) as number[]) || {}).reduce(
        (acc: number, v: number) => (v > acc ? v : acc),
        0
      ) || 0
    );
  }

  get<K extends keyof DataType>(
    key: ArrayOf<DataType> extends never ? K : ArrayOf<DataType>
  ) {
    const soul: ArrayOf<DataType> extends never ? K : ArrayOf<DataType> =
      this.getSoul(key);
    return this.from(this.gun.get(soul));
  }

  put(
    data: Partial<
      AlwaysDisallowedType<DisallowPrimitives<IsTop, DisallowArray<DataType>>>
    >,
    certificate = this.certificate
  ) {
    // FIXME "unverified data" - certified put values must be signed?

    if (this.isNested && !certificate) {
      // FIXME This should wait for the certificate and attempt another put?
      this.logger.warn('NO CERTIFICATE FOUND FOR FOREIGN RECORD!');
      // this.put(data);
    }
    (this.gun.put as any)(
      data,
      (...putAck: any[]) => {
        const err = putAck[0].err;
        if (err) {
          switch (err) {
            case 'Unverified data.':
              this.logger.verbose(`Message: ${JSON.stringify(err)}`);
              break;
            case 'Error: No ACK yet.':
              this.logger.log('No ACK yet.');
              timer(500)
                .pipe(
                  take(1),
                  filter(() => this.settings.retryPut)
                )
                .subscribe(() => {
                  this.logger.log('Retrying');
                  this.put(data, certificate);
                });
              break;
            default:
              this.logger.error(`Message: ${JSON.stringify(err)}`);
          }
        }
      },
      certificate ? { opt: { cert: certificate } } : undefined
    );
    return this;
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
    certificate = this.certificate
  ) {
    return this.from(
      this.gun.set(
        data,
        undefined,
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
        if (val[0] === null || val[0] === undefined) {
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
            if (options?.clean) {
              delete (data as any)._;
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

  auth(recall = true) {
    if (!this._auth) {
      this._auth = new GunAuthChain<DataType, ReferenceKey>(
        this.ngZone,
        //// no fix for this... gun.user.is is static! can't have multiple logins on a single gun instance
        // TODO allow option to create a new gun instance for this auth call
        this.gun.user().recall({ sessionStorage: recall }) as any,
        this as any,
        this as any
      );
      // this._auth.logout$.subscribe(()=>this._auth = null);
    }
    return this._auth;
  }

  logout() {
    this._auth = null;
  }

  user(pubKey?: string) {
    return this.from(this.gun.user(pubKey?.replace(/^~/, '')));
  }

  onEvent(event: string, node = this.gun): Observable<any> {
    if (!this.sources.has(event)) {
      const source = fromEventPattern((handler) => {
        // this.logger.log('add handler');
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
  logger = LogService.getLogger('gun-auth-chain');

  private _is: any;
  set is(value: any) {
    this._is = value;

    if (value) {
      this.root
        .get(`~${value.pub}`)
        .get('alias')
        .once()
        .subscribe((alias: any) => {
          this.alias = this.gun._.root.user?._?.put?.alias;
        });
      let pair = this.gun._.root?.user?.is;
      pair = 'object' === typeof pair?.alias ? pair?.alias : pair;
    }
  }
  get is() {
    return this._is || (this.gun.user() as any).is;
  }
  alias!: string;
  auth$ = this.root.onEvent('auth').pipe(
    tap((ack) => {
      this.logger.log(
        'authentication event. put present? %s; is gun node? %s',
        ack.put ? 'yes' : 'no',
        ack.$ ? 'yes' : 'no'
      );
      if (!ack.err) {
        this.is = ack.put || ack.root?.user?.is;
        this.session?.setSession(this.is);
      } else {
        this.logger.warn('authentication error: ', ack.put);
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
    @Optional() @SkipSelf() public root: GunChain,
    @Optional() @SkipSelf() back: GunChain,
    @Optional() @SkipSelf() protected session?: NgGunSessionService
  ) {
    super(ngZone, gun as any, back);

    this.is = (gun as any).is;
    // session?.session$.subscribe((p) => {
    //   this.logger.log('got pair ', p?.pub);
    //   if (p?.pub && p?.priv) {
    //     if (this.is) {
    //       this.logger.log('this.is', this.is);
    //     } else {
    //       this.login(p).subscribe();
    //     }
    //   }
    // });
  }

  login(alias: string | IGunCryptoKeyPair, pass?: string) {
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
        const handleAck = (ack: any) => {
          this.ngZone.run(() => {
            handler(ack);
          });
        };
        if (pass) {
          this.gun.auth(alias as any, pass as any, handleAck);
        } else {
          this.gun.auth(alias as any, handleAck as any);
        }
        return signal;
      },
      (handler, signal) => {
        signal.stopped = true;
      }
    ).pipe(
      mergeMap((ack: any) => (ack.wait ? throwError(new Error(ack)) : of(ack))),
      retryWhen((errors) => errors.pipe(delay(1000), take(10)))
    );
    const loginOrAuth$ = from([auth$, login$]).pipe(
      mergeAll(),
      take(1),
      shareReplay(1)
    );
    loginOrAuth$.subscribe();
    return loginOrAuth$;
  }

  create(alias: string, pass: string) {
    const auth$ = this.root.onEvent('auth').pipe(
      filter((ack) => {
        return ack.put.alias === alias;
      })
    );
    const ack$ = new EventEmitter();
    try {
      return from([ack$, auth$]).pipe(mergeAll(), take(1));
    } catch (e) {
      return from([ack$, auth$]).pipe(mergeAll(), take(1));
    } finally {
      this.gun.create(alias, pass, (ack) => {
        ack$.emit(ack);
      });
    }
  }

  secret(value: any) {
    if (this.gun.secret) {
      return this.from(this.gun.secret(value));
    }
    throw new Error('GUN.chain.secret NOT FOUND');
  }

  from<T>(gun: IGunChainReference<T>) {
    return new GunAuthChain<T>(
      this.ngZone,
      gun,
      this.root,
      this as any,
      this.session
    );
  }

  recall() {
    this.gun.recall({ sessionStorage: true });
    return this.auth$.pipe(timeout(5000));
  }

  logout() {
    this.is = null;
    this.gun.leave();
    // TODO find a better way to clear current user graph
    timer(750).subscribe(() => (document.location = document.location));
  }
  put(
    data: Partial<
      AlwaysDisallowedType<DisallowPrimitives<IsTop, DisallowArray<DataType>>>
    >,
    certificate = this.certificate
  ) {
    // SEA.sign(data, this.is.alias);
    super.put(data, certificate);
    return this;
  }
}

/** Represents a node nested under a user/pair
 * gun.user() : AuthChain
 * gun.user(pub) : UserChain
 * gun.get('~@alias') : GunChain<{pub: string}>
 */
export class GunCertChain extends GunChain {}
