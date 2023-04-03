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
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  Router,
} from '@angular/router';
import { LogMessage, LogService } from 'log';
import { NgGunService } from 'ng-gun';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { ClipboardService } from 'ngx-clipboard';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { AboutComponent } from './components/about/about.component';
import { GunPeersComponent } from './components/gun-peers/gun-peers.component';
import { DiagnosticsService } from './diagnostics.service';
import { GunRadImporterService } from './services/gun-rad-importer.service';
import { GunWebrtcImporterService } from './services/gun-webrtc-importer.service';
import { SettingsService } from './settings.service';
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
  mediaChanges$ = this.media.asObservable();
  mediaClasses$ = this.mediaChanges$.pipe(
    map((changes) => changes.map((change) => change.mqAlias)),
    shareReplay(1)
  );

  navigationEnd$ = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd)
  );
  navigationError$ = this.router.events.pipe(
    filter((e) => e instanceof NavigationError)
  );

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
    public media: MediaObserver,
    private settingsService: SettingsService
  ) {
    media.filterOverlaps = true;
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
    const debugEnabled$ = this.settingsService.gun
      .get('debug')
      .get('enabled')
      .on();

    const routerEvent$ = debugEnabled$.pipe(
      switchMap(() => this.router.events)
    );

    router.events.subscribe((e) => console.log(`router event`, e));
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
    (window as any).loader?.hideOverlay();
    // throw new Error('anything'); // TODO using this we know there's no error being thrown on mobile
  }

  shortcuts: ShortcutInput[] = [
    { key: 'alt + b', label: 'Bug Report', command: () => this.bugReport() },
    { key: 'alt + p', label: 'Peers', command: () => this.peers() },
    { key: 'alt + a', label: 'About', command: () => this.about() },
  ];

  logout() {
    this.ngGun.auth().logout();
    this.router.navigateByUrl('/login');
  }

  peers() {
    return this.dialog.open(GunPeersComponent, {
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
    return this.dialog.open(AboutComponent);
  }
}
