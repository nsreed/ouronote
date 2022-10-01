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
import {
  MatAutocompleteDefaultOptions,
  MatAutocompleteModule,
  MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
} from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatFormFieldDefaultOptions,
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OnlineStatusModule } from 'ngx-online-status';
import { NoopSharedWorker } from 'projects/ng-gun/src/lib/classes/NoopSharedWorker';
import { LogModule, LogService } from 'log';
import { NgGunService } from 'ng-gun';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CertificatesModule } from './certificates/certificates.module';
import { CertificateFormComponent } from './components/certificate-form/certificate-form.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { ComponentsModule } from './components/components.module';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { DirectivesModule } from './directives/directives.module';
import { FilesModule } from './files/files.module';
import { FormsUiModule } from './forms-ui/forms-ui.module';
import { LoginComponent } from './login/login.component';
import { GunRadImporterService } from './services/gun-rad-importer.service';
import { GunWebrtcImporterService } from './services/gun-webrtc-importer.service';
import { SessionInfoComponent } from './session-info/session-info.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatBottomSheetConfig,
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
} from '@angular/material/bottom-sheet';

const RADISK_LOCAL = localStorage.getItem('RADISK_ENABLE');
const RADISK_ENABLE = RADISK_LOCAL === null ? true : !!JSON.parse(RADISK_LOCAL);
const WEBRTC_LOCAL = localStorage.getItem('WEBRTC_ENABLE');
// Default to false for now
const WEBRTC_ENABLE =
  WEBRTC_LOCAL === null ? false : !!JSON.parse(WEBRTC_LOCAL);

let worker;
if (typeof SharedWorker !== 'undefined') {
  worker = new SharedWorker('/assets/gun-session.worker.js');
} else {
  worker = new NoopSharedWorker();
}

// FIXME this is for compatibility with `ng serve`
const GUN_PEERS = [
  location.origin.match(/localhost/)
    ? 'http://localhost:8765/gun'
    : location.origin + '/gun',
];
const GUN_OPTIONS = {
  localStorage: !RADISK_ENABLE,
  sharedWorkerURL: '/assets/gun-shared.worker.js',
  sharedWorker: {
    enabled: false,
    disconnectRedundantWebRTC: true,
  },
  peers: [...GUN_PEERS],
};
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
    FilesModule,
    FlexLayoutModule,
    FormsUiModule,
    HammerModule,
    HttpClientModule,
    LogModule,
    MatBadgeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTooltipModule,
    NgxMatColorPickerModule,
    OnlineStatusModule,
    ReactiveFormsModule,
    ScrollingModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000',
    // }),
  ],
  providers: [
    // {
    //   provide: SharedWorker,
    //   useValue: worker,
    // },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        color: 'primary',
      } as MatFormFieldDefaultOptions,
    },
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: {
        autoActiveFirstOption: true,
      } as MatAutocompleteDefaultOptions,
    },
    {
      provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        backdropClass: 'sheet-backdrop',
      } as MatBottomSheetConfig,
    },
    {
      provide: 'gun-options',
      useValue: GUN_OPTIONS,
    },
    {
      provide: 'gun-peers',
      useValue: GUN_PEERS,
    },
    {
      provide: LogService,
      useClass: LogService,
    },
    NgGunService,
    {
      provide: GunWebrtcImporterService,
      useFactory: () => {
        return WEBRTC_ENABLE ? new GunWebrtcImporterService() : null;
      },
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
      provide: 'settings.debug',
      useValue: JSON.parse(localStorage.getItem('settings.debug') || 'false'),
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
export class AppModule {
  static status: any;
}
