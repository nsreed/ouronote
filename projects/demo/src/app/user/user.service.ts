import { Injectable } from '@angular/core';
import { NgGunService } from '../../../../ng-gun/src/lib/ng-gun.service';
import { User } from './model';
import { mergeMap, map, mapTo, shareReplay, mergeAll } from 'rxjs/operators';
import { from, of } from 'rxjs';
// import { User } from ;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = this.ngGun.auth();
  alias$ = from([
    of(this.user.alias),
    this.user.auth$.pipe(map((a) => this.user.alias)),
  ]).pipe(mergeAll());
  constructor(private ngGun: NgGunService<User>) {}
}
