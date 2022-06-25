import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VectorGraph } from '../../../VectorGraph';
import { VectorService } from '../../vector.service';
import { UserService } from '../../../user.service';
import { shareReplay, map, switchMap, filter } from 'rxjs/operators';
import { GunChain } from '../../../../../../../ng-gun/src/lib/classes/GunChain';
import { Validators, FormBuilder } from '@angular/forms';
import { LICENSES } from '../../../../LICENSES';
import { License } from 'projects/demo/src/app/License';

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
    private fb: FormBuilder
  ) {
    // this.vector.open().subscribe((v) => {
    //   console.log(v);
    // });
    this.vector
      .get('license')
      .open()
      .pipe(filter((l) => l !== null))
      .subscribe((graphLicense: any) => {
        const license =
          Object.values(LICENSES).find(
            (presetLicense: any) =>
              presetLicense.type === graphLicense.type && !graphLicense.text
          ) || 'custom'; // FIXME this won't load custom license text into the form
        this.form.controls.license.setValue(license);
      });
  }

  ngOnInit(): void {}

  onDoneClick() {
    if (this.form.dirty) {
      const formValue = this.form.value;
      const license =
        formValue.license === 'custom'
          ? formValue.customLicense
          : formValue.license;
      license.url = license.url || null;
      license.type = license.type || null;
      license.text = license.text || null;
      license.name = license.name || null;
      const licenseNode = this.vector.get('license') as GunChain<License>;
      licenseNode.put(license);

      licenseNode.get('url').put(license.url);
      licenseNode.get('type').put(license.type);
      licenseNode.get('name').put(license.name);
    }
    this.dialogRef.close();
  }
}
