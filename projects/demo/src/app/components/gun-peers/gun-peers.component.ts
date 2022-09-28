import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DamService, GunPeers, NgGunService } from 'ng-gun';
import { DiagnosticsService } from '../../diagnostics.service';

@Component({
  selector: 'app-gun-peers',
  templateUrl: './gun-peers.component.html',
  styleUrls: ['./gun-peers.component.scss'],
})
export class GunPeersComponent {
  peers = this.data.ngGun.peers as GunPeers;
  missing = this.diagnostics.missing;
  constructor(
    public ngGun: NgGunService,
    public dialogRef: MatDialogRef<GunPeersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public damService: DamService,
    public diagnostics: DiagnosticsService
  ) {}

  logGun() {
    console.log(this.data.ngGun);
  }

  disconnect(id: string) {
    this.damService.disconnect(id);
  }
}
