import { Component, Optional, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRoute,
  ChildActivationEnd,
  NavigationEnd,
  Router,
} from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { filter } from 'rxjs/operators';
import { LogMessage, LogService } from '../../../log/src/lib/log.service';
import { NgGunService } from '../../../ng-gun/src/lib/ng-gun.service';
import { VERSION } from '../environments/version';
import { GunPeersComponent } from './components/gun-peers/gun-peers.component';
import { DiagnosticsService } from './diagnostics.service';
import { User } from './user/model';
import { AboutComponent } from './components/about/about.component';
import { GunRadImporterService } from './services/gun-rad-importer.service';
import { GunWebrtcImporterService } from './services/gun-webrtc-importer.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { OURONOTE_DEFAULT_TITLE } from './constants';
import { NgGunSessionService } from '../../../ng-gun/src/lib/ng-gun-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: any;
  messages: LogMessage[] = [];
  constructor(
    public ngGun: NgGunService<User>,
    private router: Router,
    private route: ActivatedRoute,
    private cb: ClipboardService,
    private logger: LogService,
    private dialog: MatDialog,
    public diagnosticsService: DiagnosticsService,
    @Optional()
    private radImporter: GunRadImporterService,
    @Optional()
    private webRtcImporter: GunWebrtcImporterService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private session: NgGunSessionService
  ) {
    this.matIconRegistry.addSvgIcon(
      'lasso',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/thenounproject/noun-lasso-1471841.svg'
      )
    );
    // logger.out$.subscribe(console.log);
    logger.log('app started');
    logger.log('Gun Imports', {
      radImporter,
      webRtcImporter,
    });

    this.user = this.ngGun.auth();
    window.document.title = OURONOTE_DEFAULT_TITLE; // `ouronote version ${VERSION.version}`;

    // let lastActivated: ChildActivationEnd;
    // router.events
    //   .pipe(filter((e) => e instanceof ChildActivationEnd))
    //   .subscribe((e) => (lastActivated = e as any));
    // router.events
    //   .pipe(filter((e) => e instanceof NavigationEnd))
    //   .subscribe((e) => {
    //     // console.log('last activated at navigation end', lastActivated);
    //     // this.logger.log(
    //     //   'last activated',
    //     //   // tslint:disable-next-line: only-arrow-functions
    //     //   JSON.stringify(lastActivated.snapshot, ['children', 'data'])
    //     // );
    //   });

    this.ngGun.auth().auth$.subscribe((ack: any) => {
      const redirect = sessionStorage.getItem('redirect');
      if (redirect) {
        this.logger.log('redirecting to %s', redirect);
        sessionStorage.removeItem('redirect');
        // router.navigateByUrl(redirect);
        window.location.href = redirect;
      }
    });
  }

  ngOnInit() {
    // if (typeof Worker !== 'undefined') {
    //   const worker = new Worker(
    //     new URL('./gun-worker.worker', import.meta.url)
    //   );
    //   worker.onmessage = (msg: any) => {
    //     console.log('message', msg);
    //   };
    //   worker.postMessage({
    //     call: 'getSession',
    //   });
    // }
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
    this.logger.log('generating bug report...');
    this.diagnosticsService.bugReport();
  }

  about() {
    this.dialog.open(AboutComponent);
  }
}
