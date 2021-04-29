import { Injectable } from '@angular/core';
import { NgGunService } from './ng-gun.service';
import { IGunMesh } from './types/gun-mesh';

@Injectable({
  providedIn: 'root',
})
export class DamService {
  mesh: IGunMesh = this.ngGun.gun.back('opt.mesh' as any) as any;
  constructor(private ngGun: NgGunService) {}
  disconnect(id: string) {
    this.mesh.bye(id);
  }
  connect(endpoint: string) {
    this.mesh.say({ dam: 'opt', opt: { peers: endpoint } });
  }
}
