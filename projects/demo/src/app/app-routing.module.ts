import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GunAuthGuard } from 'ng-gun';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { LogViewerComponent } from './components/log-viewer/log-viewer.component';

const routes: Routes = [
  { path: 'log-viewer', component: LogViewerComponent },
  {
    path: 'posts',
    loadChildren: () =>
      import('./user/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'log in',
  },
  {
    path: 'settings',
    component: SystemSettingsComponent,
    title: 'ouronote settings',
  },
  {
    path: 'view',
    loadChildren: () =>
      import('./vector/vector.module').then((m) => m.VectorModule),
  },
  {
    path: 'index',
    data: { publicOnly: true },
    canActivate: [GunAuthGuard],
    component: WelcomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivateChild: [GunAuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/user/vectors',
  },
  {
    path: '**',
    component: WelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
