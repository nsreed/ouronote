import { IGunChainReference } from 'gun/types/chain';
import { IGunCertificate } from '../classes/Certificate';
export declare const gunUpdateTime: (value: any) => number;
export declare const gunChainArray: (value: IGunChainReference) => any[];
export declare const gunCertificateChain: (value: IGunChainReference) => any[];
/**
 * Returns an array of keys representing the path of the given chain
 * @param value the chain to pathify
 */
export declare const gunPath: (value: IGunChainReference) => any[];
export declare function parseCertificate(cert: string): IGunCertificate;
//# sourceMappingURL=gun-utils.d.ts.map