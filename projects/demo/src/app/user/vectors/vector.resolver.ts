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
import { NgGunService } from 'ng-gun';
import { catchError } from 'rxjs/operators';
import { LogService } from 'log';

@Injectable({
  providedIn: 'root',
})
export class VectorResolver implements Resolve<boolean> {
  constructor(
    private vectorService: VectorService,
    private ngGun: NgGunService,
    private router: Router,
    private logger: LogService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.vectorService.vectors
      .get(route.params.soul)
      .once()
      .pipe(
        switchMap((vector: any) =>
          vector ? of(vector) : this.ngGun.get(route.params.soul).once()
        ),
        // tap((vector: any) => console.log('got vector', vector)),
        map((vector: any) => vector._)
      );
  }
}
