import { Component, OnInit } from '@angular/core';
import { ChainDirective } from '../../../../../ng-gun/src/lib/chain.directive';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
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
    private userService: UserService
  ) {
    this.certs$.subscribe();
    this.owners$.subscribe();
  }

  ngOnInit(): void {}
}
