import { GunChain } from './classes/GunChain';
import { NgGunService } from './ng-gun.service';
import * as i0 from "@angular/core";
export declare class ChainDirective {
    private ngGun;
    private _chain?;
    get chain(): GunChain | undefined;
    set chain(value: GunChain | undefined);
    private _chain$;
    chain$: import("rxjs").Observable<GunChain<Record<string, any>, any, false>>;
    constructor(ngGun: NgGunService);
    static ɵfac: i0.ɵɵFactoryDef<ChainDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<ChainDirective, "[gunChain]", ["gunChain"], { "chain": "gunChain"; }, {}, never>;
}
//# sourceMappingURL=chain.directive.d.ts.map