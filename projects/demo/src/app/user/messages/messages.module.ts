import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { MessageComponent } from './message/message.component';
import { RouteMessageDirective } from './route-message.directive';


@NgModule({
  declarations: [MessagesComponent, MessageComponent, RouteMessageDirective],
  imports: [
    CommonModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
