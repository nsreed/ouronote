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
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class MessageResolver implements Resolve<any> {
  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const soul = route.params.soul;
    return this.userService.user.root.get(soul).once();
  }
}
