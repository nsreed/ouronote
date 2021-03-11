import { LayerGraph } from './LayerGraph';

export interface VectorGraph {
  title: string;
  data?: string;
  project?: any;
  graph?: LayerGraph[];
  layers?: LayerGraph[];
  styles?: any[];
  palette?: string[];
  [key: string]: any;
}
