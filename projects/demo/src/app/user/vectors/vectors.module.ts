import { NgxMatColorPickerModule } from '@angular-material-components/color-picker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkMenuModule } from '@angular/cdk/menu';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HammerModule } from '@angular/platform-browser';
import { LogModule } from 'log';
import { NgGunModule } from 'ng-gun';
import { CertificatesModule } from '../../certificates/certificates.module';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { FilesModule } from '../../files/files.module';
import { VectorModule } from '../../vector/vector.module';
import { BooleanFormComponent } from './components/boolean-form/boolean-form.component';
import { ColorFormComponent } from './components/color-form/color-form.component';
import { ColorGradientComponent } from './components/color-gradient/color-gradient.component';
import { CreateVectorComponent } from './components/create-vector/create-vector.component';
import { FavoriteColorsComponent } from './components/favorite-colors/favorite-colors.component';
import { InviteRequestsComponent } from './components/invite-requests/invite-requests.component';
import { InvitedUsersComponent } from './components/invited-users/invited-users.component';
import { LayerListComponent } from './components/layer-list/layer-list.component';
import { NumberFormComponent } from './components/number-form/number-form.component';
import { SelectedItemsComponent } from './components/selected-items/selected-items.component';
import { SelectionIntersectModeFormComponent } from './components/selection-intersect-mode-form/selection-intersect-mode-form.component';
import { SelectorControlComponent } from './components/selector-control/selector-control.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { SliderFormComponent } from './components/slider-form/slider-form.component';
import { StrokeWidthFormComponent } from './components/stroke-width-form/stroke-width-form.component';
import { StyleFormComponent } from './components/style-form/style-form.component';
import { TextFormComponent } from './components/text-form/text-form.component';
import { ToolIconComponent } from './components/tool-icon/tool-icon.component';
import { ToolPickerComponent } from './components/tool-picker/tool-picker.component';
import { ToolPropertiesComponent } from './components/tool-properties/tool-properties.component';
import { VectorCardComponent } from './components/vector-card/vector-card.component';
import { VectorExportDialogComponent } from './components/vector-export-dialog/vector-export-dialog.component';
import { VectorFormComponent } from './components/vector-form/vector-form.component';
import { VectorLoaderComponent } from './components/vector-loader/vector-loader.component';
import { EditVectorComponent } from './edit-vector/edit-vector.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RouteVectorDirective } from './route-vector.directive';
import { VectorsRoutingModule } from './vectors-routing.module';
import { VectorsComponent } from './vectors.component';
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
    SettingsDialogComponent,
    InvitedUsersComponent,
    SelectedItemsComponent,
    BooleanFormComponent,
    SliderFormComponent,
    TextFormComponent,
    FavoriteColorsComponent,
    ColorGradientComponent,
    VectorLoaderComponent,
    NumberFormComponent,
    ToolPickerComponent,
    ToolPropertiesComponent,
    ToolIconComponent,
    SelectorControlComponent,
  ],
  imports: [
    CertificatesModule,
    CdkMenuModule,
    CommonModule,
    DragDropModule,
    PortalModule,
    ComponentsModule,
    DirectivesModule,
    MatBottomSheetModule,
    FilesModule,
    FlexLayoutModule,
    HammerModule,
    LogModule,
    MatAutocompleteModule,
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
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSidenavModule,
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
  exports: [ToolIconComponent, SelectorControlComponent],
})
export class VectorsModule {}
