import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { NgGunService } from './ng-gun.service';

@Injectable({
  providedIn: 'root',
})
export class SoulResolverService<T> implements Resolve<T> {
  constructor(private ngGun: NgGunService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const soul = route.params.soul;
    return this.ngGun.get(soul).once();
  }
}
