import { Inject, Injectable, Optional, NgZone } from '@angular/core';
import { NgGunService } from 'ng-gun';
import { GunChain } from 'ng-gun';
import * as Gun from 'gun';
import { Bool, Node, Num, Prop, Ref, Str } from './common/metadata';

export type GunSettingsSchema = {
  file: string;
  localStorage: boolean;
  peers: string[];
  enableWebRTC: boolean;
  enableRadisk: boolean;
};

export type LogSettingsSchema = {
  level: number;
  outLevel: number;
};

export type DebugSettingsSchema = {
  enabled: boolean;
};

export type DiagnosticsSettingsSchema = {
  timeout: number;
  interval: number;
  reconnectAfter: number;
};

export type SettingsSchema = {
  gun: GunSettingsSchema;
  diagnostics: DiagnosticsSettingsSchema;
  debug: DebugSettingsSchema;
  log: LogSettingsSchema;
};

@Node()
export class GunSettingsSchematic implements GunSettingsSchema {
  @Str({ defaultValue: 'ouronote' }) file!: string;
  @Bool() localStorage!: boolean;
  @Prop({
    defaultValue: [],
    multi: true,
    type: 'set',
    reference: 'string',
  })
  peers!: string[];
  @Bool() enableWebRTC!: boolean;
  @Bool() enableRadisk!: boolean;
}

@Node(true)
export class LogSettingsSchematic implements LogSettingsSchema {
  @Num()
  level: number = 0;
  @Num()
  outLevel: number = 0;
}

@Node()
export class DebugSettingsSchematic implements DebugSettingsSchema {
  @Bool()
  enabled!: boolean;
}

@Node()
export class DiagnosticsSettingsSchematic implements DiagnosticsSettingsSchema {
  @Num({
    description: 'How long to wait before trying to refresh the connection',
  })
  timeout!: number;
  @Num({
    defaultValue: 30 * 1000,
    min: 1000,
    description: 'Automatically refresh the connection',
  })
  interval!: number;
  @Num({
    defaultValue: 30 * 1000,
    min: 1000,
    unit: 'ms',
    units: 'ms',
  })
  reconnectAfter!: number;
  @Num({
    defaultValue: 10,
    min: 10,
    unit: 'minute',
    units: 'minutes',
  })
  giveUpAfter!: number;
}

@Node()
export class OuronoteSettingsSchematic implements Partial<SettingsSchema> {
  @Ref({
    resolve: GunSettingsSchematic,
    summary: `gun.db settings`,
  })
  gun!: GunSettingsSchema;
  @Ref(DiagnosticsSettingsSchematic)
  diagnostics!: DiagnosticsSettingsSchema;
  @Ref(DebugSettingsSchematic)
  debug!: DebugSettingsSchema;
  @Ref({
    resolve: LogSettingsSchematic,
    summary: 'Logging settings',
  })
  log!: LogSettingsSchema;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _gun = new GunChain<{ current: SettingsSchema }>(
    this.ngZone,
    new Gun({
      file: 'settings',
      localStorage: false,
      peers: [],
    }) as any,
    null as any
  );

  gun = this._gun.get('current');
  schema = OuronoteSettingsSchematic;
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
  ) {}

  save() {
    localStorage.setItem('WEBRTC_ENABLE', JSON.stringify(this.enableWebRTC));
    localStorage.setItem('RADISK_ENABLE', JSON.stringify(this.enableRadisk));
  }
}
