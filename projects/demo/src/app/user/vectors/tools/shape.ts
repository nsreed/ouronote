import { VectorTool } from './paper-tool';
import * as paper from 'paper';
import { Style } from 'paper';
import { Property } from '../functions/decorators';
export class ShapeTool extends VectorTool {
  name = 'shapes';
  icon = 'shapes';
  shape?: paper.Shape;

  @Property()
  style = new Style({
    strokeCap: 'round',
    strokeJoin: 'round',
    strokeWidth: 3,
  } as paper.Style);

  @Property({
    label: 'Scale',
  })
  scale = false;

  propertyNames: string[] = ['style', 'scale'];

  downSub = this.down.subscribe(() => this.activateDrawLayer());

  dragSub = this.drag.subscribe((e) => {
    const prev = (this.scope.settings as any).insertItems;
    (this.scope.settings as any).insertItems = false;
    this.shape?.remove();
    this.shape = new paper.Shape.Rectangle(e.downPoint, e.point);
    this.shape.data.ignore = true;
    this.shape.style = this.style;
    this.shape.style = this.project.currentStyle;
    const width = this.scale
      ? (1 / this.project.view.zoom) * this.style.strokeWidth
      : this.style.strokeWidth;
    this.shape.strokeWidth = width;
    (this.scope.settings as any).insertItems = prev;
    this.project.activeLayer.insertChild(
      this.project.activeLayer.children.length,
      this.shape
    );
  });

  upSub = this.up.subscribe((e) => {
    if (this.shape) {
      this.shape.data.ignore = undefined;
      this.project.activeLayer.insertChild(
        this.project.activeLayer.children.length,
        this.shape
      );
      (this.shape as any).pair?.doSave(); // this is to get around weirdness in 'smart' saves when starting with an ignored item
      delete this.shape;
    }
  });
}
