import { LexicalComparator } from './LexicalComparator';
type LexicalReadOnly = {
  '+': '*';
} & LexicalComparator;

type CertificatePolicy =
  | {
      '#'?: LexicalComparator;
    }
  | string;
