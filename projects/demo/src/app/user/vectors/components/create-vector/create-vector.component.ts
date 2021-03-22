import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { NgGunService } from '../../../../../../../ng-gun/src/lib/ng-gun.service';
import { NgSeaService } from '../../../../../../../ng-gun/src/lib/ng-sea.service';
import { SEA } from 'gun';
import { VectorService } from '../../vector.service';
import { VectorGraph } from '../../../VectorGraph';
import { pluck, shareReplay, switchMapTo, switchMap } from 'rxjs/operators';

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
    confirm: false,
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
    this.vectorPair$.subscribe(async (vectorPair) => {
      const vector = await this.vectorService.create(vg, vectorPair);
      this.recordValue = vector;
      console.log({ vector });

      if (!formValue.confirm) {
        return;
      }

      // TODO gunOpts appears to drag in values set by previous gun instance???
      const detachedGun = new NgGunService(
        {
          localStorage: false,
          peers: ['http://localhost:8765/gun'],
        },
        this.ngZone
      );
      (detachedGun.gun.user() as any).auth(vectorPair, async () => {
        const v = detachedGun.gun.user();
        v.put(vector);
        this.vectorService.vectors.set(v as never);
      });
    });
  }
}