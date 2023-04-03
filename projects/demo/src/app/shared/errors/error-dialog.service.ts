import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogService {
  constructor(private dialog: MatDialog) {}
  openDialog(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        message,
      },
    });
  }
}
