import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VectorsRoutingModule } from './vectors-routing.module';
import { VectorsComponent } from './vectors.component';
import { PaperDirective } from './paper.directive';
import { EditVectorComponent } from './edit-vector/edit-vector.component';
import { NgGunModule } from '../../../../../ng-gun/src/lib/ng-gun.module';
import { RouteVectorDirective } from './route-vector.directive';
import { LayerListComponent } from './components/layer-list/layer-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StyleFormComponent } from './components/style-form/style-form.component';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { ToolDirective } from './components/tool.directive';
import { ColorFormComponent } from './components/color-form/color-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    VectorsComponent,
    PaperDirective,
    EditVectorComponent,
    RouteVectorDirective,
    LayerListComponent,
    StyleFormComponent,
    ToolDirective,
    ColorFormComponent,
  ],
  imports: [
    CommonModule,
    VectorsRoutingModule,
    NgGunModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    ScrollingModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatButtonToggleModule,
    FlexLayoutModule,
  ],
  exports: [PaperDirective],
})
export class VectorsModule {}
