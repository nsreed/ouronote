import { Inject, Injectable, NgZone } from '@angular/core';

import * as Gun from 'gun';
import { IGunChainReference } from 'gun/types/chain';
import { IGunConstructorOptions } from 'gun/types/options';
import { GunChain } from './classes/GunChain';
export const GunOptions = 'gun-options';

@Injectable({
  providedIn: 'root',
})
export class NgGunService<
  DataType = Record<string, any>,
  ReferenceKey = any
> extends GunChain<DataType, ReferenceKey, 'pre_root'> {
  constructor(
    @Inject(GunOptions)
    private gunOptions: IGunConstructorOptions,
    ngZone: NgZone
  ) {
    super(ngZone, new Gun(gunOptions));
  }
}
