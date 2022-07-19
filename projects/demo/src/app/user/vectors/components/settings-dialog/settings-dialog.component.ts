import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as Gun from 'gun';
import { License } from 'projects/demo/src/app/License';
import { filter, map, shareReplay } from 'rxjs/operators';
import { GunChain } from '../../../../../../../ng-gun/src/lib/classes/GunChain';
import { LICENSES } from '../../../../LICENSES';
import { UserService } from '../../../user.service';
import { VectorGraph } from '../../../VectorGraph';
import { VectorService } from '../../vector.service';

export interface VectorSettingsData {
  mode: 'general' | 'people' | 'license';
  vectorPub: string;
}

@Component({
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent implements OnInit {
  form = this.fb.group({
    title: [null, Validators.required],
    license: null,
    customLicense: this.fb.group({
      name: null,
      text: `Copyright © ${new Date().getFullYear()} ${
        this.userService.user.alias
      } ALL RIGHTS RESERVED`,
      type: 'custom',
      url: null,
    }),
  });

  vectors = this.vectorService.vectors;
  vector: GunChain<VectorGraph> = this.vectors.get(
    this.data.vectorPub as never
  ) as any;

  vector$ = this.vector.on();
  requests$ = this.vector
    .get('inviteRequests')
    .open()
    .pipe(
      // TODO make sure this open() call isn't making the program die
      map((requests: any) => Object.keys(requests).filter((k) => requests[k])),
      shareReplay(1)
    );
  requestCount$ = this.requests$.pipe(map((r) => r.length));

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: VectorSettingsData,
    private vectorService: VectorService,
    private userService: UserService,
    public dialogRef: MatDialogRef<any>,
    private fb: UntypedFormBuilder
  ) {
    // this.vector.open().subscribe((v) => {
    //   console.log(v);
    // });
    this.vector
      .get('license')
      .once()
      // .pipe(filter((l) => l !== null))
      .subscribe((graphLicense: any) => {
        // Determine signer
        console.log('signed graph license', graphLicense);
        if (!graphLicense) {
          return;
        }
        this.vector
          .get('owner')
          .once()
          .subscribe(async (owner: any) => {
            // console.log('owner', owner);
            const ownerPub = Object.keys(owner)[0];
            const license = (await Gun.SEA.verify(graphLicense, {
              pub: ownerPub,
            } as any)) as License;

            if (!license) {
              console.warn('could not verify license');
              return;
            }
            // console.log({ license });

            if (license.type === 'custom') {
              this.form.controls.license.setValue('custom');
              this.form.controls.customLicense.setValue({
                url: null,
                type: 'custom',
                ...(license as any),
              });
            } else {
              const matchedLicensePreset =
                Object.values(LICENSES).find(
                  (presetLicense: any) => presetLicense.type === license.type
                ) || 'custom';
              this.form.controls.license.setValue(matchedLicensePreset);
            }
          });
      });
  }

  ngOnInit(): void {}

  async onDoneClick() {
    if (this.form.dirty) {
      const licenseNode = this.vector.get('license') as GunChain<License>;
      const formValue = this.form.value;
      const license =
        formValue.license === 'custom'
          ? { ...formValue.customLicense, type: 'custom' }
          : formValue.license;
      license.url = license.url || null;
      license.type = license.type || null;
      license.text = license.text || null;
      license.name = license.name || null;

      if (!this.userService.user.userPair) {
        console.error('No user pair!');
        return;
      }

      const signedLicense = await Gun.SEA.sign(
        license,
        this.userService.user.userPair
      );

      // TODO Sign license
      console.log('putting signedLicense: ', signedLicense);
      licenseNode.put(signedLicense as any);
      licenseNode.on().subscribe((n: any) => {
        if (n !== signedLicense) {
          console.error('got different license than set', n, signedLicense);
          return;
        }
        this.dialogRef.close();
      });
      return;
    }

    this.dialogRef.close();
  }
}
