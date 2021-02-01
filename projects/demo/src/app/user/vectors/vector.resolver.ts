import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { VectorService } from './vector.service';

@Injectable({
  providedIn: 'root',
})
export class VectorResolver implements Resolve<boolean> {
  constructor(private vectorService: VectorService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.vectorService.vectors
      .get(route.params.soul)
      .once()
      .pipe(map((post: any) => post._));
  }
}
