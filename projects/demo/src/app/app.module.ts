import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GunPeersComponent } from './gun-peers/gun-peers.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsUiModule } from './forms-ui/forms-ui.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SessionInfoComponent } from './session-info/session-info.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmComponent } from './components/confirm/confirm.component';
@NgModule({
  declarations: [
    GunPeersComponent,
    AppComponent,
    LoginComponent,
    SessionInfoComponent,
    ConfirmComponent,
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
  ],
  providers: [
    {
      provide: 'gun-options',
      useValue: {
        localStorage: false,
        peers: ['http://localhost:8765/gun'],
      },
    },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
