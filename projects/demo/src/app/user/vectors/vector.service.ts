import { Inject, Injectable, NgZone } from '@angular/core';
import { UserService } from '../user.service';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';
import { SEA } from 'gun';
import { NgSeaService } from '../../../../../ng-gun/src/lib/ng-sea.service';
import { VectorGraph } from '../VectorGraph';
import { from } from 'rxjs';
import { mergeAll, takeLast, map, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VectorService {
  vectors = this.userService.user.get('vectors');

  constructor(
    private userService: UserService,
    private ngGun: NgGunService,
    @Inject('gun-options')
    private gunOpts: any,
    private ngZone: NgZone,
    private sea: NgSeaService
  ) {}

  async create(value: VectorGraph, isPublic = false) {
    // TODO gunOpts appears to drag in values set by previous gun instance???
    const detachedGun = new NgGunService(
      {
        localStorage: false,
        peers: ['http://localhost:8765/gun'],
      },
      this.ngZone
    );
    const userPair = this.ngGun.auth().is;
    const vectorPair = (await this.sea.pair().toPromise()) as any;
    (detachedGun.gun.user() as any).auth(vectorPair, async () => {
      const v = detachedGun.gun.user();
      console.log(v);
      const vectorPairEnc = await SEA.encrypt(vectorPair, userPair);
      const paths = ['layers', 'title'];
      const certificants = isPublic ? '*' : userPair;

      const vjson = {
        ...value,
        owner: {} as any,
        certs: {} as any,
      } as any;
      vjson.owner[userPair.pub] = vectorPairEnc;

      const certPromises = paths.map(async (path) => {
        const policy = { '*': path };
        const cert = await this.sea
          .certify(certificants, policy, vectorPair)
          .toPromise();
        vjson.certs[path] = {} as any;
        vjson.certs[path][userPair.pub] = cert;
      });
      from(certPromises)
        .pipe(mergeAll(), takeLast(1))
        .subscribe(() => {
          v.put(vjson);
          this.vectors.set(v as never);
        });
    });
  }
}
