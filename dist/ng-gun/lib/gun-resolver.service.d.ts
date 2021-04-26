import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NgGunService } from './ng-gun.service';
import * as i0 from "@angular/core";
export declare class GunResolverService<T> implements Resolve<T> {
    private ngGun;
    constructor(ngGun: NgGunService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDef<GunResolverService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDef<GunResolverService<any>>;
}
//# sourceMappingURL=gun-resolver.service.d.ts.map