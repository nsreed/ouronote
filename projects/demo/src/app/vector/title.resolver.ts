import { VectorResolver } from './../user/vectors/vector.resolver';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleResolver implements Resolve<string> {
  constructor(private vectorResolver: VectorResolver) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> {
    return of('yep');
  }
}
