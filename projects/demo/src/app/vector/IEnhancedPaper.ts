import { Observable } from 'rxjs';

export type IEnhancedPaper = paper.Project & {
  selectedItems$: Observable<paper.Item[]>;
  on: (name: string, cb: (data: any) => any) => any;
};
