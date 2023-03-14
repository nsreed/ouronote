import { NgGunService } from 'ng-gun';
import { Inject, Injectable, NgZone } from '@angular/core';
import { GunStoreEnum } from '../settings.service';

@Injectable({
  providedIn: 'root',
})
export class OuronoteGunService extends NgGunService {
  constructor(@Inject('gun-options') gunOptions: any, ngZone: NgZone) {
    super(gunOptions, ngZone);
  }
}
