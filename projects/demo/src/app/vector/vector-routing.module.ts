import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VectorComponent } from './vector.component';
import { ViewComponent } from './view/view.component';
import { SoulResolverService } from '../../../../ng-gun/src/lib/soul-resolver.service';

const routes: Routes = [
  { path: '', component: VectorComponent },
  {
    path: ':soul',
    component: ViewComponent,
    resolve: {
      vector: SoulResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VectorRoutingModule {}
