import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Gun from 'gun';
import {
  map,
  pluck,
  shareReplay,
  take,
  filter,
  tap,
  first,
} from 'rxjs/operators';
import { GunOptions, NgGunService } from 'ng-gun';
import { NgSeaService } from 'ng-gun';
import { NameRandomizerService } from '../../../../services/name-randomizer.service';
import { UserService } from '../../../user.service';
import { VectorService } from '../../vector.service';
import { LogService } from 'log';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { IGunCryptoKeyPair } from 'gun/types/types';

@Component({
  selector: 'app-create-vector',
  templateUrl: './create-vector.component.html',
  styleUrls: ['./create-vector.component.scss'],
})
export class CreateVectorComponent implements OnInit {
  certificate?: string;
  recordValue?: any;
  sumbitted = false;
  error = false;
  form = this.fb.group({
    title: [null, Validators.required],
    license: null,
    customLicense: this.fb.group({
      name: null,
      text: `Copyright © ${new Date().getFullYear()} ${
        this.userService.user.alias
      } ALL RIGHTS RESERVED`,
    }),
  });

  vectorPair$ = this.sea.pair().pipe(shareReplay(1));
  vectorPub$ = this.vectorPair$.pipe(pluck('pub'));

  license$ = this.form.controls.license.valueChanges.pipe(
    map((l) =>
      typeof l === 'object' && l.text
        ? {
            ...l,
            text: l.text
              .replace('{{ licensor }}', this.userService.user.alias)
              .replace('{{ year }}', new Date().getFullYear()),
          }
        : l
    ),
    shareReplay(1)
  );

  constructor(
    private fb: UntypedFormBuilder,
    private ngGun: NgGunService,
    private sea: NgSeaService,
    private vectorService: VectorService,
    @Inject(GunOptions)
    private gunOpts: any,
    private ngZone: NgZone,
    private dialog: MatDialogRef<any, any>,
    private router: Router,
    private userService: UserService,
    private nameRandomizer: NameRandomizerService,
    private logger: LogService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.randomizeName();
  }

  async create() {
    this.logger.log('create()');
    if (!this.form.valid) {
      return;
    }
    this.sumbitted = true;

    const formValue = this.form.value;
    const license =
      formValue.license === 'custom'
        ? { ...formValue.customLicense, type: 'custom' }
        : formValue.license;
    const vg = {
      title: formValue.title,
      // license,
    };
    const vectorPair = (await firstValueFrom(
      this.sea.pair()
    )) as unknown as IGunCryptoKeyPair;

    const vector = await this.vectorService.initializeCertificates(
      vg,
      vectorPair
    );

    this.recordValue = vector;
    this.logger.log('vector object', vector);

    this.logger.log('awaiting vectorRoot...');
    // Create a detached gun instance for the vector itself
    const vectorRoot = await this.ngGun.detached(vectorPair);
    const vectorAuth = vectorRoot.auth();
    if (!vectorAuth.is?.priv) {
      this.logger.error(`detached gun isn't authenticated!`);
    }

    vectorAuth.put(vector);

    const vectorInUser = this.vectorService.vectors.get(
      ('~' + vectorPair.pub) as any
    );
    vectorInUser
      .on()
      .subscribe((value: any) =>
        this.logger.log('got vector in vectors list', value)
      );

    this.vectorService.vectors.set(vectorAuth.gun as any);

    let userPair = this.userService.pair;

    if (!userPair.priv) {
      userPair = this.userService.user.gun._.sea;
      this.error = true;
      this.sumbitted = false;
      // return;
      if (!userPair?.priv) {
        this.logger.error('user pair did not contain a private key!', userPair);
        return;
      }
    }

    if (license) {
      this.logger.log('signing license', license);
      const signedLicense = await Gun.SEA.sign(license, userPair);
      const licenseInUser = vectorInUser.get('license' as never);
      licenseInUser.put(
        signedLicense as never,
        vector.certs.license[userPair.pub]
      );
    }

    this.logger.log(`awaiting certs for ${userPair.pub}`);
    const vectorCerts = vectorAuth.get('certs' as never);
    const userLayerCertNode = vectorCerts.get('layers').get(userPair.pub);
    const userLayerCert$ = userLayerCertNode
      .on()
      .pipe(filter((ciu) => ciu !== undefined && ciu !== null));
    const userLayerCert = await firstValueFrom(userLayerCert$);
    vectorCerts.gun.off();
    vectorInUser.gun.off();
    userLayerCertNode.gun.off();
    if (!userLayerCert) {
      this.logger.error('USER LAYER CERT WAS FALSY');
    }
    this.dialog.close(vectorPair.pub);
    // vectorCerts
    //   .open()
    //   .pipe(
    //     filter(
    //       (lc: any) =>
    //         lc !== null &&
    //         lc !== undefined &&
    //         lc.layers &&
    //         lc.layers[userPair.pub]
    //     )
    //   )
    //   .subscribe((viu) => {
    //     vectorCerts.gun.off();
    //     vectorInUser.gun.off();
    //     this.dialog.close(vectorPair.pub);
    //   });
  }

  randomizeName() {
    this.nameRandomizer
      .getRandomName()
      .then((v) => this.form.controls.title.setValue(v));
  }
}
