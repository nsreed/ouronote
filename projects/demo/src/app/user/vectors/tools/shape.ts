import * as paper from 'paper';
import { Enum, Node } from '../../../common/metadata';
import { Property } from '../functions/decorators';
import { DrawTool } from './draw-tool';
import { ToolSchematic } from './paper-tool';

// export enum ShapeType {
//   LINE,
//   CIRCLE,
//   RECTANGLE,
//   ELLIPSE,
//   ARC,
//   REGULAR_POLYGON,
//   STAR,
// }

export type ShapeToolSchema = {
  shapeType: TShape;
};

export type TShape =
  | 'star'
  | 'line'
  | 'circle'
  | 'rectangle'
  | 'ellipse'
  | 'arc'
  | 'regular_polygon'
  | string;

const shameNames = [
  'star',
  'line',
  'circle',
  'rectangle',
  'ellipse',
  'arc',
  'regular_polygon',
];

@Node()
export class ShapeToolSchematic
  extends ToolSchematic
  implements ShapeToolSchema
{
  @Enum({
    description: 'Shape Type',
    defaultValue: 'line',
    options: shameNames.reduce((p, c) => ({ ...p, [c]: c }), {}),
  })
  shapeType = `star`;
}

export class ShapeTool extends DrawTool {
  name = 'shapes';
  icon = 'shapes';
  shape?: paper.Shape;

  schematic = new ShapeToolSchematic();

  @Property()
  style = new paper.Style({
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

  dragSub = this.drag.subscribe((e: any) => {
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

  upSub = this.up.subscribe((e: any) => {
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

  activate(): void {
    super.activate();
    if (this.project) {
      this.style.strokeWidth = this.project.currentStyle.strokeWidth;
    }
  }
}
