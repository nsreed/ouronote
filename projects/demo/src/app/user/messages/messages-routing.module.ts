import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { MessageComponent } from './message/message.component';
import { MessageResolver } from './message.resolver';

const routes: Routes = [
  { path: '', component: MessagesComponent },
  {
    path: ':soul',
    component: MessageComponent,
    resolve: {
      message: MessageResolver,
    },
  },
  {
    path: ':soul/edit',
    component: MessageComponent,
    resolve: {
      message: MessageResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
