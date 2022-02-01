import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit, NgZone } from '@angular/core';
import {
  NgGunService,
  GunOptions,
} from '../../../../../../../ng-gun/src/lib/ng-gun.service';
import { NgSeaService } from '../../../../../../../ng-gun/src/lib/ng-sea.service';
import { SEA } from 'gun';
import { VectorService } from '../../vector.service';
import { VectorGraph } from '../../../VectorGraph';
import {
  pluck,
  shareReplay,
  switchMapTo,
  switchMap,
  delay,
} from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LICENSES } from '../../../../LICENSES';
import { map } from 'rxjs/operators';
import { UserService } from '../../../user.service';
import { NameRandomizerService } from '../../../../services/name-randomizer.service';

@Component({
  selector: 'app-create-vector',
  templateUrl: './create-vector.component.html',
  styleUrls: ['./create-vector.component.scss'],
})
export class CreateVectorComponent implements OnInit {
  certificate?: string;
  recordValue?: any;
  form = this.fb.group({
    title: [this.nameRandomizer.getRandomName(), Validators.required],
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

  ngOnInit(): void {}

  async create() {
    if (!this.form.valid) {
      return;
    }
    const formValue = this.form.value;
    const license =
      formValue.license === 'custom'
        ? formValue.customLicense
        : formValue.license;
    const vg = {
      title: formValue.title,
      license,
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
      this.dialog.close(detachedGun.auth().is.pub);
    });
  }
}
