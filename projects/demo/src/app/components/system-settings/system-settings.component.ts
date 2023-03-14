import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GunChain } from 'projects/ng-gun/src/lib/classes/GunChain';
import 'reflect-metadata';
import { SettingsSchema, SettingsService } from '../../settings.service';
import { AbstractGunControl } from './../../forms-ui/abstract-gun-control';
import { MetaFormBuilder } from './../../forms-ui/meta-form-builder';
import { DebugSettingsSchematic } from '../../settings.service';
import { GunFormBuilder } from '../../forms-ui/gun-form-builder';
function propsFor(con: any) {
  const proto = con.prototype || Object.getPrototypeOf(con);
  return proto.___PROPERTIES;
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
    gun: this.tfb.group<any>({
      enableRadisk: false,
      enableWebRTC: false,
      peers: this.tfb.array<any>([]),
      file: 'radataadvanced',
    }),
    debug: this.tfb.group<any>({ enabled: false }),
    diagnostics: this.tfb.group<any>({
      timeout: 30000,
      interval: 5000,
      reconnectAfter: 120000,
    }),
  });

  settingsGun = this.settingsService.gun as unknown as GunChain<SettingsSchema>;

  // defaultSettings = new Settings();
  logGunForm: AbstractGunControl = new AbstractGunControl(
    this.settingsGun.get('log')
  );

  settingsFormGroup = this.mfb.fromClass(this.settingsService.schema);
  testFormGroup = this.gfb.fromClass(
    this.settingsService.schema,
    this.settingsGun as any
  );

  constructor(
    private fb: UntypedFormBuilder,
    private tfb: FormBuilder,
    private mfb: MetaFormBuilder,
    private gfb: GunFormBuilder,
    private settingsService: SettingsService,
    private router: Router
  ) {
    // console.log(this.testFormGroup);
    // TODO use metadata to build form
    // const ss = new SystemSettings();
    // ss.enableImages = false;
    // console.log('ss enableImages', ss.enableImages);
    // const tif = new Testify();
    // const mdKeys = Reflect.getMetadataKeys(Testify);
    // const mdValues = mdKeys.map(k => (Reflect.getMetadata(k, Testify)));
    // console.log({ mdKeys, mdValues });
    // console.log({ instKeys: Reflect.getMetadata('design:type', tif, 'otherThing') });

    // tfb.group<Partial<Settings>>({
    //   debug: true,
    // });
    // const s = new Settings();

    // const settingsProps = propsFor(Settings);
    // console.log('settings props', settingsProps);

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

  autoCase(camel: string): string {
    return camel;
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
