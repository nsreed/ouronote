import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';

@Component({
  templateUrl: './license-dialog.component.html',
  styleUrls: ['./license-dialog.component.scss'],
})
export class LicenseDialogComponent implements OnInit {
  vectorNode = this.ngGun.get(this.data.vectorPub);
  license: any = null;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private ngGun: NgGunService
  ) {
    this.vectorNode.open().subscribe((v: any) => {
      console.log('license', v.license);
      this.license = v.license;
    });
  }

  ngOnInit(): void {}
}
