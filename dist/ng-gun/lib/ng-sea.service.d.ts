import { IGunStaticSEA } from 'gun/types/static/sea';
import { Certificants, CertificatePolicy } from './classes/Certificate';
import * as i0 from "@angular/core";
export interface CertificateOptions {
    epiry?: number;
    blacklist?: string;
}
export declare class NgSeaService {
    SEA: IGunStaticSEA & {
        certify: (certificants: any, policies: any, authority: any, cb?: any, opt?: any) => Promise<any>;
    };
    constructor();
    certify(certificants: Certificants, policies: CertificatePolicy | CertificatePolicy[], authority: any, options?: CertificateOptions): import("rxjs").Observable<any>;
    certifySelf(pair: any): import("rxjs").Observable<any>;
    pair(): import("rxjs").Observable<CryptoKeyPair | undefined>;
    getCertStore(certificant: any, paths: string[], auth: any, isProtected?: boolean, opts?: any): Promise<any>;
    static ɵfac: i0.ɵɵFactoryDef<NgSeaService, never>;
    static ɵprov: i0.ɵɵInjectableDef<NgSeaService>;
}
//# sourceMappingURL=ng-sea.service.d.ts.map