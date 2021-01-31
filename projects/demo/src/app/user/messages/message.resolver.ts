import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../user.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageResolver implements Resolve<any> {
  constructor(private userService: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.userService.user
      .get('messages')
      .get(route.params.soul)
      .once()
      .pipe(
        map((message: any) => {
          console.log('mapping', message);
          return message._;
        }),
        take(1)
      );
  }
}
