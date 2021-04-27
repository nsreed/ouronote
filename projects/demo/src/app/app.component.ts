import { Component } from '@angular/core';
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
    private dialog: MatDialog,
    private diagnosticsService: DiagnosticsService
  ) {
    // logger.out$.subscribe(console.log);
    logger.log('app started');
    this.user = this.ngGun.auth();
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
}
