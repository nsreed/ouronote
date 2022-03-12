import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of, from, merge } from 'rxjs';
import {
  map,
  switchMap,
  tap,
  filter,
  mergeAll,
  take,
  mergeMap,
  combineAll,
} from 'rxjs/operators';
import { VectorService } from './vector.service';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VectorResolver implements Resolve<boolean> {
  constructor(
    private vectorService: VectorService,
    private ngGun: NgGunService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const vectorNode = this.vectorService.vectors.get(route.params.soul);
    const not$ = vectorNode.not().pipe(
      tap((v) => {
        console.error('could not find vector');
        throw new Error('vector not found');
      })
    );
    const exists$ = vectorNode.once().pipe(
      // tap((vector: any) => console.log('got vector', vector)),
      filter((vector: any) => vector),
      switchMap((vector: any) =>
        vector ? of(vector) : this.ngGun.get(route.params.soul).once()
      ),
      // tap((vector: any) => console.log('got vector', vector)),
      map((vector: any) => vector._)
    );
    return from([not$, exists$]).pipe(
      mergeAll(),
      catchError((err) => {
        this.router.navigateByUrl(
          (route as any)._urlSegment.segments[0].path === 'user'
            ? '/user/vectors'
            : ''
        );
        return EMPTY;
      }),
      take(1)
    );
  }
}
