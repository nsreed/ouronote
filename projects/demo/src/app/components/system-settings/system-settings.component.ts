import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, FormBuilder } from '@angular/forms';
import {
  SettingsService,
  SettingsSchema,
  GunSettingsSchema,
} from '../../settings.service';
import { Router } from '@angular/router';
import { GunChain } from 'projects/ng-gun/src/lib/classes/GunChain';
import { timer } from 'rxjs';
import 'reflect-metadata';

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

  save() {
    this.settingsService.enableRadisk = this.settingsForm.value.enableRadisk;
    this.settingsService.enableWebRTC = this.settingsForm.value.enableWebRTC;
    this.settingsService.save();
    this.router
      .navigateByUrl('/')
      .then((s) => (window.location = window.location));
  }
}
