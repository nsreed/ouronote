import { LayerGraph } from './LayerGraph';
import { ICertChain } from 'ng-gun';
import { User } from './model';
import { License } from '../License';

export interface VectorGraph extends ICertChain {
  title: string;
  data?: string;
  project?: any;
  layers?: LayerGraph[];
  styles?: any[];
  palette?: string[];
  backgroundColor?: string;
  inviteRequests?: User[];
  license?: License;
  [key: string]: any;
}
