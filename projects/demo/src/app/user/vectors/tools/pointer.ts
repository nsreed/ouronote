import { Item } from 'paper/dist/paper-core';
import { from } from 'rxjs';
import { map, shareReplay, scan, filter, switchMap } from 'rxjs/operators';
import { VectorTool } from './paper-tool';
import * as paper from 'paper';
import {
  HitResultWidget,
  isHitResultEqual as sameItemAndType,
} from '../../../vector/widgets/hit-result-widget';
import { isIgnored } from '../functions/paper-functions';

const selectedStyle = {
  fillColor: new paper.Color(1, 0, 0, 0.2),
  strokeColor: new paper.Color(1, 0, 0, 0.2),
} as paper.Style;

type HitTestTypes = {
  fill?: boolean;
  stroke?: boolean;
  segments?: boolean;
  curves?: boolean;
  handles?: boolean;
  ends?: boolean;
  center?: boolean;
  bounds?: boolean;
  guides?: boolean;
  selected?: boolean;
};

const BoundsTests = {
  center: true,
  bounds: true,
} as HitTestTypes;
const VisibleTests = {
  stroke: true,
  fill: true,
} as HitTestTypes;
const ControlTests = {
  handles: true,
};
const PathTests = {
  segments: true,
  curves: true,
  ends: true,
};

enum EHitTestType {
  FILL = 'fill',
  STROKE = 'stroke',
  SEGMENT = 'segment',
  CURVE = 'curve',
  HANDLE = 'handle',
  END = 'end',
  BOUND = 'bound',
  GUIDE = 'guide',
}

type HitTestOptions = HitTestTypes & {
  tolerance?: number;
  class?: Function;
  match?: Function;
};

const findPoints =
  (project: paper.Project) => (options: HitTestOptions) => (p: paper.Point) =>
    project.hitTestAll(p, {
      ...options,
      tolerance: ((options?.tolerance || 0) * 1) / project.view.zoom,
    });

type THitResultDiffs = {
  all: HitResultWidget[];
  added: HitResultWidget[];
  removed: HitResultWidget[];
  updated: HitResultWidget[];
};

export class PointerTool extends VectorTool {
  name = 'pointer';
  icon = 'cursor';
  category = 'select';
  propertyNames = ['selectLayerConstraint'];

  private readonly hitResults$ = this.move.pipe(
    map((e) => e.point),
    map((p) =>
      findPoints(this.project)({
        tolerance: 30,
        ...PathTests,
        ends: true,
        curves: true,
        segments: true,
        stroke: true,
      })(p).filter((hr) => hr.point && !isIgnored(hr.item))
    )
  );

  get foregroundLayer() {
    let foreground = this.project.getItem({
      className: 'Layer',
      name: 'foreground',
    }) as paper.Layer;
    if (!foreground) {
      foreground = new paper.Layer({
        name: 'foreground',
        data: { ignore: true },
      });
      foreground.data.ignore = true;
      // foreground.blendMode = 'difference';
      foreground.activate();
      foreground.bringToFront();
    }
    return foreground;
  }

  hasSelections$ = this.selectedItems$.pipe(map((s) => s.length > 0));
  dragging$ = from([
    this.drag.pipe(map(() => true)),
    this.up.pipe(map(() => false)),
  ]).pipe(shareReplay());

  savedState: any;
  saveProjectState() {
    this.savedState = {
      activeLayer: this.project.activeLayer,
      currentStyle: this.project.currentStyle,
    };
  }
  restoreProjectState() {
    if (this.savedState) {
      if (this.savedState.activeLayer) {
        this.savedState.activeLayer.activate();
      }
      if (this.savedState.currentStyle) {
        this.project.currentStyle = this.savedState.currentStyle;
      }
    }
  }

  subs = [
    this.click.subscribe((e) => {
      if (e.item.layer.name === 'background') {
        console.log('clicked nothing');
        this.project.deselectAll();
      }
    }),
    this.hitResults$
      .pipe(
        scan(
          (diffs, hits) => {
            const withResult =
              (widget: HitResultWidget) => (hitResult: paper.HitResult) =>
                sameItemAndType(hitResult, widget.hitResult);

            const updated = diffs.all.filter((r) => hits.some(withResult(r)));
            const added = hits
              .filter(
                (c) =>
                  !updated.some((e: HitResultWidget) =>
                    sameItemAndType(c, e.hitResult)
                  )
              )
              .map(
                (a) =>
                  new HitResultWidget(
                    a,
                    this.foregroundLayer,
                    a.item.project,
                    paper
                  )
              );
            const removed = diffs.all.filter(
              (a) => !hits.some((c) => sameItemAndType(c, a.hitResult))
            );
            updated.forEach(
              (u) =>
                (u.hitResult = hits.find((c) =>
                  sameItemAndType(c, u.hitResult)
                ) as paper.HitResult)
            );
            // if (hits.length > 0) {
            //   console.log({ added, removed, updated }, [
            //     added.length,
            //     removed.length,
            //     updated.length,
            //   ]);
            // }
            return {
              all: added.concat(updated),
              added,
              removed,
              updated,
            };
          },
          { all: [] as HitResultWidget[] } as THitResultDiffs
        )
      )
      .subscribe((hitResults) => {
        this.saveProjectState();
        hitResults.removed.forEach((r) => r.remove());
        hitResults.updated.forEach((a) => a.draw());

        from(hitResults.added)
          .pipe(
            switchMap((a) =>
              a.mouseDown$.pipe(map((e) => ({ widget: a, event: e })))
            )
          )
          .subscribe((e) => {
            const hitResult = e.widget.hitResult;
            const item = hitResult.item;
            item.selected = !item.selected;
            [hitResult.location?.curve, hitResult.segment]
              .filter((v) => v)
              .forEach((n) => (n.selected = item.selected));
          });

        this.restoreProjectState();
      }),
  ];
}

