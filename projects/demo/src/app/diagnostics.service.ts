import { Injectable } from '@angular/core';
import { NgGunService } from '../../../ng-gun/src/lib/ng-gun.service';
import { MatDialog } from '@angular/material/dialog';
import { GunPeer } from 'projects/ng-gun/src/public-api';
import { take, shareReplay, map, mapTo, filter } from 'rxjs/operators';
import { BugReportComponent } from './components/bug-report/bug-report.component';
import { LogMessage, LogService } from '../../../log/src/lib/log.service';
import { timer } from 'rxjs';

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
    this.disconnectedPeers$
      .pipe(filter((peers) => peers.length > 0))
      .subscribe((peers) => {
        this.logger.log('attempting to reconnect peers', peers);
        this.ngGun.gun.opt({
          peers,
        });
      });
  }

  configuredPeers = Array.isArray(this.ngGun.gunOptions.peers)
    ? ((this.ngGun.gunOptions.peers as unknown) as string[])
    : Object.keys(this.ngGun.gunOptions.peers as any);

  get peers() {
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
    return peers;
  }

  disconnectedPeers$ = timer(1000 * 5, 1000 * 5).pipe(
    map(() => this.disconnectedPeers),
    shareReplay(1)
  );

  get missingPeers() {
    return this.configuredPeers.filter(
      (url) => !this.peers.find((p) => p.url === url)
    );
  }

  get disconnectedPeers() {
    const errorPeers = this.peers
      .filter((peer) => peer.wire?.readyState === 0)
      .map((p) => p.url);
    return [...errorPeers, ...this.missingPeers];
  }

  bugReport() {
    // LogService.buffer$.pipe(take(1)).subscribe((messages) => {
    this.dialog.open(BugReportComponent, {
      data: {
        messages: this.messages,
        gun: this.ngGun.gun,
        peers: this.peers,
      },
      width: '80%',
      height: '80%',
    });
    // });
  }
}
