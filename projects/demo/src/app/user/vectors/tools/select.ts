import { VectorTool } from '../paper-tool';
import * as paper from 'paper';
export class SelectTool extends VectorTool {
  path!: paper.Path;
  setup() {
    this.down.subscribe((e) => {});
    this.drag.subscribe((e) => {
      if (!this.path) {
        const prev = (this.scope.settings as any).insertItems;
        (this.scope.settings as any).insertItems = false;
        this.path = this.path || new paper.Path([e.downPoint]);
        this.path.data.ignored = true;
        (this.scope.settings as any).insertItems = prev;

        this.project.activeLayer.insertChild(0, this.path);
      }
      this.path.add(e.point);
    });
    this.up.subscribe((e) => {
      this.path.remove();
      this.path = null as never;
    });
  }
}
