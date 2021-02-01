import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { MessageComponent } from './message/message.component';
import { MessageResolver } from './message.resolver';
import { EditMessageComponent } from './edit-message/edit-message.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    children: [
      {
        path: ':soul',
        component: MessageComponent,
        resolve: {
          message: MessageResolver,
        },
      },
      {
        path: ':soul/edit',
        component: EditMessageComponent,
        resolve: {
          message: MessageResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
