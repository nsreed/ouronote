import { Pipe } from '@angular/core';
import * as Gun from 'gun';
import * as i0 from "@angular/core";
export class UpdatedPipe {
    transform(value, ...args) {
        const updates = Gun.node.is(value) ? value._['>'] : null;
        if (!updates) {
            return null;
        }
        return Object.values(updates).reduce((latest, time) => (time > latest ? time : latest), 0);
    }
}
UpdatedPipe.ɵfac = function UpdatedPipe_Factory(t) { return new (t || UpdatedPipe)(); };
UpdatedPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "updated", type: UpdatedPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UpdatedPipe, [{
        type: Pipe,
        args: [{
                name: 'updated',
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlZC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ3VuL3NyYy9saWIvdXBkYXRlZC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDOztBQUszQixNQUFNLE9BQU8sV0FBVztJQUN0QixTQUFTLENBQUMsS0FBVSxFQUFFLEdBQUcsSUFBZTtRQUN0QyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUUsS0FBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FDbEMsQ0FBQyxNQUFXLEVBQUUsSUFBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQzNELENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7c0VBVlUsV0FBVzs2REFBWCxXQUFXO3VGQUFYLFdBQVc7Y0FIdkIsSUFBSTtlQUFDO2dCQUNKLElBQUksRUFBRSxTQUFTO2FBQ2hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgR3VuIGZyb20gJ2d1bic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3VwZGF0ZWQnLFxufSlcbmV4cG9ydCBjbGFzcyBVcGRhdGVkUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgLi4uYXJnczogdW5rbm93bltdKTogdW5rbm93biB7XG4gICAgY29uc3QgdXBkYXRlcyA9IEd1bi5ub2RlLmlzKHZhbHVlKSA/ICh2YWx1ZSBhcyBhbnkpLl9bJz4nXSA6IG51bGw7XG4gICAgaWYgKCF1cGRhdGVzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXModXBkYXRlcykucmVkdWNlKFxuICAgICAgKGxhdGVzdDogYW55LCB0aW1lOiBhbnkpID0+ICh0aW1lID4gbGF0ZXN0ID8gdGltZSA6IGxhdGVzdCksXG4gICAgICAwXG4gICAgKTtcbiAgfVxufVxuIl19