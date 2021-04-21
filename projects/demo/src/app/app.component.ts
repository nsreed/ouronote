import { Component } from '@angular/core';
import { NgGunService, GunPeer } from '../../../ng-gun/src/lib/ng-gun.service';
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
    private logger: LogService
  ) {
    logger.log('app started');
    this.user = this.ngGun.auth();
    // console.log('!! ROUTE SNAPSHOT', route.snapshot);

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

  bugReport() {
    LogService.buffer$.pipe(take(1)).subscribe((messages) => {
      console.table(messages);
      const peers = Object.keys(this.ngGun.peers).map((k) => {
        const rawPeer = this.ngGun.peers[k] as GunPeer;

        const x = {
          ...rawPeer,
          wire: {
            readyState: rawPeer.wire.readyState,
            protocol: rawPeer.wire.protocol,
            extensions: rawPeer.wire.extensions,
            bufferedAmount: rawPeer.wire.bufferedAmount,
          },
        };
        return x;
      });
      const graph = this.ngGun.gun._.graph;
      const gunConstructorOptions = this.ngGun.gunOptions;
      const report = {
        url: this.router.url,
        is: this.user.is?.pub,
        gunConstructorOptions,
        peers,
        graph,
        log: messages,
      };
      const reportStr = JSON.stringify(report, null, 2);
      // console.log(reportStr);
      this.cb.copy(reportStr);
      const graphBlob = new Blob([reportStr], {
        type: 'text/plain;charset=utf-8',
      });
      saveAs(graphBlob, `ouronote-bugreport-${Date.now()}.json`);
    });
    // });
    // this.logger.out$
    //   .pipe(
    //     scan((acc, val) => {
    //       acc.push(val as never);
    //       return acc;
    //     }, []),
    //     take(1)
    //   )
    //   .subscribe((messages) => {
    //     console.log({ messages });
    //   });
  }
}
