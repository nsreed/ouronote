import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VectorRoutingModule } from './vector-routing.module';
import { VectorComponent } from './vector.component';
import { ViewComponent } from './view/view.component';
import { PaperDirective, PaperMirrorDirective } from './paper.directive';
import { PaperEditDirective } from './paper-edit.directive';
import { VectorPreviewComponent } from './vector-preview/vector-preview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgGunModule } from 'ng-gun';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaperScopeDirective } from './paper-scope.directive';

@NgModule({
  declarations: [
    VectorComponent,
    ViewComponent,
    PaperDirective,
    PaperMirrorDirective,
    PaperEditDirective,
    PaperScopeDirective,
    VectorPreviewComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    VectorRoutingModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    NgGunModule,
    MatTooltipModule,
  ],
  exports: [
    PaperDirective,
    PaperEditDirective,
    VectorPreviewComponent,
    PaperScopeDirective,
    PaperMirrorDirective,
  ],
})
export class VectorModule {}
