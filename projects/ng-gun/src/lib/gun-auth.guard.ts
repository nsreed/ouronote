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
import { LogService } from '../../../log/src/lib/log.service';

@Injectable({
  providedIn: 'root',
})
export class GunAuthGuard implements CanActivateChild {
  constructor(
    private ngGun: NgGunService,
    private router: Router,
    private logger: LogService
  ) {}
  sessionOrRedirect() {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.ngGun.auth().is) {
      return true;
    }
    return this.ngGun.auth().auth$.pipe(
      timeout(5000),
      catchError((err, caught) => {
        sessionStorage.setItem('redirect', state.url);

        this.router.navigateByUrl('/login');
        return of({
          err: 'Session Recall Timeout',
        });
      }),
      filter((ack) => !ack.err),
      take(1)
    );
  }
}
