import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgGunModule } from 'ng-gun';
import { AboutComponent } from './about/about.component';
import { AliasAutocompleteComponent } from './alias-autocomplete/alias-autocomplete.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { GunPeersComponent } from './gun-peers/gun-peers.component';
import { LicenseFormComponent } from './license-form/license-form.component';
import { LicenseSelectorComponent } from './license-selector/license-selector.component';
import { SystemSettingsComponent } from './system-settings/system-settings.component';
import { LicenseComponent } from './license/license.component';
import { LicenseDialogComponent } from './license-dialog/license-dialog.component';
import { SessionSelectorComponent } from './session-selector/session-selector.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UnCamelPipe } from './un-camel.pipe';

@NgModule({
  declarations: [
    BugReportComponent,
    GunPeersComponent,
    AliasAutocompleteComponent,
    AboutComponent,
    SystemSettingsComponent,
    LicenseFormComponent,
    LicenseSelectorComponent,
    LicenseComponent,
    LicenseDialogComponent,
    SessionSelectorComponent,
    QrCodeComponent,
    UnCamelPipe,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatTabsModule,
    MatTooltipModule,
    MatToolbarModule,
    NgGunModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    BugReportComponent,
    GunPeersComponent,
    AliasAutocompleteComponent,
    SystemSettingsComponent,
    LicenseFormComponent,
    LicenseSelectorComponent,
    LicenseComponent,
    SessionSelectorComponent,
    QrCodeComponent,
    UnCamelPipe,
  ],
})
export class ComponentsModule {}
