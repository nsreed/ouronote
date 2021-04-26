import { Directive, Inject, Optional, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgGunService } from './ng-gun.service';
import { map, switchMap } from 'rxjs/operators';
import * as Gun from 'gun';

@Directive({
  selector: '[libRouteGun]',
})
export class RouteChainDirective {
  @Output()
  chain$ = this.route.data.pipe(
    map((data) => {
      const d = data[this.dataKey];
      const soul = Gun.node.soul(d);
      // console.log('route data', this.dataKey);
      return this.ngGun.auth().root.get(soul);
    })
  );
  @Output()
  data$ = this.chain$.pipe(switchMap((chain) => chain.once()));
  constructor(
    private route: ActivatedRoute,
    private ngGun: NgGunService,
    @Optional()
    @Inject('gun-route-data-key')
    private dataKey: string
  ) {
    this.data$.subscribe((data) => console.log({ data }));
  }
}
