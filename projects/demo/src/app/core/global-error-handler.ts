import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ErrorDialogService } from '../shared/errors/error-dialog.service';
import { LogService } from 'log';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private zone: NgZone,
    private logger: LogService,
    private errorDialogService: ErrorDialogService
  ) {}

  handleError(error: any): void {
    console.error('ERROR', error);
    this.logger.error(`${JSON.stringify(error)}`);
    this.zone.run(() => {
      this.errorDialogService.openDialog(error);
    });
  }
}
