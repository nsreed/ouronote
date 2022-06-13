import { Inject, Injectable, NgZone } from '@angular/core';
import * as Gun from 'gun';
import { SEA } from 'gun';
import { IGunConstructorOptions } from 'gun/types/options';
import { IGunCryptoKeyPair } from 'gun/types/types';
import { map, take } from 'rxjs/operators';
import { GunChain } from './classes/GunChain';
import { GunPeers } from './GunPeers';

export const GunOptions = 'gun-options';
@Injectable()
export class NgGunService<
  DataType = Record<string, any>,
  ReferenceKey = any
> extends GunChain<DataType, ReferenceKey, 'pre_root'> {
  get peers(): GunPeers {
    return this.gun._.root.opt.peers;
  }

  redirect?: string;

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

  findUserAlias(pubKey: string) {
    this.logger.log('finding alias for', pubKey);
    return this.get(`~${pubKey.replace('~', '')}` as any)
      .once()
      .pipe(
        map((v: any) => {
          if (typeof v.alias === 'string') {
            return v.alias;
          } else {
            this.logger.warn(
              'could not find string alias. Found %o for %s',
              v.alias,
              pubKey
            );
            return pubKey;
          }
        })
      );
  }

  async detached(pair: IGunCryptoKeyPair) {
    const detachedService = new NgGunService(this.gunOptions, this.ngZone);
    // problem: detachedService.auth() automatically recalls the session, so subsequent logins override the session itself
    const detachedUser = detachedService.auth(false); // forces auth() to instantiate user, and not recall (or hopefully store) session
    detachedUser.login(pair);
    await detachedUser.auth$.pipe(take(1)).toPromise();
    return detachedService;
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
    const t = p.reduce((prev: any, c: any) => prev.get(c), detached.user());
    return t;
  }
}
