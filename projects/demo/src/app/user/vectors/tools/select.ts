import { VectorTool } from '../paper-tool';
import * as paper from 'paper';
export class SelectTool extends VectorTool {
  path!: paper.Path;
  name = 'lasso select';
  setup() {
    this.down.subscribe((e) => {});
    this.drag.subscribe((e) => {
      if (!this.path) {
        const prev = (this.scope.settings as any).insertItems;
        (this.scope.settings as any).insertItems = false;
        this.path = this.path || new paper.Path([e.downPoint]);
        this.path.data.ignored = true;
        this.path.dashArray = [12, 12];
        this.path.closed = true;
        this.path.fillColor = new paper.Color(0, 0, 1, 0.5) as any;
        (this.scope.settings as any).insertItems = prev;
        this.project.activeLayer.insertChild(0, this.path);
      }
      this.path.add(e.point);
    });
    this.up.subscribe((e) => {
      if (this.path) {
        const intersected = this.scope.project.getItems({
          match: (item: paper.Item) =>
            item.className !== 'Layer' && this.path?.intersects(item),
        });
        this.scope.project.deselectAll();
        intersected.forEach((i) => (i.selected = true));

        this.path.remove();
        this.path = null as never;
      } else {
        this.scope.project.deselectAll();
      }
    });
  }
}
