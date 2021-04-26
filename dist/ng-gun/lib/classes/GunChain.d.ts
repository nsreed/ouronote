import { NgZone } from '@angular/core';
import { IGunChainReference } from 'gun/types/chain';
import { AlwaysDisallowedType, ArrayAsRecord, ArrayOf, DisallowArray, DisallowPrimitives } from 'gun/types/types';
import { Observable, Subject } from 'rxjs';
import { GunRuntimeOpts } from '../GunRuntimeOpts';
import { ICertStore } from './ICertStore';
import { LexicalQuery } from './LexicalQuery';
import * as i0 from "@angular/core";
export declare const GUN_NODE: unique symbol;
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
export declare class GunChain<DataType = Record<string, any>, ReferenceKey = any, IsTop extends 'pre_root' | 'root' | false = false> {
    protected ngZone: NgZone;
    path: string[];
    isNested: boolean;
    recordPub: any;
    record?: any;
    certificate: string;
    certificate$: Subject<string>;
    private _gun;
    get gun(): IGunChainReference<DataType, ReferenceKey, IsTop> & GunChainFunctions & GunChainMeta;
    set gun(value: IGunChainReference<DataType, ReferenceKey, IsTop> & GunChainFunctions & GunChainMeta);
    get canEdit(): boolean;
    constructor(ngZone: NgZone, gun: IGunChainReference<DataType, ReferenceKey, IsTop> & GunChainFunctions & GunChainMeta);
    certificates: ICertStore;
    private sources;
    private _auth;
    from<T>(gun: IGunChainReference<T>): GunChain<T, any, false>;
    get<K extends keyof DataType>(key: ArrayOf<DataType> extends never ? K : ArrayOf<DataType>): GunChain<DataType[K], any, false>;
    put(data: Partial<AlwaysDisallowedType<DisallowPrimitives<IsTop, DisallowArray<DataType>>>>, certificate?: string): this;
    set(data: AlwaysDisallowedType<DataType extends Array<infer U> ? U extends {
        [key: string]: any;
        [key: number]: any;
    } ? ArrayOf<DataType> : never : never>, certificate?: string): GunChain<ArrayOf<DataType>, any, false>;
    unset(data: ArrayOf<DataType>): GunChain<DataType, any, false>;
    query(query: LexicalQuery): GunChain<DataType, ReferenceKey, IsTop>;
    load(): Observable<unknown>;
    open(): Observable<unknown>;
    map(options?: GunChainCallbackOptions): GunChain<ArrayOf<DataType>, any, false>;
    reduce(options?: GunChainCallbackOptions): Observable<any>;
    not(): Observable<unknown>;
    on(options?: GunChainCallbackOptions): Observable<AlwaysDisallowedType<ArrayAsRecord<DataType>>>;
    once(): Observable<unknown>;
    auth(): GunAuthChain<DataType, ReferenceKey, false>;
    user(pubKey?: string): GunChain<Record<string, any>, any, false>;
    onEvent(event: string, node?: IGunChainReference<DataType, ReferenceKey, IsTop> & GunChainFunctions & GunChainMeta): Observable<any>;
    protected getSoul(key: any): any;
    static ɵfac: i0.ɵɵFactoryDef<GunChain<any, any, any>, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<GunChain<any, any, any>>;
}
/** Represents a top-level authenticated node (user or key pair) */
export declare class GunAuthChain<DataType = Record<string, any>, ReferenceKey = any, IsTop = false> extends GunChain<DataType, ReferenceKey, false> {
    root: GunChain;
    private _is;
    set is(value: any);
    get is(): any;
    alias: string;
    auth$: Observable<any>;
    constructor(ngZone: NgZone, gun: IGunChainReference<DataType, ReferenceKey, false> & Partial<GunChainFunctions> & Partial<GunChainMeta>, root: GunChain);
    login(alias: string, pass: string): Observable<any>;
    create(alias: string, pass: string): Observable<any>;
    secret(value: any): GunAuthChain<Record<string, any>, any, false>;
    from<T>(gun: IGunChainReference<T>): GunAuthChain<T, any, false>;
    recall(): Observable<any>;
    logout(): void;
    put(data: Partial<AlwaysDisallowedType<DisallowPrimitives<IsTop, DisallowArray<DataType>>>>, certificate?: string): this;
}
/** Represents a node nested under a user/pair
 * gun.user() : AuthChain
 * gun.user(pub) : UserChain
 * gun.get('~@alias') : GunChain<{pub: string}>
 */
export declare class GunCertChain extends GunChain {
}
//# sourceMappingURL=GunChain.d.ts.map