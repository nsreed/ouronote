import { VectorTool } from './paper-tool';
import { map } from 'rxjs/operators';
export class SelectionTool extends VectorTool {
  enabled$ = this.selectedItems$.pipe(map((i) => i.length > 0));
}
