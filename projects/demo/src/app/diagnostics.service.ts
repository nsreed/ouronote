import { Injectable } from '@angular/core';
import { NgGunService } from '../../../ng-gun/src/lib/ng-gun.service';
import { MatDialog } from '@angular/material/dialog';
import { GunPeer } from 'projects/ng-gun/src/public-api';
import { take, shareReplay } from 'rxjs/operators';
import { BugReportComponent } from './components/bug-report/bug-report.component';
import { LogMessage, LogService } from '../../../log/src/lib/log.service';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticsService {
  messages: LogMessage[] = [];
  constructor(
    private ngGun: NgGunService,
    private dialog: MatDialog,
    private logger: LogService
  ) {
    LogService.buffer$.subscribe((buff: LogMessage[]) => {
      // console.log('got message', buff);
      this.messages = buff;
    });
  }

  bugReport() {
    const peers = Object.keys(this.ngGun.peers).map((k) => {
      const rawPeer = this.ngGun.peers[k] as GunPeer;

      const x = {
        ...rawPeer,
        wire:
          rawPeer.wire === undefined
            ? undefined
            : {
                readyState: rawPeer.wire.readyState,
                protocol: rawPeer.wire.protocol,
                extensions: rawPeer.wire.extensions,
                bufferedAmount: rawPeer.wire.bufferedAmount,
              },
      };
      return x;
    });
    // LogService.buffer$.pipe(take(1)).subscribe((messages) => {
    this.dialog.open(BugReportComponent, {
      data: {
        messages: this.messages,
        gun: this.ngGun.gun,
        peers,
      },
      width: '80%',
      height: '80%',
    });
    // });
  }
}
