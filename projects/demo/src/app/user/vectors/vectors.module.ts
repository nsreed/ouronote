import { NgxMatColorPickerModule } from '@angular-material-components/color-picker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LogModule } from '../../../../../log/src/lib/log.module';
import { NgGunModule } from '../../../../../ng-gun/src/lib/ng-gun.module';
import { CertificatesModule } from '../../certificates/certificates.module';
import { ComponentsModule } from '../../components/components.module';
import { FilesModule } from '../../files/files.module';
import { ColorFormComponent } from './components/color-form/color-form.component';
import { CreateVectorComponent } from './components/create-vector/create-vector.component';
import { InviteRequestsComponent } from './components/invite-requests/invite-requests.component';
import { LayerListComponent } from './components/layer-list/layer-list.component';
import { StrokeWidthFormComponent } from './components/stroke-width-form/stroke-width-form.component';
import { StyleFormComponent } from './components/style-form/style-form.component';
import { VectorExportDialogComponent } from './components/vector-export-dialog/vector-export-dialog.component';
import { VectorFormComponent } from './components/vector-form/vector-form.component';
import { EditVectorComponent } from './edit-vector/edit-vector.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RouteVectorDirective } from './route-vector.directive';
import { VectorsRoutingModule } from './vectors-routing.module';
import { VectorsComponent } from './vectors.component';
import { ViewVectorComponent } from './view-vector/view-vector.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SelectionIntersectModeFormComponent } from './components/selection-intersect-mode-form/selection-intersect-mode-form.component';
import { VectorCardComponent } from './components/vector-card/vector-card.component';
import { VectorModule } from '../../vector/vector.module';

@NgModule({
  declarations: [
    ColorFormComponent,
    CreateVectorComponent,
    EditVectorComponent,
    InviteRequestsComponent,
    LayerListComponent,
    PermissionsComponent,
    RouteVectorDirective,
    SelectionIntersectModeFormComponent,
    StrokeWidthFormComponent,
    StyleFormComponent,
    VectorCardComponent,
    VectorExportDialogComponent,
    VectorFormComponent,
    VectorsComponent,
    ViewVectorComponent,
  ],
  imports: [
    CertificatesModule,
    CommonModule,
    ComponentsModule,
    FilesModule,
    FlexLayoutModule,
    LogModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NgGunModule,
    NgxMatColorPickerModule,
    ReactiveFormsModule,
    ScrollingModule,
    VectorsRoutingModule,
    VectorModule,
  ],
  exports: [],
})
export class VectorsModule {}
