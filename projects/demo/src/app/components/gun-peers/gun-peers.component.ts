import { Component, Input } from '@angular/core';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';

@Component({
  selector: 'app-gun-peers',
  templateUrl: './gun-peers.component.html',
  styleUrls: ['./gun-peers.component.scss'],
})
export class GunPeersComponent {
  @Input() ngGun!: NgGunService;
  constructor() {}
}
