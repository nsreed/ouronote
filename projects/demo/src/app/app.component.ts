import { Component } from '@angular/core';
import { NgGunService } from '../../../ng-gun/src/lib/ng-gun.service';
import { GunPeer } from '../../../ng-gun/src/lib/GunPeer';
import { User } from './user/model';
import {
  Router,
  ActivatedRoute,
  ChildActivationEnd,
  NavigationEnd,
} from '@angular/router';
import {
  filter,
  reduce,
  takeLast,
  take,
  scan,
  last,
  takeUntil,
} from 'rxjs/operators';
import { ClipboardService } from 'ngx-clipboard';
import { saveAs } from 'file-saver';
import { LogService, LogMessage } from '../../../log/src/lib/log.service';
import { MatDialog } from '@angular/material/dialog';
import { BugReportComponent } from './components/bug-report/bug-report.component';
import { GunPeersComponent } from './components/gun-peers/gun-peers.component';
import { VERSION } from '../environments/version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: any;
  messages: LogMessage[] = [];
  constructor(
    public ngGun: NgGunService<User>,
    private router: Router,
    private route: ActivatedRoute,
    private cb: ClipboardService,
    private logger: LogService,
    private dialog: MatDialog
  ) {
    logger.log('app started');
    this.user = this.ngGun.auth();
    // console.log('!! ROUTE SNAPSHOT', route.snapshot);
    window.document.title = `ouronote version ${VERSION.version}`;

    let lastActivated: ChildActivationEnd;
    router.events
      .pipe(filter((e) => e instanceof ChildActivationEnd))
      .subscribe((e) => (lastActivated = e as any));
    router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        // console.log('last activated at navigation end', lastActivated);
        // this.logger.log(
        //   'last activated',
        //   // tslint:disable-next-line: only-arrow-functions
        //   JSON.stringify(lastActivated.snapshot, ['children', 'data'])
        // );
      });
    // const log = this.logger.out$.pipe();
    // log.subscribe((message) => this.messages.push(message));
    // router.events.subscribe((e) => console.log('router event', e));
  }

  logout() {
    this.ngGun.auth().logout();
    this.router.navigateByUrl('/login');
  }

  peers() {
    this.dialog.open(GunPeersComponent, {
      data: {
        ngGun: this.ngGun,
      },
      width: '80%',
      height: '80%',
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
    LogService.buffer$.pipe(take(1)).subscribe((messages) => {
      this.dialog.open(BugReportComponent, {
        data: {
          gun: this.ngGun.gun,
          peers,
          messages,
        },
        width: '80%',
        height: '80%',
      });
    });
    // LogService.buffer$.pipe(take(1)).subscribe((messages) => {
    //   console.table(messages);
    //   const peers = Object.keys(this.ngGun.peers).map((k) => {
    //     const rawPeer = this.ngGun.peers[k] as GunPeer;

    //     const x = {
    //       ...rawPeer,
    //       wire: {
    //         readyState: rawPeer.wire.readyState,
    //         protocol: rawPeer.wire.protocol,
    //         extensions: rawPeer.wire.extensions,
    //         bufferedAmount: rawPeer.wire.bufferedAmount,
    //       },
    //     };
    //     return x;
    //   });
    //   const graph = this.ngGun.gun._.graph;
    //   const gunConstructorOptions = this.ngGun.gunOptions;
    //   const report = {
    //     url: this.router.url,
    //     is: this.user.is?.pub,
    //     gunConstructorOptions,
    //     peers,
    //     graph,
    //     log: messages,
    //   };
    //   const reportStr = JSON.stringify(report, null, 2);
    //   // console.log(reportStr);
    //   this.cb.copy(reportStr);
    //   const graphBlob = new Blob([reportStr], {
    //     type: 'text/plain;charset=utf-8',
    //   });
    //   saveAs(graphBlob, `ouronote-bugreport-${Date.now()}.json`);
    // });
  }
}
