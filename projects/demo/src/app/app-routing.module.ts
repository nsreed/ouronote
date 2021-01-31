import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GunAuthGuard } from '../../../ng-gun/src/lib/gun-auth.guard';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivateChild: [GunAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
