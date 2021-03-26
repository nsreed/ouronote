import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificatesComponent } from './certificates/certificates.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { CreateCertificateComponent } from './create-certificate/create-certificate.component';
import { MatListModule } from '@angular/material/list';
import { NgGunModule } from '../../../../ng-gun/src/lib/ng-gun.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [CertificatesComponent, CreateCertificateComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,

    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatStepperModule,

    MatListModule,
    NgGunModule,
  ],
  exports: [CertificatesComponent],
})
export class CertificatesModule {}
