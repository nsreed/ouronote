import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GunAuthGuard } from 'ng-gun';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { TitleResolver } from './vector/title.resolver';

const routes: Routes = [
  {
    path: 'home',
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
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
