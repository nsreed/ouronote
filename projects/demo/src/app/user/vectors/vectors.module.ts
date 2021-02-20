import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VectorsRoutingModule } from './vectors-routing.module';
import { VectorsComponent } from './vectors.component';
import { PaperDirective } from './paper.directive';
import { EditVectorComponent } from './edit-vector/edit-vector.component';
import { NgGunModule } from '../../../../../ng-gun/src/lib/ng-gun.module';
import { RouteVectorDirective } from './route-vector.directive';
import { LayerListComponent } from './components/layer-list/layer-list.component';

@NgModule({
  declarations: [VectorsComponent, PaperDirective, EditVectorComponent, RouteVectorDirective, LayerListComponent],
  imports: [CommonModule, VectorsRoutingModule, NgGunModule],
  exports: [PaperDirective],
})
export class VectorsModule {}
