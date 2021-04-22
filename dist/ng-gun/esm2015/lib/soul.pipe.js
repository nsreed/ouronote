import { Pipe } from '@angular/core';
import * as Gun from 'gun';
import * as i0 from "@angular/core";
export class SoulPipe {
    transform(value, ...args) {
        return Gun.node.is(value) ? Gun.node.soul(value) : undefined;
    }
}
SoulPipe.ɵfac = function SoulPipe_Factory(t) { return new (t || SoulPipe)(); };
SoulPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "soul", type: SoulPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SoulPipe, [{
        type: Pipe,
        args: [{
                name: 'soul',
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291bC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ3VuL3NyYy9saWIvc291bC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDOztBQUszQixNQUFNLE9BQU8sUUFBUTtJQUNuQixTQUFTLENBQUMsS0FBYyxFQUFFLEdBQUcsSUFBZTtRQUMxQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQy9ELENBQUM7O2dFQUhVLFFBQVE7dURBQVIsUUFBUTt1RkFBUixRQUFRO2NBSHBCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsTUFBTTthQUNiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgR3VuIGZyb20gJ2d1bic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3NvdWwnLFxufSlcbmV4cG9ydCBjbGFzcyBTb3VsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IHVua25vd24sIC4uLmFyZ3M6IHVua25vd25bXSk6IHVua25vd24ge1xuICAgIHJldHVybiBHdW4ubm9kZS5pcyh2YWx1ZSkgPyBHdW4ubm9kZS5zb3VsKHZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgfVxufVxuIl19