import { Injectable, NgZone } from '@angular/core';

import * as Gun from 'gun';
import { IGunChainReference } from 'gun/types/chain';
import { IGunConstructorOptions } from 'gun/types/options';
import { GunRx } from './functions/gun-rx';

@Injectable({
  providedIn: 'root',
})
export class NgGunService<B> {
  gun: IGunChainReference<B, any, 'pre_root'>;
  constructor(private ngZone: NgZone) {
    this.gun = Gun({ localStorage: true });
    GunRx(ngZone)(Gun);
  }
}
