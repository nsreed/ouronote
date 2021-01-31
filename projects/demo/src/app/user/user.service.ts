import { Injectable } from '@angular/core';
import { NgGunService } from '../../../../ng-gun/src/lib/ng-gun.service';
import { User } from '../model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = this.ngGun.auth();
  constructor(private ngGun: NgGunService<User>) {}
}
