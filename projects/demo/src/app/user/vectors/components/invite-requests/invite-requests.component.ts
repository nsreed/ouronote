import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { ChainDirective } from '../../../../../../../ng-gun/src/lib/chain.directive';
import { map, switchMap, shareReplay, delay } from 'rxjs/operators';
import { UserService } from '../../../user.service';
import { LogService } from '../../../../../../../log/src/lib/log.service';
import { VectorService } from '../../vector.service';
import { NgSeaService } from '../../../../../../../ng-gun/src/lib/ng-sea.service';
import { SEA } from 'gun';
import { NgGunService } from '../../../../../../../ng-gun/src/lib/ng-gun.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../../components/confirm/confirm.component';
import { IGunCryptoKeyPair } from 'gun/types/types';

@Component({
  selector: 'app-invite-requests',
  templateUrl: './invite-requests.component.html',
  styleUrls: ['./invite-requests.component.scss'],
})
export class InviteRequestsComponent implements OnInit {
  requests$ = this.chainDirective.chain$.pipe(
    switchMap((chain) => chain.get('inviteRequests').open()),
    map((requests: any) => Object.keys(requests).filter((k) => requests[k])),
    shareReplay(1)
  );
  requests: any = [];
  count$ = this.requests$.pipe(map((r) => r.length));
  constructor(
    private chainDirective: ChainDirective,
    private userService: UserService,
    private logger: LogService,
    private vectorService: VectorService,
    private sea: NgSeaService,
    private ngZone: NgZone,
    @Inject('gun-options')
    private gunOpts: any,
    private router: Router,
    private dialog: MatDialog,
    private ngGun: NgGunService
  ) {
    this.requests$.subscribe((requests: any) => {
      console.log(JSON.stringify(requests));
      this.requests = requests;
    });
  }

  ngOnInit(): void {}

  generate() {
    const userPub = '~' + this.userService.user.is.pub;
    this.chainDirective.chain
      ?.get('inviteRequests')
      .get(userPub)
      .put(true as never);
  }

  info(pubKey: any) {
    this.ngGun.findUserAlias(pubKey).subscribe((alias) => {
      this.dialog.open(ConfirmComponent, {
        data: {
          title: 'User Public Key',
          prompt: `@${alias} has the following public key:`,
          detail: pubKey,
          options: [{ text: 'OK' }],
        },
      });
    });
  }

  async accept(pubKey: any) {
    const alias = await this.ngGun.findUserAlias(pubKey).toPromise();

    const answer = await this.dialog
      .open(ConfirmComponent, {
        data: {
          title: 'Confirm Invite',
          prompt: `Are you sure you want to permanently invite @${alias}?`,
        },
      })
      .afterClosed()
      .toPromise();
    if (!answer) {
      return;
    }
    const ownerPair = await this.chainDirective.chain
      ?.get('owner')
      .get(this.userService.user.is.pub)
      .once()
      .toPromise();
    this.logger.log('accepting invite request for %s', pubKey);
    const pair = (await SEA.decrypt(
      ownerPair,
      this.userService.user.is
    )) as IGunCryptoKeyPair;
    const certs = await this.vectorService.certify(
      { pub: pubKey.replace('~', '') },
      ['layers'],
      pair
    );

    this.logger.log('created certificate %o', certs);
    const detachedGun = await this.ngGun.detached(pair);
    detachedGun
      .auth()
      .get('certs')
      .put(certs as never);
    this.chainDirective.chain
      ?.get('inviteRequests')
      .get(pubKey)
      .put(null as never);
    return;
  }

  reject(request: any) {
    this.logger.log('rejecting invite request for %s', request);
    this.chainDirective.chain
      ?.get('inviteRequests')
      .get(request)
      .put(null as never);
  }
}
