import { AsyncPipe } from '@angular/common';
import { Optional, Pipe, } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SEA } from 'gun';
import { from } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./ng-gun.service";
import * as i2 from "./ng-sea.service";
import * as i3 from "./chain.directive";
export class VerifyPipe extends AsyncPipe {
    constructor(ngGun, sea, ref, chain) {
        super(ref);
        this.ngGun = ngGun;
        this.sea = sea;
        this.ref = ref;
        this.chain = chain;
    }
    transform(value, ...args) {
        var _a;
        if (!this.chain.chain) {
            return null;
        }
        return from(SEA.verify(value, (_a = this.chain.chain) === null || _a === void 0 ? void 0 : _a.recordPub.replace('~', ''))).pipe(
        // tap((v) => console.log('verified', v)),
        tap((v) => this.ref.detectChanges()));
        // ) as any;
    }
}
VerifyPipe.ɵfac = function VerifyPipe_Factory(t) { return new (t || VerifyPipe)(i0.ɵɵdirectiveInject(i1.NgGunService), i0.ɵɵdirectiveInject(i2.NgSeaService), i0.ɵɵinjectPipeChangeDetectorRef(), i0.ɵɵdirectiveInject(i3.ChainDirective, 8)); };
VerifyPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "verify", type: VerifyPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VerifyPipe, [{
        type: Pipe,
        args: [{
                name: 'verify',
            }]
    }], function () { return [{ type: i1.NgGunService }, { type: i2.NgSeaService }, { type: i0.ChangeDetectorRef }, { type: i3.ChainDirective, decorators: [{
                type: Optional
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1ndW4vc3JjL2xpYi92ZXJpZnkucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxFQUVMLFFBQVEsRUFDUixJQUFJLEdBRUwsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFvQixHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzFCLE9BQU8sRUFBTSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBTWhDLE1BQU0sT0FBTyxVQUFXLFNBQVEsU0FBUztJQUN2QyxZQUNVLEtBQW1CLEVBQ25CLEdBQWlCLEVBQ2pCLEdBQXNCLEVBRXRCLEtBQXFCO1FBRTdCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQU5ILFVBQUssR0FBTCxLQUFLLENBQWM7UUFDbkIsUUFBRyxHQUFILEdBQUcsQ0FBYztRQUNqQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUV0QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUcvQixDQUFDO0lBQ0QsU0FBUyxDQUFDLEtBQVUsRUFBRSxHQUFHLElBQVc7O1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNyQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQ1QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFFBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLDBDQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUNoRSxDQUFDLElBQUk7UUFDSiwwQ0FBMEM7UUFDMUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQzlCLENBQUM7UUFDVCxZQUFZO0lBQ2QsQ0FBQzs7b0VBckJVLFVBQVU7MkRBQVYsVUFBVTt1RkFBVixVQUFVO2NBSHRCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNmOztzQkFNSSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXN5bmNQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBPcHRpb25hbCxcbiAgUGlwZSxcbiAgUGlwZVRyYW5zZm9ybSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAsIHRha2UsIHBsdWNrLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOZ1NlYVNlcnZpY2UgfSBmcm9tICcuL25nLXNlYS5zZXJ2aWNlJztcbmltcG9ydCB7IENoYWluRGlyZWN0aXZlIH0gZnJvbSAnLi9jaGFpbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU0VBIH0gZnJvbSAnZ3VuJztcbmltcG9ydCB7IG9mLCBmcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOZ0d1blNlcnZpY2UgfSBmcm9tICcuL25nLWd1bi5zZXJ2aWNlJztcblxuQFBpcGUoe1xuICBuYW1lOiAndmVyaWZ5Jyxcbn0pXG5leHBvcnQgY2xhc3MgVmVyaWZ5UGlwZSBleHRlbmRzIEFzeW5jUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nR3VuOiBOZ0d1blNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzZWE6IE5nU2VhU2VydmljZSxcbiAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKClcbiAgICBwcml2YXRlIGNoYWluOiBDaGFpbkRpcmVjdGl2ZVxuICApIHtcbiAgICBzdXBlcihyZWYpO1xuICB9XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmICghdGhpcy5jaGFpbi5jaGFpbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBmcm9tKFxuICAgICAgU0VBLnZlcmlmeSh2YWx1ZSwgdGhpcy5jaGFpbi5jaGFpbj8ucmVjb3JkUHViLnJlcGxhY2UoJ34nLCAnJykpXG4gICAgKS5waXBlKFxuICAgICAgLy8gdGFwKCh2KSA9PiBjb25zb2xlLmxvZygndmVyaWZpZWQnLCB2KSksXG4gICAgICB0YXAoKHYpID0+IHRoaXMucmVmLmRldGVjdENoYW5nZXMoKSlcbiAgICApIGFzIGFueTtcbiAgICAvLyApIGFzIGFueTtcbiAgfVxufVxuIl19