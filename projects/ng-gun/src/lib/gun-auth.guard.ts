import { Injectable, Optional } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
} from '@angular/router';
import { firstValueFrom, Observable, of } from 'rxjs';
import { catchError, filter, map, take, tap, timeout } from 'rxjs/operators';
import { NgGunService } from './ng-gun.service';
import { Router } from '@angular/router';
import { LogService } from 'log';
import { NgGunSessionService } from './ng-gun-session.service';

@Injectable({
  providedIn: 'root',
})
export class GunAuthGuard implements CanActivateChild, CanActivate {
  constructor(
    private ngGun: NgGunService,
    private router: Router,
    private logger: LogService,
    @Optional() private sessionService?: NgGunSessionService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (route.data.publicOnly) {
      return !this.ngGun.auth().is;
    }
    return this.canActivateChild(route, state);
  }
  sessionOrRedirect() {}
  async canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    if (this.ngGun.auth().is) {
      return true;
    }
    sessionStorage.setItem('redirect', state.url);

    const recalled$ = this.ngGun.auth().auth$.pipe(
      tap((ack) => console.log('auth$', ack)),
      timeout(500),
      catchError((err, caught) => {
        this.router.navigateByUrl('/login');
        return of({
          err: 'Session Recall Timeout',
        });
      }),
      filter((ack) => !ack.err),
      take(1)
    );

    const recall = sessionStorage.getItem('recall');
    const pair = sessionStorage.getItem('pair');

    if (!recall || !pair) {
      this.logger.log('no session for this tab');
      try {
        const sessions: any[] =
          (await this.sessionService?.getSessions()) || [];

        if (sessions.length === 1) {
          this.ngGun
            .auth()
            .login(sessions[0])
            .subscribe((res) => {
              // this.logger.log('got login response', res);
            });
        }
      } catch (err: any) {
        this.logger.error('error retrieving sessions:', err);
      }
    }

    return firstValueFrom(recalled$);
  }
}
