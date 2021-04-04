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

  async certify(certificant: any, paths: string[], auth: any) {
    // console.log('certifying', certificant);
    if (typeof certificant !== 'object') {
      throw new Error('cannot certify provided certificant');
    } else if (!certificant.pub) {
      throw new Error('cannot certify provided certificant');
    }
    const store = {} as any;
    const certPromises = paths.map(async (path: string) => {
      const policy = { '*': path };
      const cert = await this.sea
        .certify(certificant, policy, auth)
        .toPromise();
      store[path] = {} as any;
      store[path][certificant.pub] = cert;
    });
    await Promise.all(certPromises);
    // console.log('certified', store);
    return store;
  }

  async create(value: VectorGraph, vectorPair: any) {
    // TODO refactor this into a factory/repository
    const userPair = this.ngGun.auth().is;
    // const vectorPair = (await this.sea.pair().toPromise()) as any;
    const certs = await this.certify(userPair, ['layers', 'title'], vectorPair);
    const vector = {
      ...value,
      owner: {} as any,
      certs,
    } as any;
    const vectorPairEnc = await SEA.encrypt(vectorPair, userPair);
    vector.owner[userPair.pub] = vectorPairEnc;
    return vector;
  }
}
