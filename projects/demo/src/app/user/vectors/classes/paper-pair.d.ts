import * as paper from 'paper';
import { ItemPair } from './ItemPair';
export type PairedItem<U extends paper.Item = paper.Item> = U & {
  pair?: ItemPair;
};
