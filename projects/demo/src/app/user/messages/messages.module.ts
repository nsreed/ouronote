import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { NgGunModule } from '../../../../../ng-gun/src/lib/ng-gun.module';
import { ComponentsModule } from '../../components/components.module';
import { EditMessageComponent } from './edit-message/edit-message.component';
import { MessageComponent } from './message/message.component';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { RouteMessageDirective } from './route-message.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    MessagesComponent,
    MessageComponent,
    RouteMessageDirective,
    EditMessageComponent,
    NewMessageComponent,
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgGunModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    ComponentsModule,
  ],
})
export class MessagesModule {}
