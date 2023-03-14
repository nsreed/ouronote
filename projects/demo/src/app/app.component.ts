import { filter } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { LogMessage, LogService } from 'log';
import { NgGunService } from 'ng-gun';
import { ClipboardService } from 'ngx-clipboard';
import { AboutComponent } from './components/about/about.component';
import { GunPeersComponent } from './components/gun-peers/gun-peers.component';
import { DiagnosticsService } from './diagnostics.service';
import { GunRadImporterService } from './services/gun-rad-importer.service';
import { GunWebrtcImporterService } from './services/gun-webrtc-importer.service';
import { User } from './user/model';
declare const APP_HASH: any;

const loader = (window as any)['loader'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  user: any;
  messages: LogMessage[] = [];
  constructor(
    public ngGun: NgGunService<User>,
    public router: Router,
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
    public media: MediaObserver
  ) {
    loader.finishTask('appstart');
    this.matIconRegistry.addSvgIcon(
      'lasso',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/thenounproject/noun-lasso-1471841.svg'
      )
    );
    // logger.out$.subscribe(console.log);
    logger.log('app started', APP_HASH);
    //what

    logger.verbose('Gun Imports', {
      radImporter,
      webRtcImporter,
    });

    this.user = this.ngGun.auth();
    this.ngGun.auth().auth$.subscribe((ack: any) => {
      const redirect = sessionStorage.getItem('redirect');
      if (redirect) {
        this.logger.log('redirecting to %s', redirect);
        sessionStorage.removeItem('redirect');
        // router.navigateByUrl(redirect);
        window.location.href = redirect;
      }
    });

    router.events
      .pipe(filter((e) => e instanceof RouterEvent))
      .subscribe((event) => {
        console.log(event);
      });
  }

  @ViewChild('nav')
  leftSidebar!: MatSidenav;

  async ngOnInit() {
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
    // if (navigator.storage && navigator.storage.estimate) {
    //   let quota = {} as any;
    //   quota = { ...quota, ...(await navigator.storage.estimate()) };
    //   // quota.usage -> Number of bytes used.
    //   // quota.quota -> Maximum number of bytes available.
    //   if (quota === undefined) {
    //     return;
    //   } else {
    //     const percentageUsed = (quota.usage / quota.quota) * 100;
    //     console.log(`You've used ${percentageUsed}% of the available storage.`);
    //     const remaining = quota.quota - quota.usage;
    //     console.log(`You can write up to ${remaining} more bytes.`);
    //   }
    //   // await navigator.storage.persist();
    // }
  }

  ngAfterViewInit(): void {
    (window as any).loader.hideOverlay();
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
