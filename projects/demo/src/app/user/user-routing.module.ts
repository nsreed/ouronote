import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'messages',
        loadChildren: () =>
          import('./messages/messages.module').then((m) => m.MessagesModule),
      },
      {
        path: 'posts',
        loadChildren: () =>
          import('./posts/posts.module').then((m) => m.PostsModule),
      },
      {
        path: 'vectors',
        loadChildren: () =>
          import('./vectors/vectors.module').then((m) => m.VectorsModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: '**',
        redirectTo: 'vectors',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
