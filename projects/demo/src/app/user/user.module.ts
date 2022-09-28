import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogModule } from 'log';
import { ComponentsModule } from '../components/components.module';
import { NgxMatColorPickerModule } from '@angular-material-components/color-picker';

@NgModule({
  declarations: [UserComponent, DashboardComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    LogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    NgxMatColorPickerModule,
    FlexLayoutModule,
    ComponentsModule,
  ],
})
export class UserModule {}
