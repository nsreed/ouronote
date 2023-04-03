import { Inject, Injectable, NgZone, Optional } from '@angular/core';
import * as Gun from 'gun';
import { GunChain } from 'ng-gun';
import { firstValueFrom, from } from 'rxjs';
import { filter, map, mergeMap, mergeWith, take } from 'rxjs/operators';
import { PropertyOptions, ValidationTuple } from './common/metadata';
import {
  Bool,
  Enum,
  makeMetaGetter,
  Node,
  Num,
  Prop,
  PropMetadata,
  Ref,
  Str,
} from './common/metadata';
export enum GunStoreEnum {
  RADISK = 'radisk',
  LOCALSTORAGE = 'localstorage',
  NONE = 'none',
}

export type GunSettingsSchema = {
  peers: string[];
  enableWebRTC: boolean;
  /** @deprecated use GunSettingsSchema.storage instead */
  enableRadisk?: boolean;
  /** @deprecated use #storage instead */
  localStorage?: boolean;

  storage: GunStoreEnum;
  file: string;
};

export type DiagnosticsSettingsSchema = {
  timeout: number;
  interval: number;
  reconnectAfter: number;
};

export type DebugSettingsSchema = {
  enabled: boolean;
};

export type LogSettingsSchema = {
  level: number;
  outLevel: number;
  persist: boolean;
  bypassLogger: boolean;
};

export type SettingsSchema = {
  gun: GunSettingsSchema;
  diagnostics: DiagnosticsSettingsSchema;
  debug: DebugSettingsSchema;
  log: LogSettingsSchema;
};

@Node()
export class GunSettingsSchematic implements GunSettingsSchema {
  @Str({
    description: 'IndexedDB Database Name',
    defaultValue: 'radata',
    minLength: 1,
  })
  file!: string;

  @Prop({
    description: 'Relay peer URLs',
    defaultValue: [],
    multi: true,
    type: 'set',
    reference: 'string',
  })
  peers!: string[];

  @Bool({
    description: 'Enable direct communication to mesh peers via WebRTC',
    defaultValue: true,
  })
  enableWebRTC!: boolean;
  @Enum({
    description: 'Data storage strategy',
    defaultValue: 'radisk',
    indexType: 'string',
    options: {
      radisk: 'radisk',
      localstorage: 'localStorage',
      none: 'none',
    },
    optionDescriptions: {
      radisk:
        'Uses radix trees & IndexedDB. High performance and storage capacity.',
      localstorage:
        'Uses the localStorage API to store up to 5MB of data. Slow and small.',
      none:
        `For testing purposes only. Ouronote will be unable to store data except in memory, ` +
        `and will forget everything unless it gets transmitted to a peer.`,
    },
  })
  storage = GunStoreEnum.RADISK;
}

@Node()
export class LogSettingsSchematic implements LogSettingsSchema {
  @Enum({
    description: 'Retain messages at or above this level',
    options: {
      0: 'Verbose',
      1: 'Info',
      2: 'Warning',
      3: 'Error',
      4: 'Catastrophic Failure',
    },
    defaultValue: 2,
  })
  level: number = 2;
  @Enum({
    description: 'Output messages at or above this level to the console',
    options: {
      0: 'Verbose',
      1: 'Info',
      2: 'Warning',
      3: 'Error',
      4: 'Catastrophic Failure',
    },
    defaultValue: 3,
  })
  outLevel: number = 3;
  @Bool({
    description: 'Save log messages after closing/refreshing the tab?',
    defaultValue: false,
  })
  persist = false;
  @Bool({
    description: `Output messages directly to console?`,
    defaultValue: false,
  })
  bypassLogger = false;
}

@Node({ description: `Various checkboxes for debugging/experimental purposes` })
export class DebugSettingsSchematic implements DebugSettingsSchema {
  @Bool({
    description: `It isn't known whether turning this option off would end all experimental shenanigans,
    but if there's a feature you want turned on and it isn't listed elsewhere, this is the switch for you!`,
  })
  enabled!: boolean;
}

@Node({
  description: `Adjust when & how often ouronote attempts to reconnect to peers.`,
})
export class DiagnosticsSettingsSchematic implements DiagnosticsSettingsSchema {
  @Num({
    description:
      'The number of time units to wait between each attept at restoring a connection?',
  })
  timeout!: number;
  @Num({
    defaultValue: 30 * 1000,
    min: 1000,
    description:
      'How long to wait after a communication lag before trying to disconnect & reconnect',
  })
  interval!: number;
  @Num({
    defaultValue: 30 * 1000,
    min: 1000,
    unit: 'ms',
    units: 'ms',
    description:
      'After this amount of time, ouronote will forgive the offline peer and attempt communication again',
  })
  reconnectAfter!: number;
  @Num({
    defaultValue: 10,
    min: 10,
    unit: 'minute',
    units: 'minutes',
    description: 'How long to wait until removing the peer from the peers list',
  })
  giveUpAfter!: number;
}

@Node()
export class OuronoteSettingsSchematic implements SettingsSchema {
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

/**
 * Probably only manages settings for the machine
 */
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
  ) {
    console.log('settings service started');

    let n = this.gun;
    const propertiesToArray = (props: Record<string, PropMetadata>) =>
      Object.entries(props).map((k) => ({ name: k[0], ...k[1] }));

    // we know n should conform to the OuronoteSettingsSchematic... we just have to validate that it does
    // TODO! HEY, why aren't we just saying the schematic is a form? Why not use validation?
    const update = (node: GunChain, schematic: any) => {
      const schematicMetadata = makeMetaGetter()(schematic);
      const nodeProperties = propertiesToArray(schematicMetadata.properties);
      const validatedProps = nodeProperties.filter(
        (p) => p.validate && 'function' === typeof p.validate.call
      );
      const validations$ = from(validatedProps).pipe(
        mergeMap(async (validatedProp) => {
          // the node wouldn't be necessary here if the prop had a copy of it
          const r = node.get(validatedProp.key);
          const not$ = r.not().pipe(map(() => undefined));
          const beOrNot = not$.pipe(mergeWith(r.once()));
          const value = await firstValueFrom(beOrNot);
          return [value, validatedProp] as [any, PropertyOptions];
        })
      );

      const invalidProps$ = validations$.pipe(
        filter(([value, prop]) => !prop.validate([value, prop]))
      );
      invalidProps$.subscribe(([value, property]: ValidationTuple) => {
        console.log(
          `got invalid value ${value} ${typeof value}, from ${property.key} ${
            property.type
          }`
        );
      });
    };
    update(this.gun, OuronoteSettingsSchematic);
    update(this.gun.get('log'), LogSettingsSchematic);

    // FIXME add a way to clear these
    this.gun.not().subscribe(() => {
      console.log('settings DB not initialized');
      this.gun.put({
        gun: {
          file: 'ouronote',
          localStorage: false,
          enableRadisk: true,
          enableWebRTC: false,
          peers: [],
          storage: GunStoreEnum.RADISK,
        },
      });
    });
  }

  save() {
    localStorage.setItem('WEBRTC_ENABLE', JSON.stringify(this.enableWebRTC));
    localStorage.setItem('RADISK_ENABLE', JSON.stringify(this.enableRadisk));
  }
}
