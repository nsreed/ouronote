import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './errors/error-dialog/error-dialog.component';
import { ErrorDialogService } from './errors/error-dialog.service';

@NgModule({
  declarations: [ErrorDialogComponent],
  exports: [ErrorDialogComponent],
  imports: [CommonModule],
  providers: [ErrorDialogService],
  entryComponents: [ErrorDialogComponent],
})
export class SharedModule {}
