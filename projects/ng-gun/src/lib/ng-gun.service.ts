import { Inject, Injectable, NgZone } from '@angular/core';

import * as Gun from 'gun';
import { IGunChainReference } from 'gun/types/chain';
import { IGunConstructorOptions } from 'gun/types/options';
import { GunChain } from './classes/GunChain';
import { GunPeers } from './GunPeers';
export const GunOptions = 'gun-options';
@Injectable({
  providedIn: 'root',
})
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
    super(ngZone, new Gun(JSON.parse(JSON.stringify(gunOptions))) as any);
  }

  findAlias(alias: string) {
    return this.get(`~@${alias}` as any).once();
  }
}
