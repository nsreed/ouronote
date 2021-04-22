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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1ndW4vc3JjL2xpYi9uZy1ndW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUUzRCxPQUFPLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQztBQUczQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBRTlDLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUM7QUFJeEMsTUFBTSxPQUFPLFlBR1gsU0FBUSxRQUE0QztJQUtwRCxZQUVrQixVQUFrQyxFQUNsRCxNQUFjO1FBRWQsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBUSxDQUFDLENBQUM7UUFIdEQsZUFBVSxHQUFWLFVBQVUsQ0FBd0I7SUFJcEQsQ0FBQztJQVZELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDbkMsQ0FBQztJQVVELFNBQVMsQ0FBQyxLQUFhO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssRUFBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUMsQ0FBQzs7d0VBbEJVLFlBQVksY0FTYixVQUFVO29EQVRULFlBQVksV0FBWixZQUFZLG1CQUZYLE1BQU07dUZBRVAsWUFBWTtjQUh4QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQVVJLE1BQU07dUJBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIEd1biBmcm9tICdndW4nO1xuaW1wb3J0IHsgSUd1bkNoYWluUmVmZXJlbmNlIH0gZnJvbSAnZ3VuL3R5cGVzL2NoYWluJztcbmltcG9ydCB7IElHdW5Db25zdHJ1Y3Rvck9wdGlvbnMgfSBmcm9tICdndW4vdHlwZXMvb3B0aW9ucyc7XG5pbXBvcnQgeyBHdW5DaGFpbiB9IGZyb20gJy4vY2xhc3Nlcy9HdW5DaGFpbic7XG5pbXBvcnQgeyBHdW5QZWVycyB9IGZyb20gJy4vR3VuUGVlcnMnO1xuZXhwb3J0IGNvbnN0IEd1bk9wdGlvbnMgPSAnZ3VuLW9wdGlvbnMnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE5nR3VuU2VydmljZTxcbiAgRGF0YVR5cGUgPSBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICBSZWZlcmVuY2VLZXkgPSBhbnlcbj4gZXh0ZW5kcyBHdW5DaGFpbjxEYXRhVHlwZSwgUmVmZXJlbmNlS2V5LCAncHJlX3Jvb3QnPiB7XG4gIGdldCBwZWVycygpOiBHdW5QZWVycyB7XG4gICAgcmV0dXJuIHRoaXMuZ3VuLl8ucm9vdC5vcHQucGVlcnM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEd1bk9wdGlvbnMpXG4gICAgcHVibGljIHJlYWRvbmx5IGd1bk9wdGlvbnM6IElHdW5Db25zdHJ1Y3Rvck9wdGlvbnMsXG4gICAgbmdab25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgc3VwZXIobmdab25lLCBuZXcgR3VuKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZ3VuT3B0aW9ucykpKSBhcyBhbnkpO1xuICB9XG5cbiAgZmluZEFsaWFzKGFsaWFzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoYH5AJHthbGlhc31gIGFzIGFueSkub25jZSgpO1xuICB9XG59XG4iXX0=