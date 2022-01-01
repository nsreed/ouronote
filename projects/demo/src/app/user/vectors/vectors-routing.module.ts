import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VectorsComponent } from './vectors.component';
import { EditVectorComponent } from './edit-vector/edit-vector.component';
import { VectorResolver } from './vector.resolver';
import { PermissionsComponent } from './permissions/permissions.component';

const routes: Routes = [
  { path: '', component: VectorsComponent },
  {
    path: ':soul/permissions',
    component: PermissionsComponent,
    resolve: {
      soul: VectorResolver,
    },
  },
  {
    path: ':soul/edit',
    component: EditVectorComponent,
    resolve: {
      soul: VectorResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VectorsRoutingModule {}
