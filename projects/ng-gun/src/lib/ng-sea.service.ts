import { Injectable } from '@angular/core';
import * as Gun from 'gun';
import { IGunStaticSEA } from 'gun/types/static/sea';
import { from } from 'rxjs';
import { Certificants, CertificatePolicy } from './classes/Certificate';
import { mergeAll, mergeMap } from 'rxjs/operators';

export interface CertificateOptions {
  epiry?: number;
  blacklist?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NgSeaService {
  SEA: IGunStaticSEA & {
    certify: (
      certificants: any,
      policies: any,
      authority: any,
      cb?: any,
      opt?: any
    ) => Promise<any>;
  } = Gun.SEA as any;
  constructor() {}

  certify(
    certificants: Certificants,
    policies: CertificatePolicy | CertificatePolicy[],
    authority: any,
    options?: CertificateOptions
  ) {
    return from(
      this.SEA.certify(certificants, policies, authority, null, options)
    );
  }

  certifySelf(pair: any) {
    return from(this.SEA.certify(pair, '*', pair));
  }

  pair() {
    return from(this.SEA.pair(() => {}));
  }

  async getCertStore(
    certificant: any,
    paths: string[],
    auth: any,
    isProtected = false,
    opts = null
  ) {
    console.log('certifying', certificant);
    if (Array.isArray(certificant)) {
      const certificantsPromises: any = certificant.map(
        async (c) => await this.getCertStore(c, paths, auth, isProtected, opts)
      );
      const certificants: any[] = await Promise.all(certificantsPromises);
      console.log('certificants', certificants);
      return certificants;
    }
    if (typeof certificant !== 'string') {
      if (typeof certificant !== 'object') {
        throw new Error('cannot certify provided certificant');
      } else if (!certificant.pub) {
        throw new Error('cannot certify provided certificant');
      }
    }
    const store = {} as any;
    const certPromises = paths.map(async (path: string) => {
      const policy = { '*': path } as any;
      if (isProtected) {
        policy['+'] = '*';
      }
      const cert = await this.certify(certificant, policy, auth).toPromise();
      store[path] = {} as any;
      store[path][certificant.pub || certificant] = cert;
    });
    await Promise.all(certPromises);
    // console.log('certified', store);
    return store;
  }
}
