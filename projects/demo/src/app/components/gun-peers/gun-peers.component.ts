import { Component, Inject, Input } from '@angular/core';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GunPeers } from '../../../../../ng-gun/src/lib/GunPeers';

@Component({
  selector: 'app-gun-peers',
  templateUrl: './gun-peers.component.html',
  styleUrls: ['./gun-peers.component.scss'],
})
export class GunPeersComponent {
  peers = this.data.ngGun.peers as GunPeers;
  constructor(
    public ngGun: NgGunService,
    public dialogRef: MatDialogRef<GunPeersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  logGun() {
    console.log(this.data.ngGun);
  }
}
