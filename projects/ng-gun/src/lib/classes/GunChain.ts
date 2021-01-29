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
import { fromEventPattern, Observable, of } from 'rxjs';
import { filter, map, scan, shareReplay, take } from 'rxjs/operators';
import { LexicalQuery } from './LexicalQuery';

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
  private sources = new Map<string, Observable<any>>();
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

  reduce() {
    return this.from(this.gun.map())
      .on({ includeKeys: true })
      .pipe(
        scan((acc: any, val: any) => {
          if (val[0] === null) {
            delete acc[val[1]];
          } else {
            acc[val[1]] = val[0];
          }
          return acc;
        }, {} as DataType[]),
        map((v) => Object.values(v))
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
            // FIXME: this is causing an infinite recursion
            this.ngZone.run(() => {
              if (options?.includeKeys) {
                handler(data, key);
              } else {
                handler(data);
              }
            });
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
    );
  }

  auth() {
    return new GunAuthChain<DataType, ReferenceKey, false>(
      this.ngZone,
      this.gun.user() as any,
      this as any
    );
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
  ReferenceKey = any,
  IsTop extends 'pre_root' | 'root' | false = false
> extends GunChain<DataType, ReferenceKey, IsTop> {
  constructor(
    ngZone: NgZone,
    @Optional()
    @SkipSelf()
    gun: IGunChainReference<DataType, ReferenceKey, IsTop> &
      Partial<GunChainFunctions> &
      Partial<GunChainMeta>,
    @Optional() @SkipSelf() private root: GunChain
  ) {
    super(ngZone, gun);
  }

  login(alias: string, pass: string) {
    // TODO return a more useful observable
    if (this.gun._?.root) {
      const auth$ = this.root.onEvent('auth').pipe(
        filter((ack) => {
          return ack.put.alias === alias;
        }),
        take(1)
      );
      this.gun.auth(alias, pass);
      return auth$;
    }
    return null;
  }

  create(alias: string, pass: string) {
    return this.from(this.gun.create(alias, pass));
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
}

/**
 * gun.user() : AuthChain
 * gun.user(pub) : UserChain
 * gun.get('~@alias') : GunChain<{pub: string}>
 */
export class GunUserChain extends GunChain {}
