import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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
    private vectorService: VectorService
  ) {}

  ngOnInit(): void {}

  async createDetached() {
    const userPair = this.ngGun.auth().is;
    const vectorPair = (await this.sea.pair().toPromise()) as any;
    const vectorPairEnc = await SEA.encrypt(vectorPair, userPair);

    console.log('vpEnc', vectorPairEnc);

    const vectorRoot = this.ngGun.get(`~${vectorPair.pub}`);
    console.log('vp', vectorPair.pub);

    const paths = ['layers', 'title', 'owner', 'ownerCert', 'blacklist'].map(
      (path) => {
        return {
          '*': path,
        };
      }
    );
    // TODO owner cert for bannings (required for moderator roles, not useful for taking full ownership)
    const certificants = this.form.value.public ? '*' : userPair;
    const ownerCert = await this.sea
      .certify(certificants, paths, vectorPair)
      .toPromise();

    console.log('cert', ownerCert);

    const vectorData = {
      title: this.form.value.title,
      owner: vectorPairEnc, // Needed for generating certificates later,
      ownerCert,
    } as VectorGraph;

    console.log('would create record', vectorData);
    if (this.form.value.confirm) {
      vectorRoot.once().subscribe((created) => {
        console.log('created record', created);
        this.vectorService.vectors.set(created as never);
      });
      vectorRoot.put(vectorData as never, ownerCert);
    }
  }

  async create() {
    if (!this.form.valid) {
      return;
    }
    const formValue = this.form.value;
    if (formValue.detached) {
      return await this.createDetached();
    }
    if (formValue.confirm) {
      this.vectorService.vectors.set({
        title: this.form.value.title,
      });
    }
  }
}
