import { Injectable, EventEmitter } from '@angular/core';
import { NgGunService } from '../../../ng-gun/src/lib/ng-gun.service';
import { MatDialog } from '@angular/material/dialog';
import { GunPeer } from 'projects/ng-gun/src/public-api';
import {
  take,
  shareReplay,
  map,
  mapTo,
  filter,
  delay,
  timeout,
} from 'rxjs/operators';
import { BugReportComponent } from './components/bug-report/bug-report.component';
import { LogMessage, LogService } from '../../../log/src/lib/log.service';
import { timer, Observable, of } from 'rxjs';
import { CAPABILITIES } from './system.service';
import { DamService } from '../../../ng-gun/src/lib/dam.service';
import { HttpClient } from '@angular/common/http';
import { distinct, bufferTime } from 'rxjs/operators';
import { SettingsService } from './settings.service';

const TIMEOUT = 60 * 1000;
const POLL = 10 * 1000;
const TRYEVERY = 30 * 1000;

@Injectable({
  providedIn: 'root',
})
export class DiagnosticsService {
  messages: LogMessage[] = [];
  tryLater: { [key: string]: any } = {};

  later$ = new EventEmitter();

  constructor(
    private ngGun: NgGunService,
    private dialog: MatDialog,
    private logger: LogService,
    private dam: DamService,
    private http: HttpClient,
    private settings: SettingsService
  ) {
    settings.gun.get('diagnostics');
    LogService.buffer$.subscribe((buff: LogMessage[]) => {
      // console.log('got message', buff);
      this.messages = buff;
    });
    this.later$.pipe(bufferTime(1000)).subscribe((peers) => {
      peers.forEach((peer) => {
        if (peer.wire?.readyState) {
          this.logger.log('RECONNECTED DIFFERENTLY?');
          return;
        }
        if (peer.onOpen) {
          return;
        }
        this.dam.connect(peer);
        timer(TIMEOUT).subscribe(() => {
          if (peer.wire?.readyState === 1) {
            this.logger.log('RECONNECTED!!!!!!!!!!!!!!!!!!');
            return;
          }
          if (!peer.wire) {
            this.logger.log('no wire???');
            return;
          }
          if (peer.wire?.readyState === 0) {
            this.logger.log('no luck');
            return;
          }
          this.later$.emit(peer);
        });
      });
    });
    this.disconnected$
      .pipe(filter((peers) => peers.length > 0))
      .subscribe((peers) => {
        peers.forEach((peer: any) => {
          if (peer.wire?.readyState === 1) {
            return;
          }
          if (!peer.met) {
            console.log('have never met peer');
            this.dam.connect(peer);
            return;
          }
          const age = Date.now() - peer.met;
          console.log(`met ${age}ms ago`);
          if (age < 30 * 1000) {
            return;
          }
          // if (peer.onOpen) {
          //   peer.onOpen();
          // }

          this.logger.log(
            'disconnecting stalled peer: %s',
            peer.url || peer.id || peer
          );
          if (peer.url) {
            this.tryLater[peer.url] = peer;
          }
          this.dam.disconnect(peer);
        });
      });
    this.logger.log('capabilities', CAPABILITIES);
  }

  configuredPeers = Array.isArray(this.ngGun.gunOptions.peers)
    ? (this.ngGun.gunOptions.peers as unknown as string[])
    : Object.keys(this.ngGun.gunOptions.peers as any);

  get storeStats() {
    return this.ngGun.gun.back('opt.store.stats' as any);
  }

  get peers() {
    const peers = Object.keys(this.ngGun.peers).map((k) => {
      const rawPeer = this.ngGun.peers[k] as GunPeer;
      return rawPeer;
    });
    return peers;
  }

  poll$ = timer(5000, POLL);

  // tryLater$ = timer(TRYEVERY + POLL, TRYEVERY).pipe(map(() => this.tryLater));

  get disconnected() {
    return this.peers.filter(
      (peer) => peer.wire !== undefined && peer.wire?.readyState === 0
    );
  }

  get disconnectedPeers() {
    const errorPeers = this.peers
      .filter((peer) => peer.wire?.readyState === 0)
      .map((p) => p.url);
    return [...errorPeers, ...this.missingPeers];
  }

  disconnected$ = this.poll$.pipe(
    map(() => this.disconnected),
    shareReplay(1)
  );

  disconnectedPeers$ = this.poll$.pipe(
    map(() => this.disconnectedPeers),
    shareReplay(1)
  );

  get missing() {
    return this.configuredPeers.filter(
      (url) => !this.peers.find((p) => p.url === url)
    );
  }

  get missingPeers() {
    return this.configuredPeers.filter(
      (url) => !this.peers.find((p) => p.url === url)
    );
  }

  missing$ = this.poll$.pipe(
    map(() => this.missingPeers),
    shareReplay(1)
  );

  disconnectAll() {
    this.ngGun.gun.back(-1); // this is dam
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
