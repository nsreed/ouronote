import { LayerGraph } from './LayerGraph';
import { ICertChain } from '../../../../ng-gun/src/lib/interfaces/IAuthGraph';

export interface VectorGraph extends ICertChain {
  title: string;
  data?: string;
  project?: any;
  layers?: LayerGraph[];
  styles?: any[];
  palette?: string[];
  backgroundColor?: string;
  [key: string]: any;
}
