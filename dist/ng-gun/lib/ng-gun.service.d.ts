import { NgZone } from '@angular/core';
import { IGunConstructorOptions } from 'gun/types/options';
import { GunChain } from './classes/GunChain';
import { GunPeers } from './GunPeers';
import * as i0 from "@angular/core";
export declare const GunOptions = "gun-options";
export declare class NgGunService<DataType = Record<string, any>, ReferenceKey = any> extends GunChain<DataType, ReferenceKey, 'pre_root'> {
    readonly gunOptions: IGunConstructorOptions;
    get peers(): GunPeers;
    constructor(gunOptions: IGunConstructorOptions, ngZone: NgZone);
    findAlias(alias: string): import("rxjs").Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDef<NgGunService<any, any>, never>;
    static ɵprov: i0.ɵɵInjectableDef<NgGunService<any, any>>;
}
//# sourceMappingURL=ng-gun.service.d.ts.map