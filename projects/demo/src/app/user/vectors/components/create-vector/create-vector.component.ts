import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Gun from 'gun';
import { map, pluck, shareReplay, take, filter } from 'rxjs/operators';
import {
  GunOptions,
  NgGunService,
} from '../../../../../../../ng-gun/src/lib/ng-gun.service';
import { NgSeaService } from '../../../../../../../ng-gun/src/lib/ng-sea.service';
import { NameRandomizerService } from '../../../../services/name-randomizer.service';
import { UserService } from '../../../user.service';
import { VectorService } from '../../vector.service';

@Component({
  selector: 'app-create-vector',
  templateUrl: './create-vector.component.html',
  styleUrls: ['./create-vector.component.scss'],
})
export class CreateVectorComponent implements OnInit {
  certificate?: string;
  recordValue?: any;
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
    private fb: FormBuilder,
    private ngGun: NgGunService,
    private sea: NgSeaService,
    private vectorService: VectorService,
    @Inject(GunOptions)
    private gunOpts: any,
    private ngZone: NgZone,
    private dialog: MatDialogRef<any, any>,
    private router: Router,
    private userService: UserService,
    private nameRandomizer: NameRandomizerService
  ) {}

  ngOnInit(): void {
    this.randomizeName();
  }

  async create() {
    if (!this.form.valid) {
      return;
    }
    const formValue = this.form.value;
    const license =
      formValue.license === 'custom'
        ? { ...formValue.customLicense, type: 'custom' }
        : formValue.license;
    const vg = {
      title: formValue.title,
      // license,
    };
    this.vectorPair$.subscribe(async (vectorPair: any) => {
      const vector = await this.vectorService.initializeCertificates(
        vg,
        vectorPair
      );
      this.recordValue = vector;

      // Create a detached gun instance for the vector itself
      const detachedGun = await this.ngGun.detached(vectorPair);
      detachedGun.auth().put(vector);
      this.vectorService.vectors.set(detachedGun.auth().gun as any);

      const vectorInUser = this.vectorService.vectors.get(
        ('~' + vectorPair.pub) as any
      );
      const userPair = this.userService.user.userPair;
      // const titleInUser = vectorInUser.get('title' as never);
      // titleInUser.put(
      //   formValue.title as never,
      //   vector.certs.title[userPair.pub]
      // );
      // // TODO sign & save license

      if (license) {
        // console.log({ license });
        const signedLicense = await Gun.SEA.sign(license, userPair);
        const licenseInUser = vectorInUser.get('license' as never);
        licenseInUser.put(
          signedLicense as never,
          vector.certs.license[userPair.pub]
        );
      }
      const vectorCerts = vectorInUser.get('certs' as never);
      vectorCerts
        .open()
        .pipe(
          filter(
            (lc: any) =>
              lc !== null &&
              lc !== undefined &&
              lc.layers &&
              lc.layers[userPair.pub]
          )
        )
        .subscribe((viu) => {
          vectorCerts.gun.off();
          vectorInUser.gun.off();
          this.dialog.close(vectorPair.pub);
        });
    });
  }

  randomizeName() {
    this.nameRandomizer
      .getRandomName()
      .then((v) => this.form.controls.title.setValue(v));
  }
}
