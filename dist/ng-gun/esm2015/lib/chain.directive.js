import { Directive, Input, EventEmitter } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./ng-gun.service";
export class ChainDirective {
    constructor(ngGun) {
        this.ngGun = ngGun;
        this._chain$ = new EventEmitter();
        this.chain$ = this._chain$.pipe(shareReplay(1));
    }
    get chain() {
        return this._chain;
    }
    set chain(value) {
        if (value !== this._chain) {
            this._chain = value;
            this._chain$.emit(value);
        }
    }
}
ChainDirective.ɵfac = function ChainDirective_Factory(t) { return new (t || ChainDirective)(i0.ɵɵdirectiveInject(i1.NgGunService)); };
ChainDirective.ɵdir = i0.ɵɵdefineDirective({ type: ChainDirective, selectors: [["", "gunChain", ""]], inputs: { chain: ["gunChain", "chain"] }, exportAs: ["gunChain"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ChainDirective, [{
        type: Directive,
        args: [{
                // tslint:disable-next-line: directive-selector
                selector: '[gunChain]',
                exportAs: 'gunChain',
            }]
    }], function () { return [{ type: i1.NgGunService }]; }, { chain: [{
            type: Input,
            args: ['gunChain']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ3VuL3NyYy9saWIvY2hhaW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU83QyxNQUFNLE9BQU8sY0FBYztJQWdCekIsWUFBb0IsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUgvQixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUMvQyxXQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFRCxDQUFDO0lBZDNDLElBQVcsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFDVyxLQUFLLENBQUMsS0FBMkI7UUFDMUMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7OzRFQVhVLGNBQWM7bURBQWQsY0FBYzt1RkFBZCxjQUFjO2NBTDFCLFNBQVM7ZUFBQztnQkFDVCwrQ0FBK0M7Z0JBQy9DLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUUsVUFBVTthQUNyQjsrREFPWSxLQUFLO2tCQURmLEtBQUs7bUJBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3VuQ2hhaW4gfSBmcm9tICcuL2NsYXNzZXMvR3VuQ2hhaW4nO1xuaW1wb3J0IHsgTmdHdW5TZXJ2aWNlIH0gZnJvbSAnLi9uZy1ndW4uc2VydmljZSc7XG5pbXBvcnQgeyBzaGFyZVJlcGxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW2d1bkNoYWluXScsXG4gIGV4cG9ydEFzOiAnZ3VuQ2hhaW4nLFxufSlcbmV4cG9ydCBjbGFzcyBDaGFpbkRpcmVjdGl2ZSB7XG4gIHByaXZhdGUgX2NoYWluPzogR3VuQ2hhaW4gfCB1bmRlZmluZWQ7XG4gIHB1YmxpYyBnZXQgY2hhaW4oKTogR3VuQ2hhaW4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbjtcbiAgfVxuICBASW5wdXQoJ2d1bkNoYWluJylcbiAgcHVibGljIHNldCBjaGFpbih2YWx1ZTogR3VuQ2hhaW4gfCB1bmRlZmluZWQpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2NoYWluKSB7XG4gICAgICB0aGlzLl9jaGFpbiA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2hhaW4kLmVtaXQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NoYWluJCA9IG5ldyBFdmVudEVtaXR0ZXI8R3VuQ2hhaW4+KCk7XG4gIGNoYWluJCA9IHRoaXMuX2NoYWluJC5waXBlKHNoYXJlUmVwbGF5KDEpKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nR3VuOiBOZ0d1blNlcnZpY2UpIHt9XG59XG4iXX0=