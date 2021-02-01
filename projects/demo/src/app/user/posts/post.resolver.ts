import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<boolean> {
  constructor(private userService: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.user
      .get('posts')
      .get(route.params.soul)
      .once()
      .pipe(map((post: any) => post._));
  }
}
