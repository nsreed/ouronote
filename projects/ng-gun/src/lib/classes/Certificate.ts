import { LexicalComparator } from './LexicalComparator';
export type LexicalReadOnly = {
  '+': '*';
} & LexicalComparator;

export type CertificatePolicy =
  | {
      '#'?: LexicalComparator;
    }
  | LexicalReadOnly
  | LexicalComparator
  | string;

export type Certificants = '*' | string | string[];

export interface IGunCertificate {
  /** Certificants */
  c: string;
  /** Policies */
  w: CertificatePolicy | CertificatePolicy[];
  /** Signature */
  s: string;
}
