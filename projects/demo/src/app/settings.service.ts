import { Inject, Injectable, Optional } from '@angular/core';
import { NgGunService } from '../../../ng-gun/src/lib/ng-gun.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
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
    public debug: boolean
  ) {}

  save() {
    localStorage.setItem('WEBRTC_ENABLE', JSON.stringify(this.enableWebRTC));
    localStorage.setItem('RADISK_ENABLE', JSON.stringify(this.enableRadisk));
  }
}
