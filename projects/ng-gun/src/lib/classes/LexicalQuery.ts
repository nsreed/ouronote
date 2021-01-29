import { LexicalComparator } from './LexicalComparator';
import { LexicalInverse } from './LexicalInverse';

export interface LexicalQuery {
  '.': LexicalComparator & LexicalInverse;
  '%'?: number;
}
