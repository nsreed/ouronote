import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { VectorService } from './vector.service';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';

@Injectable({
  providedIn: 'root',
})
export class VectorResolver implements Resolve<boolean> {
  constructor(
    private vectorService: VectorService,
    private ngGun: NgGunService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.vectorService.vectors
      .get(route.params.soul)
      .once()
      .pipe(
        tap((vector: any) => console.log('got vector', vector)),
        switchMap((vector: any) =>
          vector ? of(vector) : this.ngGun.get(route.params.soul).once()
        ),
        tap((vector: any) => console.log('got vector', vector)),
        map((post: any) => post._)
      );
  }
}
