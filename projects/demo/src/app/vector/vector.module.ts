import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VectorRoutingModule } from './vector-routing.module';
import { VectorComponent } from './vector.component';
import { ViewComponent } from './view/view.component';
import { PaperDirective } from './paper.directive';
import { PaperEditDirective } from './paper-edit.directive';
import { VectorPreviewComponent } from './vector-preview/vector-preview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    VectorComponent,
    ViewComponent,
    PaperDirective,
    PaperEditDirective,
    VectorPreviewComponent,
  ],
  imports: [
    CommonModule,
    VectorRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [PaperDirective, PaperEditDirective, VectorPreviewComponent],
})
export class VectorModule {}