const drawHitResult = (project: paper.Project) => (hr: paper.HitResult) => {
  const scale = 1 / project.view.zoom;
  const hoverGroup = new paper.Group();
  const circleRadius = hr.item.strokeWidth || 20;
  const textOffset = new paper.Point(0, 30);
  const fontSize = 30;

  const styleForType = {
    stroke: {
      strokeColor: new paper.Color('green'),
      fillColor: new paper.Color(1, 0, 0, 0.3),
    },
  } as Record<string, any>;

  hoverGroup.strokeScaling = true;
  const circle = new paper.Shape.Circle(hr.point, scale * circleRadius);
  circle.strokeColor = new paper.Color('red');
  circle.fillColor = new paper.Color(1, 0, 0, 0.3);
  circle.style = styleForType[hr.type] || {};
  circle.strokeWidth = scale * 4;

  hoverGroup.addChild(circle);

  const label = new paper.PointText(hr.point.add(textOffset.multiply(scale)));
  label.content = hr.type;
  label.justification = 'center';
  label.strokeWidth = 0;
  label.fontSize = scale * fontSize;
  label.fillColor = new paper.Color('black');

  hoverGroup.addChild(label);
  hoverGroup.addChild(drawCurveLocation(hr.location));

  hoverGroup.data.ignore = true;
  hoverGroup.data.hitResult = hr;
  hoverGroup.children.forEach((c) => (c.data.ignore = true));
  return hoverGroup;
};

const drawCurveLocation = (curveLocation: paper.CurveLocation) => {
  const arrow = new paper.Path(curveLocation);
  if (!curveLocation) {
    return arrow;
    // arrow.lineBy(hr.location.tangent.multiply(10));
  }
  // console.log(curveLocation.curvature);
  arrow.lineBy(curveLocation.normal.multiply(10));

  // console.log(curveLocation.curvature);
  return arrow;
};

const onHover = (item: paper.Item) => {
  item.onMouseEnter = (e: paper.MouseEvent) => {
    // e.currentTarget.tween(e.currentTarget, { scaling: 2, duration: 200 });
    if (!e.currentTarget.data.hover) {
      console.log('hover enter');
      e.currentTarget.data.hover = true;
      e.currentTarget.scale(4);
    }
  };
  item.onMouseLeave = (e: paper.MouseEvent) => {
    // e.currentTarget.tween(e.currentTarget, { scaling: 2, duration: 200 });
    console.log('hover leave');
    delete e.currentTarget.data.hover;
  };
};

const drawItemOverlay = (item: paper.Item) => {
  const g = new paper.Group();
  const rect = new paper.Shape.Rectangle(item.strokeBounds);

  g.addChild(rect);
  g.data.ignore = true;
  g.style = selectedStyle;
  return g;
};
// type Action = {
//   readonly type: string;
// };

// export enum SelectionActionType {
//   SELECT_ITEMS = 'Select Items',
//   DESELECT_ITEMS = 'Deselect Items',
//   MOVE_SELECTED = 'Move Selected',
//   SCALE_SELECTED = 'Scale Selected',
//   ROTATE_SELECTED = 'Rotate Selected',
// }
// class DownTrigger {
//   constructor(public payload: any) {}
// }
// class DragTrigger {
//   constructor(public payload: paper.Item[]) {}
// }
// class ClickTrigger {
//   constructor(public payload: paper.Item[]) {}
// }
// class DropTrigger {
//   constructor(payload: paper.Item[]) {}
// }
// export class DeselectAction extends ClickTrigger implements Action {
//   public readonly type = SelectionActionType.DESELECT_ITEMS;
// }
// export class MoveAction extends DragTrigger implements Action {
//   public readonly type = SelectionActionType.DESELECT_ITEMS;
// }
// export class ScaleAction extends DragTrigger implements Action {
//   public readonly type = SelectionActionType.DESELECT_ITEMS;
// }
// export class RotateAction implements Action {
//   public readonly type = SelectionActionType.DESELECT_ITEMS;
// }
// export class DeselectItemsAction implements Action {
//   public readonly type = SelectionActionType.DESELECT_ITEMS;
// }
// export class SelectItemsAction extends DragTrigger implements Action {
//   public readonly type = SelectionActionType.SELECT_ITEMS;
// }
