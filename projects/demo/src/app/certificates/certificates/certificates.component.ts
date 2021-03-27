import { Component, OnInit } from '@angular/core';
import { ChainDirective } from '../../../../../ng-gun/src/lib/chain.directive';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../user/user.service';
import * as Gun from 'gun';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  pub$ = this.chainDirective.chain$.pipe(
    map((chain) => chain.recordPub.replace('~', ''))
  );
  certs$ = this.chainDirective.chain$.pipe(
    switchMap((chain) => chain.get('certs').open())
  );
  owners$ = this.chainDirective.chain$.pipe(
    switchMap((chain) => chain.get('owner').open())
  );
  owner$ = this.chainDirective.chain$.pipe(
    mergeMap((node) =>
      node.get('owner').map({ includeKeys: true }).on({ includeKeys: true })
    ),
    filter(
      (ownerTuple: any) =>
        ownerTuple[0] &&
        ownerTuple[1] === this.userService.user.is.pub.replace('~', '')
    ),
    map((ownerTuple) => ownerTuple[0])
  );
  constructor(
    private chainDirective: ChainDirective,
    private userService: UserService,
    private ngGun: NgGunService
  ) {
    this.certs$.subscribe((c) => console.log('certs raw', c));
    this.owners$.subscribe();
    this.ngGun
      .findAlias(userService.user.is.pub)
      .subscribe((v) => console.log('alias', v));
  }

  ngOnInit(): void {}
}
