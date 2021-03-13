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
  form = this.fb.group({
    public: false,
    title: ['untitled', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private ngGun: NgGunService,
    private sea: NgSeaService,
    private vectorService: VectorService
  ) {}

  ngOnInit(): void {}

  async create() {
    if (!this.form.valid) {
      return;
    }
    const me = this.ngGun.auth().is;

    const vp = (await this.sea.pair().toPromise()) as any;

    const vectorPairEncrypted = await SEA.encrypt(vp, me);
    console.log('vpEnc', vectorPairEncrypted);

    const vectorRoot = this.ngGun.get(`~${vp.pub}`);
    console.log('vp', vp.pub);

    // TODO owner cert for bannings (required for moderator roles, not useful for taking full ownership)
    const ownerCert = await this.sea
      .certify(me, ['layers*', 'title', 'owner', 'ownerCert', 'blacklist*'], vp)
      .toPromise();
    // vectorRoot.get('owner').put(ownerCert as never, ownerCert);
    console.log('cert', ownerCert);

    const vectorData = {
      title: this.form.value.title,
      owner: vectorPairEncrypted, // Needed for generating certificates later,
      ownerCert,
    } as VectorGraph;

    console.log('would create record', vectorData);
    vectorRoot.once().subscribe((created) => {
      console.log('created record', created);
      this.vectorService.vectors.set(created as never);
    });
    vectorRoot.put(vectorData as never, ownerCert);
  }
}
