import { ItemGraph } from './ItemGraph';

export interface LayerGraph extends ItemGraph {
  applyMatrix?: boolean;
  className: 'Layer';
}
