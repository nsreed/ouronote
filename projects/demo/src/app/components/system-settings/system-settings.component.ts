import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, FormBuilder } from '@angular/forms';
import { SettingsService, SettingsSchema, GunSettingsSchema } from '../../settings.service';
import { Router } from '@angular/router';
import { GunChain } from 'projects/ng-gun/src/lib/classes/GunChain';
import { timer } from 'rxjs';
import 'reflect-metadata';

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

function GraphProperty(config?: any) {
  config = config || {};
  return function (value: any, context: any) {
    // console.log({ value, context });
    return function (proto: any, name: string, ...args: any[]) {
      config = { name, ...config };
      // console.log({ config, context, name, args });
      proto.___PROPERTIES = proto.___PROPERTIES || ({} as any);
      proto.___PROPERTIES[name] = config;
      return proto[name];
    } as any;
  }
}

function GraphNode(config?: any) {
  config = config || {};
  return function (classRef: any) {
    // console.log('GraphNode', classRef);
    const proto = Object.getPrototypeOf(classRef);
    // console.log('  proto', classRef.prototype.___PROPERTIES);
  }
}

type Configured<T extends PropertyDecorator | ParameterDecorator | ClassDecorator, C extends any | undefined = any> = (config?: C) => T;
const prop: PropertyDecorator = (target, propertyKey) => console.log({ target, propertyKey });
const param: ParameterDecorator = (target, propertyKey, parameterIndex) => console.log({ target, propertyKey, parameterIndex });
const soul: ClassDecorator = (target) => console.log({ target });
const Soul: Configured<ClassDecorator> = (config) => (target) => {
  console.log('class', { config, target })
  return target;
};
const Key: Configured<PropertyDecorator> = (config) => (target, propertyKey) => {
  Reflect.defineProperty(target, propertyKey, {
    set(v) {
      console.log(`setting ${target.constructor.name}.${String(propertyKey)} to ${v}`);
      this[`__${String(propertyKey)}`] = v
    },
    get() {
      console.log(`getting ${String(propertyKey)} from ${target.constructor.name}`);
      return this[`__${String(propertyKey)}`]
    },
    enumerable: true
  });
  const property = Reflect.getOwnPropertyDescriptor(target, propertyKey);
  console.log('property', { config, target, propertyKey, property });
  return target;
};
const Param: Configured<ParameterDecorator> = (config) => (target, propertyKey, parameterIndex) => {
  console.log('param', { config, target, propertyKey, parameterIndex });

  return target;
}

@Soul()
class GunSettings {
  @Key()
  file = 'radata';
  @Key()
  peers = [];
  @Key()
  enableWebRTC = false;
  @Key()
  enableLocalStorage = false;
  time = Date.now();
}

@Soul()
class CapabilitySettings {
  @Key()
  touch = false;
  @Key()
  pen = false;
}

@Soul()
class LogSettings {
  @Key()
  level = 3;
}

@Soul()
class SystemSettings {
  @Key()
  enableImages = true;
}

@Soul()
class Settings implements SettingsGraph {
  @Key({ ref: GunSettings })
  gun = new GunSettings();
  @Key({
    type: 'boolean',
  })
  debug = false;
  @Key({
    ref: CapabilitySettings,
  })
  capabilities = new CapabilitySettings();
  @Key({
    ref: LogSettings,
  })
  log = new LogSettings();
  @Key({ ref: SystemSettings })
  system = new SystemSettings();
}

@Soul()
class Testify {
  @Reflect.metadata('design:type', String)
  public otherThing?: string;
  constructor(@Param() public thingINeed?: GunSettings) { }
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

  currentSettingsGroup = this.tfb.group({
    gun: this.tfb.group<any>({ enableRadisk: false, enableWebRTC: false, peers: this.tfb.array<any>([]), file: 'radataadvanced' }),
    debug: this.tfb.group<any>({ enabled: false }),
    diagnostics: this.tfb.group<any>({ timeout: 30000, interval: 5000, reconnectAfter: 120000 })
  });

  settingsGun = this.settingsService.gun as GunChain<SettingsSchema>;

  // defaultSettings = new Settings();

  constructor(
    private fb: UntypedFormBuilder,
    private tfb: FormBuilder,
    private settingsService: SettingsService,
    private router: Router
  ) {

    // TODO use metadata to build form
    // const ss = new SystemSettings();
    // ss.enableImages = false;
    // console.log('ss enableImages', ss.enableImages);
    // const tif = new Testify();
    // const mdKeys = Reflect.getMetadataKeys(Testify);
    // const mdValues = mdKeys.map(k => (Reflect.getMetadata(k, Testify)));
    // console.log({ mdKeys, mdValues });
    // console.log({ instKeys: Reflect.getMetadata('design:type', tif, 'otherThing') });

    tfb.group<Partial<Settings>>({
      debug: true,
    });
    // const s = new Settings();

    const settingsProps = propsFor(Settings);
    console.log('settings props', settingsProps);

    this.settingsForm.patchValue({
      enableWebRTC: settingsService.enableWebRTC,
      enableRadisk: settingsService.enableRadisk,
    });

    // const machine = this.settingsGun.get('machine');
    // const gun = machine.get('gun');
    // gun.get('file').put('settings');
    // gun.get('time').put(Date.now());

    // this.settingsGun.get('machine').put({
    //   debug: true,
    // } as never);
  }

  ngOnInit(): void {
    this.settingsGun.get('gun');
  }

  save() {
    this.settingsService.enableRadisk = this.settingsForm.value.enableRadisk;
    this.settingsService.enableWebRTC = this.settingsForm.value.enableWebRTC;
    this.settingsService.save();
    this.router
      .navigateByUrl('/')
      .then((s) => (window.location = window.location));
  }
}
