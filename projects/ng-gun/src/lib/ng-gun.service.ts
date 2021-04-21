import { Inject, Injectable, NgZone } from '@angular/core';

import * as Gun from 'gun';
import { IGunChainReference } from 'gun/types/chain';
import { IGunConstructorOptions } from 'gun/types/options';
import { GunChain } from './classes/GunChain';
export const GunOptions = 'gun-options';
export type GunPeer = {
  batch: any;
  id: string;
  last: string;
  queue: string[];
  tail: any;
  url: string;
  wire: WebSocket;
};

export type GunPeers = {
  [key: string]: GunPeer;
};

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
