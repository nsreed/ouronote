import { VectorTool, IEnhancedScope } from './paper-tool';
import { map, shareReplay } from 'rxjs/operators';
import { IEnhancedPaper } from '../../../vector/paper.directive';
export class SelectionTool extends VectorTool {
  constructor(scope: IEnhancedScope) {
    super(scope);

    this.enabled$.subscribe((v) => {
      if (!v && this.isActive) {
        console.log('should not be enabled');
        if (this.scope.lastActiveTool.enabled) {
          this.scope.lastActiveTool.activate();
        } else {
          const en = this.scope.tools.find((t: VectorTool) => t.enabled);
          en?.activate();
        }
      }
    });
  }
  get enabled() {
    return this.project.selectedItems.length > 0;
  }
  enabled$ = this.selectedItems$.pipe(map((i) => this.enabled));
}
