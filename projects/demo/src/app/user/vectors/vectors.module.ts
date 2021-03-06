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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { ToolDirective } from './components/tool.directive';
import { ColorFormComponent } from './components/color-form/color-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VectorFormComponent } from './components/vector-form/vector-form.component';
import { CreateVectorComponent } from './components/create-vector/create-vector.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewVectorComponent } from './view-vector/view-vector.component';
import { CertificatesModule } from '../../certificates/certificates.module';
import { LogModule } from '../../../../../log/src/lib/log.module';
import { PermissionsComponent } from './permissions/permissions.component';
import { FilesModule } from '../../files/files.module';
import { VectorPreviewComponent } from './components/vector-preview/vector-preview.component';
import { PaperEditDirective } from './paper-edit.directive';
import { VectorExportDialogComponent } from './components/vector-export-dialog/vector-export-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { InviteRequestsComponent } from './components/invite-requests/invite-requests.component';
import { ComponentsModule } from '../../components/components.module';
import { MatBadgeModule } from '@angular/material/badge';

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
    VectorFormComponent,
    CreateVectorComponent,
    ViewVectorComponent,
    PermissionsComponent,
    VectorPreviewComponent,
    PaperEditDirective,
    VectorExportDialogComponent,
    InviteRequestsComponent,
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
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NgGunModule,
    ReactiveFormsModule,
    ScrollingModule,
    VectorsRoutingModule,
  ],
  exports: [PaperDirective],
})
export class VectorsModule {}
