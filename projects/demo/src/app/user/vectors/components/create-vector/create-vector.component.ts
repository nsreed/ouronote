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
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-vector',
  templateUrl: './create-vector.component.html',
  styleUrls: ['./create-vector.component.scss'],
})
export class CreateVectorComponent implements OnInit {
  certificate?: string;
  recordValue?: any;
  form = this.fb.group({
    detached: false,
    addToFavorites: false,
    public: false,
    title: ['untitled', Validators.required],
    confirm: true,
  });

  vectorPair$ = this.sea.pair().pipe(shareReplay(1));
  vectorPub$ = this.vectorPair$.pipe(pluck('pub'));
  // recordValue$ = this.form.valueChanges.pipe(
  //   switchMap(formValue => this.vectorPair$.pipe(

  //   ))
  // )

  constructor(
    private fb: FormBuilder,
    private ngGun: NgGunService,
    private sea: NgSeaService,
    private vectorService: VectorService,
    @Inject(GunOptions)
    private gunOpts: any,
    private ngZone: NgZone,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async create() {
    if (!this.form.valid) {
      return;
    }
    const formValue = this.form.value;
    const vg = {
      title: formValue.title,
    };
    this.vectorPair$.subscribe(async (vectorPair: any) => {
      const vector = await this.vectorService.initializeCertificates(
        vg,
        vectorPair
      );
      this.recordValue = vector;

      if (!formValue.confirm) {
        return;
      }

      // Create a detached gun instance for the vector itself
      const detachedGun = await this.ngGun.detached(vectorPair);
      detachedGun.auth().put(vector);
      this.vectorService.vectors.set(detachedGun.auth().gun as any);
      this.dialog.closeAll();
    });
  }
}
