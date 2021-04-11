import { LexicalComparator } from './LexicalComparator';
export declare type LexicalReadOnly = {
    '+': '*';
} & LexicalComparator;
export declare type CertificatePolicy = {
    '#'?: LexicalComparator;
} | LexicalReadOnly | LexicalComparator | string;
export declare type Certificants = '*' | string | string[];
export interface IGunCertificate {
    /** Certificants */
    c: string;
    /** Policies */
    w: CertificatePolicy | CertificatePolicy[];
    /** Signature */
    s: string;
}
//# sourceMappingURL=Certificate.d.ts.map