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
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgGunModule } from '../../../../ng-gun/src/lib/ng-gun.module';
import { AboutComponent } from './about/about.component';
import { AliasAutocompleteComponent } from './alias-autocomplete/alias-autocomplete.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { GunPeersComponent } from './gun-peers/gun-peers.component';
import { SystemSettingsComponent } from './system-settings/system-settings.component';

@NgModule({
  declarations: [
    BugReportComponent,
    GunPeersComponent,
    AliasAutocompleteComponent,
    AboutComponent,
    SystemSettingsComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
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
    MatStepperModule,
    MatTooltipModule,
    NgGunModule,
    ReactiveFormsModule,
  ],
  exports: [
    BugReportComponent,
    GunPeersComponent,
    AliasAutocompleteComponent,
    SystemSettingsComponent,
  ],
})
export class ComponentsModule {}
