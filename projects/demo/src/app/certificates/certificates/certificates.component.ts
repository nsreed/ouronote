import { Component, OnInit } from '@angular/core';
import { ChainDirective } from '../../../../../ng-gun/src/lib/chain.directive';
import {
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  shareReplay,
} from 'rxjs/operators';
import { UserService } from '../../user/user.service';
import * as Gun from 'gun';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';
import { FormBuilder } from '@angular/forms';
import { LogService } from '../../../../../log/src/lib/log.service';
import { SEA } from 'gun';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  certList: any[] = [];
  selectionForm = this.fb.array([]);
  selectedCerts: any[] = [];

  pub$ = this.chainDirective.chain$.pipe(
    map((chain) => chain.recordPub.replace('~', '')),
    shareReplay(1)
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
    map((ownerTuple) => ownerTuple[0]),
    shareReplay(1)
  );
  constructor(
    private chainDirective: ChainDirective,
    private userService: UserService,
    private ngGun: NgGunService,
    private fb: FormBuilder,
    private logger: LogService
  ) {
    this.certs$.subscribe((c: any) => {
      this.certList = [];
      this.selectionForm = this.fb.array([]);
      const certs = chainDirective.chain?.get('certs');
      // tslint:disable-next-line: forin
      for (const p in c) {
        // tslint:disable-next-line: forin
        for (const u in c[p]) {
          console.log({ certs, p, u });
          const cert = certs?.get(p).get(u);
          cert?.once().subscribe((e: any) => {
            const ctl = this.fb.control(false);
            this.selectionForm.controls.push(ctl);
            const co = {
              path: p,
              user: u,
              cert: e,
              node: cert,
              select: ctl,
            };
            this.certList.push(co);
            ctl.valueChanges.subscribe((v) => {
              if (v) {
                this.selectedCerts.push(co);
              } else {
                this.selectedCerts = this.selectedCerts.filter((x) => x !== co);
              }
            });
          });
        }
      }
    });
    this.owners$.subscribe();
    // this.ngGun
    //   .findAlias(userService.user.is.pub)
    //   .subscribe((v) => console.log('alias', v));
  }

  ngOnInit(): void {}

  async blacklist() {
    const pub = this.chainDirective.chain?.recordPub.replace('~', '');
    const authed = await this.ngGun.asOwner(this.chainDirective.chain as any);
    this.selectedCerts.forEach(async (c) => {
      this.logger.log('blacklisting cert %o', c);
      const v: any = await SEA.verify(c.cert, pub);
      const blPath = v.wb || 'blacklist';
      const userPub = v.c;
      const bl = authed.get(blPath).get(userPub);
      bl.put(true as never);
    });
  }
}
