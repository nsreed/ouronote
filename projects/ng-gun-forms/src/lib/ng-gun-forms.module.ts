import { NgModule } from '@angular/core';
import { NgGunFormsComponent } from './ng-gun-forms.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NgGunFormsComponent],
  imports: [ReactiveFormsModule],
  exports: [NgGunFormsComponent],
})
export class NgGunFormsModule {}
