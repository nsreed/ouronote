import { Directive, Inject, Optional, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgGunService } from './ng-gun.service';
import { map, switchMap } from 'rxjs/operators';
import * as Gun from 'gun';
import { Observable } from 'rxjs';

@Directive({
  selector: '[libRouteGun]',
})
export class RouteChainDirective<T = any> {
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
  data$: Observable<T> = this.chain$.pipe(
    switchMap((chain) => chain.once() as Observable<T>)
  );
  constructor(
    private route: ActivatedRoute,
    protected ngGun: NgGunService,
    @Optional()
    @Inject('gun-route-data-key')
    private dataKey: string = 'chain'
  ) {
    this.data$.subscribe((data) => console.log({ data }));
  }
}
