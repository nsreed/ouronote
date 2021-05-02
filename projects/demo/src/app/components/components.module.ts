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
import { MatListModule } from '@angular/material/list';
import { NgGunModule } from '../../../../ng-gun/src/lib/ng-gun.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BugReportComponent } from './bug-report/bug-report.component';
import { NgGunService } from '../../../../ng-gun/src/lib/ng-gun.service';
import { GunPeersComponent } from './gun-peers/gun-peers.component';
import { AliasAutocompleteComponent } from './alias-autocomplete/alias-autocomplete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    BugReportComponent,
    GunPeersComponent,
    AliasAutocompleteComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatListModule,
    MatRadioModule,
    MatStepperModule,
    MatTooltipModule,
    NgGunModule,
    ReactiveFormsModule,
  ],
  exports: [BugReportComponent, GunPeersComponent, AliasAutocompleteComponent],
})
export class ComponentsModule {}
