import { AsyncPipe } from '@angular/common';
import { Pipe } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./ng-gun.service";
export class AliasPipe extends AsyncPipe {
    constructor(ngGun, _ref) {
        super(_ref);
        this.ngGun = ngGun;
    }
    transform(value, ...args) {
        if (value === '*') {
            return of(value);
        }
        return this.ngGun
            .get(`~${value.replace('~', '')}`)
            .on()
            .pipe(map((v) => v.alias || value), shareReplay(1));
    }
}
AliasPipe.ɵfac = function AliasPipe_Factory(t) { return new (t || AliasPipe)(i0.ɵɵdirectiveInject(i1.NgGunService), i0.ɵɵinjectPipeChangeDetectorRef()); };
AliasPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "alias", type: AliasPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AliasPipe, [{
        type: Pipe,
        args: [{
                name: 'alias',
            }]
    }], function () { return [{ type: i1.NgGunService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWd1bi9zcmMvbGliL2FsaWFzLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBcUIsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQUUsR0FBRyxFQUFRLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUsxQixNQUFNLE9BQU8sU0FBVSxTQUFRLFNBQVM7SUFDdEMsWUFBb0IsS0FBbUIsRUFBRSxJQUF1QjtRQUM5RCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFETSxVQUFLLEdBQUwsS0FBSyxDQUFjO0lBRXZDLENBQUM7SUFDRCxTQUFTLENBQUMsS0FBVSxFQUFFLEdBQUcsSUFBVztRQUNsQyxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUU7WUFDakIsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEI7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLO2FBQ2QsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNqQyxFQUFFLEVBQUU7YUFDSixJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUNqQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ2YsQ0FBQztJQUNOLENBQUM7O2tFQWZVLFNBQVM7eURBQVQsU0FBUzt1RkFBVCxTQUFTO2NBSHJCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsT0FBTzthQUNkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXN5bmNQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0d1blNlcnZpY2UgfSBmcm9tICcuL25nLWd1bi5zZXJ2aWNlJztcbmltcG9ydCB7IG1hcCwgdGFrZSwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdhbGlhcycsXG59KVxuZXhwb3J0IGNsYXNzIEFsaWFzUGlwZSBleHRlbmRzIEFzeW5jUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nR3VuOiBOZ0d1blNlcnZpY2UsIF9yZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoX3JlZik7XG4gIH1cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIC4uLmFyZ3M6IGFueVtdKTogYW55IHtcbiAgICBpZiAodmFsdWUgPT09ICcqJykge1xuICAgICAgcmV0dXJuIG9mKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubmdHdW5cbiAgICAgIC5nZXQoYH4ke3ZhbHVlLnJlcGxhY2UoJ34nLCAnJyl9YClcbiAgICAgIC5vbigpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh2OiBhbnkpID0+IHYuYWxpYXMgfHwgdmFsdWUpLFxuICAgICAgICBzaGFyZVJlcGxheSgxKVxuICAgICAgKTtcbiAgfVxufVxuIl19