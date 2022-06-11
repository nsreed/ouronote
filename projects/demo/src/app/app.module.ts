import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
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
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogModule } from '../../../log/src/lib/log.module';
import { LogService } from '../../../log/src/lib/log.service';
import { NgGunService } from '../../../ng-gun/src/lib/ng-gun.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CertificatesModule } from './certificates/certificates.module';
import { CertificateFormComponent } from './components/certificate-form/certificate-form.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { ComponentsModule } from './components/components.module';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { FilesModule } from './files/files.module';
import { FormsUiModule } from './forms-ui/forms-ui.module';
import { LoginComponent } from './login/login.component';
import { GunRadImporterService } from './services/gun-rad-importer.service';
import { GunWebrtcImporterService } from './services/gun-webrtc-importer.service';
import { SessionInfoComponent } from './session-info/session-info.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatSelectModule } from '@angular/material/select';
import { DirectivesModule } from './directives/directives.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const RADISK_LOCAL = localStorage.getItem('RADISK_ENABLE');
const RADISK_ENABLE = RADISK_LOCAL === null ? true : !!JSON.parse(RADISK_LOCAL);
const WEBRTC_LOCAL = localStorage.getItem('WEBRTC_ENABLE');
// Default to false for now
const WEBRTC_ENABLE =
  WEBRTC_LOCAL === null ? false : !!JSON.parse(WEBRTC_LOCAL);

// if (typeof SharedWorker !== 'undefined') {
//   const sharedWorker = new SharedWorker('/assets/gun-shared.worker.js');
//   sharedWorker.port.start();
//   sharedWorker.port.onmessage = ({ data }) => {
//     console.log('shared message');
//     console.log(data);
//   };
//   sharedWorker.port.postMessage({
//     cmd: 'getSession',
//   });
// }

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
    DirectivesModule,
    FlexLayoutModule,
    FormsUiModule,
    HttpClientModule,
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
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NgxMatColorPickerModule,
    ReactiveFormsModule,
    ScrollingModule,
    FilesModule,
  ],
  providers: [
    {
      provide: SharedWorker,
      useValue: new SharedWorker('/assets/gun-shared.worker.js'),
    },
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    {
      provide: 'gun-options',
      useValue: {
        localStorage: !RADISK_ENABLE,
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
    NgGunService,
    {
      provide: GunWebrtcImporterService,
      useFactory: () => (WEBRTC_ENABLE ? new GunWebrtcImporterService() : null),
    },
    {
      provide: GunRadImporterService,
      useFactory: () => (RADISK_ENABLE ? new GunRadImporterService() : null),
    },
    {
      provide: 'enable-webrtc',
      useValue: WEBRTC_ENABLE,
    },
    {
      provide: 'enable-radisk',
      useValue: RADISK_ENABLE,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
      },
    },
  ],
  exports: [CertificatesComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
