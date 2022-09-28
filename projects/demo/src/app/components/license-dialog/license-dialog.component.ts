import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgGunService } from 'ng-gun';
import * as Gun from 'gun';

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
    this.vectorNode
      .get('license')
      .open()
      .subscribe((v: any) => {
        this.vectorNode
          .get('owner')
          .once()
          .subscribe(async (o: any) => {
            const op = Object.keys(o)[0];
            const license = v && op ? await Gun.SEA.verify(v, op) : null;
            // console.log('license by', op, v, license);
            this.license = license;
          });
      });
  }

  ngOnInit(): void {}
}
