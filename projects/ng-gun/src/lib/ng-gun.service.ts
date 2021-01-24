import { Inject, Injectable, NgZone } from '@angular/core';

import * as Gun from 'gun';
import { IGunChainReference } from 'gun/types/chain';
import { IGunConstructorOptions } from 'gun/types/options';
import { GunRx } from './functions/gun-rx';

export const GunOptions = 'gun-options';

@Injectable({
  providedIn: 'root',
})
export class NgGunService<B> {
  readonly gun: IGunChainReference<B, any, 'pre_root'>;
  constructor(
    @Inject(GunOptions)
    private gunOptions: IGunConstructorOptions,
    private ngZone: NgZone
  ) {
    console.log(gunOptions);
    this.gun = Gun(gunOptions);
    GunRx(ngZone)(Gun);
  }
}
