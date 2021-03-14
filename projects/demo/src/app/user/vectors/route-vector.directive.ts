import { Route } from '@angular/compiler/src/core';
import { Directive } from '@angular/core';
import { VectorService } from './vector.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { GunChain } from '../../../../../ng-gun/src/lib/classes/GunChain';
import { VectorGraph } from '../VectorGraph';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';

@Directive({
  selector: '[appRouteVector]',
})
export class RouteVectorDirective {
  vectorNode!: GunChain<VectorGraph>;
  vectorNode$ = this.route.data.pipe(
    tap((node: any) => console.log('ROUTE SOUL', node.soul)),
    map((data) => this.ngGun.get(data.soul)),
    tap((node: any) => console.log('ROUTE NODE', node))
  ) as Observable<GunChain<VectorGraph>>;
  vector$: Observable<VectorGraph> = this.vectorNode$.pipe(
    switchMap((node) => node.on())
  );
  constructor(
    protected vectorService: VectorService,
    private route: ActivatedRoute,
    private ngGun: NgGunService
  ) {
    console.log('my soul', ngGun.auth().is.pub);
  }
}
