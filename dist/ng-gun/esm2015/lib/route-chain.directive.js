import { Directive, Inject, Optional, Output } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import * as Gun from 'gun';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./ng-gun.service";
export class RouteChainDirective {
    constructor(route, ngGun, dataKey = 'chain') {
        this.route = route;
        this.ngGun = ngGun;
        this.dataKey = dataKey;
        this.chain$ = this.route.data.pipe(map((data) => {
            const d = data[this.dataKey];
            const soul = Gun.node.soul(d);
            // console.log('route data', this.dataKey);
            return this.ngGun.auth().root.get(soul);
        }));
        this.data$ = this.chain$.pipe(switchMap((chain) => chain.once()));
        this.data$.subscribe((data) => console.log({ data }));
    }
}
RouteChainDirective.ɵfac = function RouteChainDirective_Factory(t) { return new (t || RouteChainDirective)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.NgGunService), i0.ɵɵdirectiveInject('gun-route-data-key', 8)); };
RouteChainDirective.ɵdir = i0.ɵɵdefineDirective({ type: RouteChainDirective, selectors: [["", "libRouteGun", ""]], outputs: { chain$: "chain$", data$: "data$" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RouteChainDirective, [{
        type: Directive,
        args: [{
                selector: '[libRouteGun]',
            }]
    }], function () { return [{ type: i1.ActivatedRoute }, { type: i2.NgGunService }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: ['gun-route-data-key']
            }] }]; }, { chain$: [{
            type: Output
        }], data$: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUtY2hhaW4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ3VuL3NyYy9saWIvcm91dGUtY2hhaW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHcEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQzs7OztBQU0zQixNQUFNLE9BQU8sbUJBQW1CO0lBYzlCLFlBQ1UsS0FBcUIsRUFDbkIsS0FBbUIsRUFHckIsVUFBa0IsT0FBTztRQUp6QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBR3JCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBakJuQyxXQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUMzQixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNYLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsMkNBQTJDO1lBQzNDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixVQUFLLEdBQWtCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNyQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQW1CLENBQUMsQ0FDcEQsQ0FBQztRQVFBLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7O3NGQXRCVSxtQkFBbUIsdUdBa0JwQixvQkFBb0I7d0RBbEJuQixtQkFBbUI7dUZBQW5CLG1CQUFtQjtjQUgvQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7YUFDMUI7O3NCQWtCSSxRQUFROztzQkFDUixNQUFNO3VCQUFDLG9CQUFvQjt3QkFoQjlCLE1BQU07a0JBREwsTUFBTTtZQVVQLEtBQUs7a0JBREosTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5qZWN0LCBPcHRpb25hbCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBOZ0d1blNlcnZpY2UgfSBmcm9tICcuL25nLWd1bi5zZXJ2aWNlJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgR3VuIGZyb20gJ2d1bic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsaWJSb3V0ZUd1bl0nLFxufSlcbmV4cG9ydCBjbGFzcyBSb3V0ZUNoYWluRGlyZWN0aXZlPFQgPSBhbnk+IHtcbiAgQE91dHB1dCgpXG4gIGNoYWluJCA9IHRoaXMucm91dGUuZGF0YS5waXBlKFxuICAgIG1hcCgoZGF0YSkgPT4ge1xuICAgICAgY29uc3QgZCA9IGRhdGFbdGhpcy5kYXRhS2V5XTtcbiAgICAgIGNvbnN0IHNvdWwgPSBHdW4ubm9kZS5zb3VsKGQpO1xuICAgICAgLy8gY29uc29sZS5sb2coJ3JvdXRlIGRhdGEnLCB0aGlzLmRhdGFLZXkpO1xuICAgICAgcmV0dXJuIHRoaXMubmdHdW4uYXV0aCgpLnJvb3QuZ2V0KHNvdWwpO1xuICAgIH0pXG4gICk7XG4gIEBPdXRwdXQoKVxuICBkYXRhJDogT2JzZXJ2YWJsZTxUPiA9IHRoaXMuY2hhaW4kLnBpcGUoXG4gICAgc3dpdGNoTWFwKChjaGFpbikgPT4gY2hhaW4ub25jZSgpIGFzIE9ic2VydmFibGU8VD4pXG4gICk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByb3RlY3RlZCBuZ0d1bjogTmdHdW5TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdCgnZ3VuLXJvdXRlLWRhdGEta2V5JylcbiAgICBwcml2YXRlIGRhdGFLZXk6IHN0cmluZyA9ICdjaGFpbidcbiAgKSB7XG4gICAgdGhpcy5kYXRhJC5zdWJzY3JpYmUoKGRhdGEpID0+IGNvbnNvbGUubG9nKHsgZGF0YSB9KSk7XG4gIH1cbn1cbiJdfQ==