import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { MessageComponent } from './message/message.component';
import { RouteMessageDirective } from './route-message.directive';
import { EditMessageComponent } from './edit-message/edit-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgGunModule } from '../../../../../ng-gun/src/lib/ng-gun.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsModule } from '../../components/components.module';
import { NewMessageComponent } from './new-message/new-message.component';

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
    ComponentsModule,
  ],
})
export class MessagesModule {}
