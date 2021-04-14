import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, take, tap, timeout } from 'rxjs/operators';
import { NgGunService } from './ng-gun.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GunAuthGuard implements CanActivateChild {
  constructor(private ngGun: NgGunService, private router: Router) {}
  sessionOrRedirect() {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('gunAuthGuard checking...');
    if (this.ngGun.auth().is) {
      // console.log('OK: auth().is');
      return true;
    }
    // this.ngGun.auth().recall();
    return this.ngGun.auth().auth$.pipe(
      timeout(5000),
      catchError((err, caught) => {
        this.router.navigateByUrl('/login');
        return of({
          err: 'Session Recall Timeout',
        });
      }),
      // tap((ack) => console.log('gunAuthGuard auth$', ack)),
      filter((ack) => !ack.err),
      take(1)
    );
  }
}
