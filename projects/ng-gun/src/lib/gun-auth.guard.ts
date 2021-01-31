import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { NgGunService } from './ng-gun.service';

@Injectable({
  providedIn: 'root',
})
export class GunAuthGuard implements CanActivateChild {
  constructor(private ngGun: NgGunService) {}
  sessionOrRedirect() {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('gunAuthGuard checking...');
    if (this.ngGun.auth().is) {
      console.log('OK: auth().is');
      return true;
    }
    return this.ngGun.auth().auth$.pipe(
      tap((ack) => console.log('gunAuthGuard auth$', ack)),
      filter((ack) => !ack.err),
      map((ack) => true),
      take(1)
    );
  }
}
