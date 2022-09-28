import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { MessageComponent } from './message/message.component';
import { EditMessageComponent } from './edit-message/edit-message.component';
import { GunResolverService } from 'ng-gun';

const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    children: [],
  },
  {
    path: ':soul',
    component: MessageComponent,
    resolve: {
      message: GunResolverService,
      chain: GunResolverService,
    },
  },
  {
    path: ':soul/edit',
    component: EditMessageComponent,
    resolve: {
      message: GunResolverService,
      chain: GunResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
