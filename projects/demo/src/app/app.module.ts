import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CertificateFormComponent } from './components/certificate-form/certificate-form.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { FormsUiModule } from './forms-ui/forms-ui.module';
import { GunPeersComponent } from './gun-peers/gun-peers.component';
import { LoginComponent } from './login/login.component';
import { SessionInfoComponent } from './session-info/session-info.component';
import { AliasAutocompleteComponent } from './components/alias-autocomplete/alias-autocomplete.component';
import { CertificatesModule } from './certificates/certificates.module';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    GunPeersComponent,
    AppComponent,
    LoginComponent,
    SessionInfoComponent,
    ConfirmComponent,
    CertificatesComponent,
    CertificateFormComponent,
    AliasAutocompleteComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsUiModule,
    MatIconModule,
    MatButtonModule,
    ScrollingModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatRadioModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTooltipModule,
    CertificatesModule,
    MatSidenavModule,
  ],
  providers: [
    {
      provide: 'gun-options',
      useValue: {
        localStorage: false,
        peers: [],
      },
    },
  ],
  exports: [CertificatesComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
