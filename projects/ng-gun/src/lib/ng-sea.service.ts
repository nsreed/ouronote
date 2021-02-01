import { Injectable } from '@angular/core';
import * as Gun from 'gun';
import { IGunStaticSEA } from 'gun/types/static/sea';
import { from } from 'rxjs';

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

  certify(certificants: any, policies: any, authority: any) {
    return from(this.SEA.certify(certificants, policies, authority));
  }
}
