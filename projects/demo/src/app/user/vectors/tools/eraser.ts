import { VectorTool } from './paper-tool';
import { Path, Point, Style, ToolEvent, Project } from 'paper';
import * as paper from 'paper';
export class EraserTool extends VectorTool {
  path?: paper.Path | null;
  name = 'eraser';

  dragSub = this.drag.subscribe((e: paper.ToolEvent) => {
    // console.log('eraser drag');
    const prev = (this.scope.settings as any).insertItems;
    (this.scope.settings as any).insertItems = false;
    if (!this.path) {
      this.path = new paper.Path([e.downPoint]);
      this.path.data.ignore = true;
    }
    this.path.add(e.point);
    const intersects = this.project.getItems({
      match: (i: paper.Item) =>
        i !== this.path &&
        i.className !== 'Layer' &&
        !i.data.ignore &&
        i.intersects(this.path as any),
    });
    // TODO skip removing items that were added since the beginning of this drag
    intersects.forEach((i) => i.remove());
    (this.scope.settings as any).insertItems = prev;
  });

  upSub = this.up.subscribe((e) => (this.path = null));
}
