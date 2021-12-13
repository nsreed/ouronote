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
    private router: Router
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

  async accept(request: any) {
    this.logger.log('accepting invite request for %s', request);
    this.chainDirective.chain
      ?.get('owner')
      .get(this.userService.user.is.pub)
      .once()
      .subscribe(async (ownerPair: any) => {
        const pair = await SEA.decrypt(ownerPair, this.userService.user.is);
        // this.logger.log('got owner pair %o', pair);
        const certs = await this.vectorService.certify(
          { pub: request.replace('~', '') },
          ['layers'],
          pair
        );

        // FIXME this is bad, you should report this behavior to Mark
        const authPair = sessionStorage.getItem('pair');
        const pairRestore$ = new Subject();
        pairRestore$
          .pipe(delay(1000))
          .subscribe((a: any) => sessionStorage.setItem('pair', a));

        this.logger.log('created certificate %o', certs);
        const detachedGun = new NgGunService(
          this.gunOpts,
          this.ngZone,
          this.router
        );
        // this.chainDirective.chain?.get('certs').put(certs as never);
        (detachedGun.gun.user() as any).auth(pair, () => {
          this.logger.log('secondary auth succeeded');
          const v = detachedGun.user().get('certs');
          v.put(certs as never);
          this.chainDirective.chain
            ?.get('inviteRequests')
            .get(request)
            .put(null as never);
          pairRestore$.next(authPair);
        });
      });
  }

  reject(request: any) {
    this.logger.log('rejecting invite request for %s', request);
    this.chainDirective.chain
      ?.get('inviteRequests')
      .get(request)
      .put(null as never);
  }
}
