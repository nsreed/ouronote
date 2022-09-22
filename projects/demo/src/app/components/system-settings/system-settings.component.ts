import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, FormBuilder } from '@angular/forms';
import { SettingsService } from '../../settings.service';
import { Router } from '@angular/router';
import { GunChain } from 'projects/ng-gun/src/lib/classes/GunChain';
import { timer } from 'rxjs';

export interface SettingsGraph {
  gun: {
    file: string;
    peers: string[];
    enableWebRTC: boolean;
    enableLocalStorage: boolean;
  };
  debug:
    | {
        enabled: boolean;
      }
    | boolean;
  log: {
    level: number;
  };
  system: {
    enableImages: boolean;
  };
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
  file = 'radata';
  @Property()
  peers = [];
  @Property()
  enableWebRTC = false;
  @Property()
  enableLocalStorage = false;
  time = Date.now();
}

class CapabilitySettings {
  touch = false;
  pen = false;
}

class LogSettings {
  level = 3;
}

class SystemSettings {
  enableImages = false;
}

class Settings implements SettingsGraph {
  @Property({ ref: GunSettings })
  gun = new GunSettings();
  @Property({
    type: 'boolean',
  })
  debug = false;
  @Property({
    ref: CapabilitySettings,
  })
  capabilities = new CapabilitySettings();
  @Property({
    ref: LogSettings,
  })
  log = new LogSettings();
  @Property({ ref: SystemSettings })
  system = new SystemSettings();
}

function propsFor(con: any) {
  const proto = con.prototype || Object.getPrototypeOf(con);
  return proto.___PROPERTIES;
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

  defaultSettings = new Settings();

  constructor(
    private fb: UntypedFormBuilder,
    private tfb: FormBuilder,
    private settingsService: SettingsService,
    private router: Router
  ) {
    tfb.group<Partial<Settings>>({
      debug: true,
    });
    const s = new Settings();

    const settingsProps = propsFor(Settings);
    console.log('settings props', settingsProps);

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
