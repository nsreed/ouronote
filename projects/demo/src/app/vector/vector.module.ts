import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgGunModule } from 'ng-gun';
import { PaperEditDirective } from './paper-edit.directive';
import { PaperMirrorDirective } from './paper-mirror.directive';
import { PaperScopeDirective } from './paper-scope.directive';
import { PaperDirective } from './paper.directive';
import { VectorPreviewComponent } from './vector-preview/vector-preview.component';
import { VectorRoutingModule } from './vector-routing.module';
import { VectorComponent } from './vector.component';
import { ViewComponent } from './view/view.component';

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
