import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CertificateFormComponent } from '../certificate-form/certificate-form.component';
import { ChainDirective } from '../../../../../ng-gun/src/lib/chain.directive';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private chainDirective: ChainDirective,
    ngGun: NgGunService
  ) {
    // super(ngGun);
  }

  ngOnInit(): void {}

  createCertificate() {
    this.dialog.open(CertificateFormComponent, { height: '90%', width: '90%' });
  }
}
