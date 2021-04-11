import { Inject, Injectable } from '@angular/core';
import * as Gun from 'gun';
import { GunChain } from './classes/GunChain';
import * as i0 from "@angular/core";
export const GunOptions = 'gun-options';
export class NgGunService extends GunChain {
    constructor(gunOptions, ngZone) {
        super(ngZone, new Gun(JSON.parse(JSON.stringify(gunOptions))));
        this.gunOptions = gunOptions;
    }
    get peers() {
        return this.gun._.root.opt.peers;
    }
    findAlias(alias) {
        return this.get(`~@${alias}`).once();
    }
}
NgGunService.ɵfac = function NgGunService_Factory(t) { return new (t || NgGunService)(i0.ɵɵinject(GunOptions), i0.ɵɵinject(i0.NgZone)); };
NgGunService.ɵprov = i0.ɵɵdefineInjectable({ token: NgGunService, factory: NgGunService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgGunService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [GunOptions]
            }] }, { type: i0.NgZone }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1ndW4vc3JjL2xpYi9uZy1ndW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUUzRCxPQUFPLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQztBQUczQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBQzlDLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUM7QUFLeEMsTUFBTSxPQUFPLFlBR1gsU0FBUSxRQUE0QztJQUtwRCxZQUVVLFVBQWtDLEVBQzFDLE1BQWM7UUFFZCxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFRLENBQUMsQ0FBQztRQUg5RCxlQUFVLEdBQVYsVUFBVSxDQUF3QjtJQUk1QyxDQUFDO0lBVkQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBVUQsU0FBUyxDQUFDLEtBQWE7UUFDckIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxFQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QyxDQUFDOzt3RUFsQlUsWUFBWSxjQVNiLFVBQVU7b0RBVFQsWUFBWSxXQUFaLFlBQVksbUJBRlgsTUFBTTt1RkFFUCxZQUFZO2NBSHhCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7c0JBVUksTUFBTTt1QkFBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgR3VuIGZyb20gJ2d1bic7XG5pbXBvcnQgeyBJR3VuQ2hhaW5SZWZlcmVuY2UgfSBmcm9tICdndW4vdHlwZXMvY2hhaW4nO1xuaW1wb3J0IHsgSUd1bkNvbnN0cnVjdG9yT3B0aW9ucyB9IGZyb20gJ2d1bi90eXBlcy9vcHRpb25zJztcbmltcG9ydCB7IEd1bkNoYWluIH0gZnJvbSAnLi9jbGFzc2VzL0d1bkNoYWluJztcbmV4cG9ydCBjb25zdCBHdW5PcHRpb25zID0gJ2d1bi1vcHRpb25zJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE5nR3VuU2VydmljZTxcbiAgRGF0YVR5cGUgPSBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICBSZWZlcmVuY2VLZXkgPSBhbnlcbj4gZXh0ZW5kcyBHdW5DaGFpbjxEYXRhVHlwZSwgUmVmZXJlbmNlS2V5LCAncHJlX3Jvb3QnPiB7XG4gIGdldCBwZWVycygpIHtcbiAgICByZXR1cm4gdGhpcy5ndW4uXy5yb290Lm9wdC5wZWVycztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoR3VuT3B0aW9ucylcbiAgICBwcml2YXRlIGd1bk9wdGlvbnM6IElHdW5Db25zdHJ1Y3Rvck9wdGlvbnMsXG4gICAgbmdab25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgc3VwZXIobmdab25lLCBuZXcgR3VuKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZ3VuT3B0aW9ucykpKSBhcyBhbnkpO1xuICB9XG5cbiAgZmluZEFsaWFzKGFsaWFzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoYH5AJHthbGlhc31gIGFzIGFueSkub25jZSgpO1xuICB9XG59XG4iXX0=