import { Injectable } from '@angular/core';
import { NgGunService } from './ng-gun.service';

@Injectable({
  providedIn: 'root',
})
export class NgGunDiagnosticsService {
  constructor(private ngGun: NgGunService) {}

  get graph() {
    return this.ngGun.gun._.graph;
  }

  get peers() {
    return this.ngGun.peers;
  }
}
