import * as paper from 'paper';
import { Enum, Node } from '../../../common/metadata';
import { Property } from '../functions/decorators';
import { DrawTool } from './draw-tool';
import { ToolSchematic } from './paper-tool';
import { pipe, Subject } from 'rxjs';
import { takeUntil, takeWhile, buffer } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

const p0 = new paper.Point(0, 0);
const p1 = new paper.Point(0, 0);
const r0 = new paper.Rectangle(p0, p1);

// const se = new paper.Shape.Ellipse(r0);
// const pe = new paper.Path.Ellipse(r0);
// pe.interpolate

const consumePoint = (event: any, pconstructor: any, ...args: any[]): any =>
  null;

const Path = paper.Path;

const pathConstructors = {
  arc: Path.Arc,
  circle: Path.Circle,
  ellipse: Path.Ellipse,
  line: Path.Line,
  rectangle: Path.Rectangle,
  regularpolygon: Path.RegularPolygon,
  star: Path.Star,
};
const P = (name: string) => ({ [name]: paper.Point });
const twoPtCtor = [P('a'), P('b')];
const arcCtor = [P('a'), P('b'), P('c')];
const starCtor = [
  P('center'),
  { points: Number },
  { innerRadius: Number },
  { outerRadius: Number },
];
const regPolyCtor = [
  { center: paper.Point },
  { sides: Number },
  { radius: Number },
];
type t = typeof paper.Shape.Circle;
const pathArguments = {
  arc: arcCtor,
  star: starCtor,
  'regular polygon': regPolyCtor,
};
// good idea
// [paper.Path.Circle, (p, c) => ({}), (p, c) => ({})]

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
  | 'regular polygon'
  | string;

const shapeNames = [
  'star',
  'line',
  'circle',
  'rectangle',
  'ellipse',
  'arc',
  'regular polygon',
];

@Node()
export class ShapeToolSchematic
  extends ToolSchematic
  implements ShapeToolSchema
{
  propertyChange$ = new EventEmitter<any>();
  private _shapeType = `line`;
  public get shapeType() {
    return this._shapeType;
  }
  @Enum({
    description: 'Shape Type',
    defaultValue: 'line',
    options: shapeNames.reduce((p, c) => ({ ...p, [c]: c }), {}),
  })
  public set shapeType(value) {
    this._shapeType = value;
    this.target.shapeType = value;
    this.propertyChange$.emit(value);
  }
}

// A shape maker has to be able to create, update, maybe even delete.
class ShapeFactory {
  // select
  // create = (point) => ~new shape~ at point =>
  // drag = (point[], shape) => ~update shape~ given points at head =>
  // release = () => release shape from context

  // idle
  // -> left button down
  // up -> click

  // move -> drag
  // up -> release

  // eventPipe = pipe<any, any>(buffer((e: any) => e.type === 'mousedown'));
  eventSink$ = new Subject();

  type: keyof typeof pathConstructors = 'line';
  method = pathConstructors[this.type];
  next = (event: any, ...args: any[]) => args.push(event);
}

export class ShapeTool extends DrawTool implements ShapeToolSchema {
  name = 'shapes';
  icon = 'shapes';
  shape?: paper.Path;

  schematic = new ShapeToolSchematic(this);

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
  shapeType: keyof typeof pathConstructors = 'line';

  propertyNames: string[] = ['style', 'scale'];

  downSub = this.down.subscribe(() => this.activateDrawLayer());

  dragSub = this.drag.subscribe((e: any) => {
    const prev = (this.scope.settings as any).insertItems;
    (this.scope.settings as any).insertItems = false;
    this.shape?.remove();

    const ctor = pathConstructors[this.shapeType];
    if (this.shapeType in pathArguments) {
      // we might be boned, let's see if we can get that good shit
      const argDefs = (
        pathArguments as Record<string, { [name: string]: any }[]>
      )[this.shapeType];
    }

    try {
      this.shape = new ctor(e.downPoint, e.point); //new paper.Shape.Rectangle(e.downPoint, e.point);

      this.shape.data.ignore = true;
      this.shape.style = this.style;
      this.shape.style = this.project.currentStyle;
      const width = this.scale
        ? (1 / this.project.view.zoom) * this.style.strokeWidth
        : this.style.strokeWidth;
      this.shape.strokeWidth = width;

      this.project.activeLayer.insertChild(
        this.project.activeLayer.children.length,
        this.shape
      );
    } catch (e) {
      console.warn(e);
    }

    (this.scope.settings as any).insertItems = prev;
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
