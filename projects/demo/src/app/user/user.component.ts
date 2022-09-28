import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CertificatesComponent } from '../components/certificates/certificates.component';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogService } from 'log';
import { NgGunService } from 'ng-gun';
import { ConfirmComponent } from '../components/confirm/confirm.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  authPoll$ = timer(1000, 1000).pipe(map((t) => this.ngGun.auth().alias));
  hasConfirmDialog = false;
  lastAlias: string =
    'LKDHFS:LSKDHFDSYFNBWEOHFPOSIDHGS:DLKN:LSDKFHOIFYSODHFGS:DGHSDYLIEHTLKHLGSHDGHSDGF:I SDYUFISYDFNBSDOIFNPSDOIFNUDSPOGUNPSDOGSDPOGSHEPGOIEMGESIOGHMSEGPOSEHG';
  constructor(
    private userService: UserService,
    router: Router,
    route: ActivatedRoute,
    private dialog: MatDialog,
    private logger: LogService,
    private ngGun: NgGunService
  ) {
    // console.log('user route', route.routeConfig?.children);
    this.authPoll$.subscribe((alias) => {
      if (
        // Math.random() < 0.5 ||
        this.lastAlias !==
          'LKDHFS:LSKDHFDSYFNBWEOHFPOSIDHGS:DLKN:LSDKFHOIFYSODHFGS:DGHSDYLIEHTLKHLGSHDGHSDGF:I SDYUFISYDFNBSDOIFNPSDOIFNUDSPOGUNPSDOGSDPOGSHEPGOIEMGESIOGHMSEGPOSEHG' &&
        this.lastAlias !== undefined &&
        this.lastAlias !== alias
      ) {
        this.onAuthChange();
      }
      this.lastAlias = alias;
    });
  }

  ngOnInit(): void {
    // this.messages.on().subscribe((msgs) => console.log('messages', msgs));
  }

  openCertificates() {
    this.dialog.open(CertificatesComponent, { height: '90%', width: '90%' });
  }

  onAuthChange() {
    if (!this.hasConfirmDialog) {
      this.hasConfirmDialog = true;
      this.dialog
        .open(ConfirmComponent, {
          data: {
            title: 'ono Oh No!',
            prompt:
              'ouronote has encountered a problem and needs to refresh. You will need to log in again.',
            options: [
              {
                text: 'OK',
              },
            ],
          },
        })
        .afterClosed()
        .subscribe((result) => {
          this.userService.user.logout();
          this.hasConfirmDialog = false;
        });
    }
  }
}
