import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogModule } from '../../../log/src/lib/log.module';
import { LogService } from '../../../log/src/lib/log.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CertificatesModule } from './certificates/certificates.module';
import { CertificateFormComponent } from './components/certificate-form/certificate-form.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { ComponentsModule } from './components/components.module';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { FormsUiModule } from './forms-ui/forms-ui.module';
import { LoginComponent } from './login/login.component';
import { SessionInfoComponent } from './session-info/session-info.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SessionInfoComponent,
    ConfirmComponent,
    CertificatesComponent,
    CertificateFormComponent,
    WelcomeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CertificatesModule,
    ComponentsModule,
    FlexLayoutModule,
    FormsUiModule,
    LogModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  providers: [
    {
      provide: 'gun-options',
      useValue: {
        localStorage: false,
        peers: [
          location.origin.match(/localhost/)
            ? 'http://localhost:8765/gun'
            : location.origin + '/gun',
        ],
      },
    },
    {
      provide: LogService,
      useClass: LogService,
    },
  ],
  exports: [CertificatesComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
