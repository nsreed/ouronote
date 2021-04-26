import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./ng-gun.service";
export class GunResolverService {
    constructor(ngGun) {
        this.ngGun = ngGun;
    }
    resolve(route, state) {
        const soul = route.params.soul;
        return this.ngGun.auth().root.get(soul).once();
    }
}
GunResolverService.ɵfac = function GunResolverService_Factory(t) { return new (t || GunResolverService)(i0.ɵɵinject(i1.NgGunService)); };
GunResolverService.ɵprov = i0.ɵɵdefineInjectable({ token: GunResolverService, factory: GunResolverService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GunResolverService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.NgGunService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VuLXJlc29sdmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1ndW4vc3JjL2xpYi9ndW4tcmVzb2x2ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFZM0MsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUFvQixLQUFtQjtRQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO0lBQUcsQ0FBQztJQUMzQyxPQUFPLENBQ0wsS0FBNkIsRUFDN0IsS0FBMEI7UUFFMUIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDL0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakQsQ0FBQzs7b0ZBUlUsa0JBQWtCOzBEQUFsQixrQkFBa0IsV0FBbEIsa0JBQWtCLG1CQUZqQixNQUFNO3VGQUVQLGtCQUFrQjtjQUg5QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICBSZXNvbHZlLFxuICBSb3V0ZXJTdGF0ZVNuYXBzaG90LFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmdHdW5TZXJ2aWNlIH0gZnJvbSAnLi9uZy1ndW4uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBHdW5SZXNvbHZlclNlcnZpY2U8VD4gaW1wbGVtZW50cyBSZXNvbHZlPFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0d1bjogTmdHdW5TZXJ2aWNlKSB7fVxuICByZXNvbHZlKFxuICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90XG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3Qgc291bCA9IHJvdXRlLnBhcmFtcy5zb3VsO1xuICAgIHJldHVybiB0aGlzLm5nR3VuLmF1dGgoKS5yb290LmdldChzb3VsKS5vbmNlKCk7XG4gIH1cbn1cbiJdfQ==