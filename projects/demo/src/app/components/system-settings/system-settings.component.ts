import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { SettingsService } from '../../settings.service';
import { Router } from '@angular/router';
import { GunChain } from 'projects/ng-gun/src/lib/classes/GunChain';
import { timer } from 'rxjs';

export interface SettingsGraph {
  gun: {
    peers: string;
  };
  debug: boolean;
}

function Property(config?: any) {
  config = config || {};
  return function (proto: any, name: string, ...args: any[]) {
    config = { name, ...config };
    proto.___PROPERTIES = proto.___PROPERTIES || ({} as any);
    proto.___PROPERTIES[name] = config;
  };
}

class GunSettings {
  @Property()
  peers = `[]`;
  @Property()
  file = 'radata';
  @Property()
  localStorage = false;
  time = 0;
  @Property()
  webRTC = false;
}

class Settings {
  @Property({ ref: GunSettings })
  gun = new GunSettings();
  @Property()
  debug = false;
  capabilities = {
    touch: {
      enabled: false,
    },
    pen: {
      enabled: false,
    },
  };
}

export interface SettingsRoot {
  machine: Settings;
}

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss'],
})
export class SystemSettingsComponent implements OnInit {
  settingsForm = this.fb.group({
    enableWebRTC: false,
    enableRadisk: false,
  });

  settingsGun = this.settingsService.gun as GunChain<SettingsRoot>;

  constructor(
    private fb: UntypedFormBuilder,
    private settingsService: SettingsService,
    private router: Router
  ) {
    const s = new Settings();
    console.log('settings props', (Settings.prototype as any)['___PROPERTIES']);
    this.settingsForm.patchValue({
      enableWebRTC: settingsService.enableWebRTC,
      enableRadisk: settingsService.enableRadisk,
    });

    const machine = this.settingsGun.get('machine');
    const gun = machine.get('gun');
    gun.get('file').put('settings');
    gun.get('time').put(Date.now());

    this.settingsGun.get('machine').put({
      debug: true,
    } as never);
  }

  ngOnInit(): void {}

  save() {
    this.settingsService.enableRadisk = this.settingsForm.value.enableRadisk;
    this.settingsService.enableWebRTC = this.settingsForm.value.enableWebRTC;
    this.settingsService.save();
    this.router
      .navigateByUrl('/')
      .then((s) => (window.location = window.location));
  }
}
