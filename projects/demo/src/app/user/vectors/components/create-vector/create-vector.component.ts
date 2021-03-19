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

  detachedGun = new NgGunService(this.gunOpts, this.ngZone);

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

  async createDetached() {
    const userPair = this.ngGun.auth().is;
    const vectorPair = (await this.sea.pair().toPromise()) as any;
    (this.detachedGun.gun.user() as any).auth(vectorPair, async () => {
      const v = this.detachedGun.gun.user();
      console.log('secondary gun logged in');
      console.log('user: %s', userPair.pub);
      console.log(v);
      console.log('vector: %s', (v as any).is?.pub);
      const vectorPairEnc = await SEA.encrypt(vectorPair, userPair);
      const paths = ['layers', 'title'];
      const pathPolicies = paths.map((path) => ({ '*': path }));

      const certificants = this.form.value.public ? '*' : userPair;
      // TODO when cert is public store it directly on cert.path *not* cert.path.userPub
      // TODO .get(certs).once(c => typeof c === 'string' ? PUBLIC_CERT : .get(userPub)...)
      if (this.form.value.confirm) {
        console.log('  .owner.%s = %s', userPair.pub, vectorPairEnc);
        v.get('owner')
          .get(userPair.pub)
          .put(vectorPairEnc as never);
        v.get('title').put(this.form.value.title as never);
        paths.forEach(async (path) => {
          console.log('  .certs.%s', path);
          const policy = { '*': path };
          const cert = await this.sea
            .certify(certificants, policy, vectorPair)
            .toPromise();
          console.log('  .certs.%s.%s = %s', path, userPair.pub, cert);
          v.get('certs')
            .get(path)
            .get(userPair.pub)
            .put(cert as never);
          this.vectorService.vectors.set(v as never);
        });
      }
    });

    // console.log('vpEnc', vectorPairEnc);

    // const vectorRoot = this.ngGun.get(`~${vectorPair.pub}`);
    // // console.log('vp', vectorPair.pub);
    // // vectorRoot
    // //   .get('owner')
    // //   .get(userPair.pub)
    // //   .put(vectorPairEnc as never);

    // const paths = ['layers', 'title', 'owner', 'ownerCert', 'blacklist'].map(
    //   (path) => {
    //     return {
    //       '*': path,
    //     };
    //   }
    // );
    // // TODO owner cert for bannings (required for moderator roles, not useful for taking full ownership)
    // const certificants = this.form.value.public ? '*' : userPair;
    // const ownerCert = await this.sea
    //   .certify(certificants, paths, vectorPair)
    //   .toPromise();

    // console.log('cert', ownerCert);

    // const vectorData = {
    //   title: this.form.value.title,
    //   owner: vectorPairEnc, // Needed for generating certificates later,
    //   ownerCert,
    // } as VectorGraph;

    // console.log('would create record', vectorData);
    // if (this.form.value.confirm) {
    //   vectorRoot.once().subscribe((created) => {
    //     console.log('created record', created);
    //     this.vectorService.vectors.set(created as never);
    //   });
    //   vectorRoot.put(vectorData as never, ownerCert);
    // }
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
