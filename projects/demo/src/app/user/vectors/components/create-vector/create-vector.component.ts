import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { NgGunService } from '../../../../../../../ng-gun/src/lib/ng-gun.service';
import { NgSeaService } from '../../../../../../../ng-gun/src/lib/ng-sea.service';
import { SEA } from 'gun';
import { VectorService } from '../../vector.service';
import { VectorGraph } from '../../../VectorGraph';

@Component({
  selector: 'app-create-vector',
  templateUrl: './create-vector.component.html',
  styleUrls: ['./create-vector.component.scss'],
})
export class CreateVectorComponent implements OnInit {
  certificate?: string;
  form = this.fb.group({
    detached: false,
    addToFavorites: false,
    public: false,
    title: ['untitled', Validators.required],
    confirm: false,
  });

  constructor(
    private fb: FormBuilder,
    private ngGun: NgGunService,
    private sea: NgSeaService,
    private vectorService: VectorService,
    @Inject('gun-options')
    private gunOpts: any,
    private ngZone: NgZone
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
    this.vectorService.create(vg);
  }
}
