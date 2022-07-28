import { Directive, Inject, Optional, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgGunService } from './ng-gun.service';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import * as Gun from 'gun';
import { Observable } from 'rxjs';
import { ChainDirective } from './chain.directive';

@Directive({
  selector: '[libRouteGun]',
})
export class RouteChainDirective<T = any> extends ChainDirective<T> {
  @Output()
  routeChain$ = this.route.data.pipe(
    map((data) => {
      const d = data[this.dataKey];
      const soul = Gun.node.soul(d);
      // console.log('route data', this.dataKey);
      return this.ngGun.auth().root.get(soul);
    }),
    shareReplay(1)
  );
  @Output()
  data$: Observable<T> = this.chain$.pipe(
    switchMap((chain) => chain.once() as Observable<T>)
  );
  constructor(
    private route: ActivatedRoute,
    ngGun: NgGunService,
    @Optional()
    @Inject('gun-route-data-key')
    private dataKey: string = 'chain'
  ) {
    super(ngGun);
    this.routeChain$.subscribe((rc) => (this.chain = rc));
  }
}
