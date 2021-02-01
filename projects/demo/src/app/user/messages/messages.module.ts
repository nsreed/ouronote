import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { MessageComponent } from './message/message.component';
import { RouteMessageDirective } from './route-message.directive';
import { EditMessageComponent } from './edit-message/edit-message.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MessagesComponent,
    MessageComponent,
    RouteMessageDirective,
    EditMessageComponent,
  ],
  imports: [CommonModule, MessagesRoutingModule, ReactiveFormsModule],
})
export class MessagesModule {}
