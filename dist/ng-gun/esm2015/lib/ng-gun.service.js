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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1ndW4vc3JjL2xpYi9uZy1ndW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUUzRCxPQUFPLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQztBQUczQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBQzlDLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUM7QUFrQnhDLE1BQU0sT0FBTyxZQUdYLFNBQVEsUUFBNEM7SUFLcEQsWUFFa0IsVUFBa0MsRUFDbEQsTUFBYztRQUVkLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQVEsQ0FBQyxDQUFDO1FBSHRELGVBQVUsR0FBVixVQUFVLENBQXdCO0lBSXBELENBQUM7SUFWRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFVRCxTQUFTLENBQUMsS0FBYTtRQUNyQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlDLENBQUM7O3dFQWxCVSxZQUFZLGNBU2IsVUFBVTtvREFUVCxZQUFZLFdBQVosWUFBWSxtQkFGWCxNQUFNO3VGQUVQLFlBQVk7Y0FIeEIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COztzQkFVSSxNQUFNO3VCQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBHdW4gZnJvbSAnZ3VuJztcbmltcG9ydCB7IElHdW5DaGFpblJlZmVyZW5jZSB9IGZyb20gJ2d1bi90eXBlcy9jaGFpbic7XG5pbXBvcnQgeyBJR3VuQ29uc3RydWN0b3JPcHRpb25zIH0gZnJvbSAnZ3VuL3R5cGVzL29wdGlvbnMnO1xuaW1wb3J0IHsgR3VuQ2hhaW4gfSBmcm9tICcuL2NsYXNzZXMvR3VuQ2hhaW4nO1xuZXhwb3J0IGNvbnN0IEd1bk9wdGlvbnMgPSAnZ3VuLW9wdGlvbnMnO1xuZXhwb3J0IHR5cGUgR3VuUGVlciA9IHtcbiAgYmF0Y2g6IGFueTtcbiAgaWQ6IHN0cmluZztcbiAgbGFzdDogc3RyaW5nO1xuICBxdWV1ZTogc3RyaW5nW107XG4gIHRhaWw6IGFueTtcbiAgdXJsOiBzdHJpbmc7XG4gIHdpcmU6IFdlYlNvY2tldDtcbn07XG5cbmV4cG9ydCB0eXBlIEd1blBlZXJzID0ge1xuICBba2V5OiBzdHJpbmddOiBHdW5QZWVyO1xufTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE5nR3VuU2VydmljZTxcbiAgRGF0YVR5cGUgPSBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICBSZWZlcmVuY2VLZXkgPSBhbnlcbj4gZXh0ZW5kcyBHdW5DaGFpbjxEYXRhVHlwZSwgUmVmZXJlbmNlS2V5LCAncHJlX3Jvb3QnPiB7XG4gIGdldCBwZWVycygpOiBHdW5QZWVycyB7XG4gICAgcmV0dXJuIHRoaXMuZ3VuLl8ucm9vdC5vcHQucGVlcnM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEd1bk9wdGlvbnMpXG4gICAgcHVibGljIHJlYWRvbmx5IGd1bk9wdGlvbnM6IElHdW5Db25zdHJ1Y3Rvck9wdGlvbnMsXG4gICAgbmdab25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgc3VwZXIobmdab25lLCBuZXcgR3VuKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZ3VuT3B0aW9ucykpKSBhcyBhbnkpO1xuICB9XG5cbiAgZmluZEFsaWFzKGFsaWFzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoYH5AJHthbGlhc31gIGFzIGFueSkub25jZSgpO1xuICB9XG59XG4iXX0=