import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GunAuthGuard } from '../../../ng-gun/src/lib/gun-auth.guard';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivateChild: [GunAuthGuard],
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./user/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'settings',
    component: SystemSettingsComponent,
  },
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'view',
    loadChildren: () =>
      import('./vector/vector.module').then((m) => m.VectorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
