import { Inject, Injectable, Optional, NgZone } from '@angular/core';
import { NgGunService } from '../../../ng-gun/src/lib/ng-gun.service';
import { GunChain } from '../../../ng-gun/src/lib/classes/GunChain';
import * as Gun from 'gun';

export type GunSettingsSchema = {
  file: string;
  localStorage: boolean;
  peers: string[];
  enableWebRTC: boolean;
  enableRadisk: boolean;
};

export type SettingsSchema = {
  gun: GunSettingsSchema,
  diagnostics: {
    timeout: number,
    interval: number,
    reconnectAfter: number
  },
  debug: {
    enabled: boolean
  }
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  _gun = new GunChain<{ current: SettingsSchema }>(
    this.ngZone,
    new Gun({
      file: 'settings',
      localStorage: false,
      peers: [],
    }) as any,
    null as any
  );
  gun = this._gun.get('current');
  input = {
    touchToDraw: true,
  };
  constructor(
    @Inject('enable-webrtc')
    public enableWebRTC: boolean,
    @Inject('enable-radisk')
    public enableRadisk: boolean,
    @Optional()
    @Inject('settings.debug')
    public debug: boolean,
    private ngZone: NgZone
  ) { }

  save() {
    localStorage.setItem('WEBRTC_ENABLE', JSON.stringify(this.enableWebRTC));
    localStorage.setItem('RADISK_ENABLE', JSON.stringify(this.enableRadisk));
  }
}
