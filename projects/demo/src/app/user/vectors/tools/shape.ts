import { VectorTool } from '../paper-tool';
import * as paper from 'paper';
export class ShapeTool extends VectorTool {
  name = 'shapes';
  shape?: paper.Shape;

  dragSub = this.drag.subscribe((e) => {
    const prev = (this.scope.settings as any).insertItems;
    (this.scope.settings as any).insertItems = false;
    this.shape?.remove();
    this.shape = new paper.Shape.Rectangle(e.downPoint, e.point);
    this.shape.data.ignore = true;
    this.shape.style = this.project.currentStyle;
    (this.scope.settings as any).insertItems = prev;
    this.project.activeLayer.insertChild(0, this.shape);
  });

  upSub = this.up.subscribe((e) => {
    // this.shape = null;
    if (this.shape) {
      this.shape.data.ignore = undefined;
      this.project.activeLayer.insertChild(0, this.shape);
      (this.shape as any).pair.doSave(); // this is to get around weirdness in 'smart' saves when starting with an ignored item
      delete this.shape;
    }
  });
}
