import { Injectable } from '@angular/core';
import * as Gun from 'gun';
import { IGunStaticSEA } from 'gun/types/static/sea';
import { from } from 'rxjs';
import { Certificants, CertificatePolicy } from './classes/Certificate';

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
}
