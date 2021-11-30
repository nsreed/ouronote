import { Inject, Injectable, NgZone } from '@angular/core';

import * as Gun from 'gun';
import { IGunChainReference } from 'gun/types/chain';
import { IGunConstructorOptions } from 'gun/types/options';
import { GunChain } from './classes/GunChain';
import { GunPeers } from './GunPeers';
import { SEA } from 'gun';
import { ReplaySubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
export const GunOptions = 'gun-options';
@Injectable()
export class NgGunService<
  DataType = Record<string, any>,
  ReferenceKey = any
> extends GunChain<DataType, ReferenceKey, 'pre_root'> {
  get peers(): GunPeers {
    return this.gun._.root.opt.peers;
  }

  constructor(
    @Inject(GunOptions)
    public readonly gunOptions: IGunConstructorOptions,
    ngZone: NgZone
  ) {
    super(
      ngZone,
      new Gun(JSON.parse(JSON.stringify(gunOptions))) as any,
      null as any
    );
  }

  findAlias(alias: string) {
    return this.get(`~@${alias}` as any).once();
  }

  async asOwner(node: GunChain) {
    const nodeRoot = node.isSubRoot ? node : node.closestRoot;
    const owner: any = await nodeRoot
      .get('owner')
      .get(this.auth().is.pub)
      .once()
      .toPromise();
    const ownerPair: any = await SEA.decrypt(owner, this.auth().is);
    const detached = new NgGunService(this.gunOptions, this.ngZone);
    const a = await new Promise((res, rej) => {
      (detached.gun.user() as any).auth(ownerPair, (ack: any) => {
        res(ack.sea);
      });
    });
    const p = node.path.reverse();
    p.shift();
    const t = p.reduce((prev, c) => prev.get(c), detached.user());
    return t;
  }
}
