import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VectorRoutingModule } from './vector-routing.module';
import { VectorComponent } from './vector.component';
import { ViewComponent } from './view/view.component';
import { PaperDirective } from './paper.directive';
import { PaperEditDirective } from './paper-edit.directive';

@NgModule({
  declarations: [
    VectorComponent,
    ViewComponent,
    PaperDirective,
    PaperEditDirective,
  ],
  imports: [CommonModule, VectorRoutingModule],
  exports: [PaperDirective, PaperEditDirective],
})
export class VectorModule {}
