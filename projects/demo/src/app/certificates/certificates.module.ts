import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificatesComponent } from './certificates/certificates.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CertificatesComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [CertificatesComponent],
})
export class CertificatesModule {}
