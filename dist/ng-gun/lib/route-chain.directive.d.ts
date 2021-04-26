import { ActivatedRoute } from '@angular/router';
import { NgGunService } from './ng-gun.service';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RouteChainDirective<T = any> {
    private route;
    protected ngGun: NgGunService;
    private dataKey;
    chain$: Observable<import("ng-gun").GunChain<any, any, false>>;
    data$: Observable<T>;
    constructor(route: ActivatedRoute, ngGun: NgGunService, dataKey?: string);
    static ɵfac: i0.ɵɵFactoryDef<RouteChainDirective<any>, [null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<RouteChainDirective<any>, "[libRouteGun]", never, {}, { "chain$": "chain$"; "data$": "data$"; }, never>;
}
//# sourceMappingURL=route-chain.directive.d.ts.map