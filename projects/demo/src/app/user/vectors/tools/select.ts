import { VectorTool } from './paper-tool';
import * as paper from 'paper';
import { filter, mergeMapTo, switchMapTo, tap } from 'rxjs/operators';
import { Property } from '../functions/decorators';

export type ToolSelectionMode = 'new' | 'add' | 'remove';

export class SelectTool extends VectorTool {
  @Property({
    values: ['new', 'add', 'remove'],
  })
  mode: ToolSelectionMode = 'new';
  icon = 'vector-square';

  name = 'select';
  selecting = false;

  clickSub = this.click.subscribe((e) => this.project.deselectAll());

  //#region sources
  selectDown = this.down.pipe(
    // filter(
    //   (e) =>
    //     e.modifiers.shift ||
    //     this.scope.project.getItems({
    //       selected: true,
    //       match: (i: paper.Item) => i.className !== 'Layer',
    //     }).length === 0
    // ),
    tap((e) => {
      this.selecting = true;
      if (!e.modifiers.shift) {
        this.scope.project.deselectAll();
      }
    })
  );

  selectDrag = this.drag.pipe(filter((e) => true || this.selecting));

  selectUp = this.up.pipe(
    filter((e) => true || this.selecting),
    tap((e) => (this.selecting = false))
  );

  keyEsc = this.keyup.pipe(filter((e) => e.key === 'escape'));
  keyDel = this.keyup.pipe(filter((e) => e.key === 'delete'));
  //#endregion
  //#region subscribers
  keyEscSub = this.keyEsc.subscribe((e) => {
    this.selecting = false;
    this.scope.project.deselectAll();
  });
  keyDelSub = this.keyDel.subscribe((e) => {
    // console.log('keyup', e);
    this.scope.project
      .getItems({
        selected: true,
        match: (i: paper.Item) => i.className !== 'Layer',
      })
      .forEach((i) => {
        // console.log('would delete', i.toString());
        i.remove();
      });
  });
  //#endregion
}
export class LassoSelectTool extends SelectTool {
  name = 'lasso select';
  matIcon = 'lasso';
  path!: paper.Path;
  @Property()
  greedySelect = false;

  propertyNames: string[] = ['greedySelect'];

  sdSub = this.selectDown.subscribe((e) => {});
  sdrSub = this.selectDrag.subscribe((e) => {
    if (!this.path) {
      const prev = (this.scope.settings as any).insertItems;
      (this.scope.settings as any).insertItems = false;
      this.path = this.path || new paper.Path([e.downPoint]);
      this.path.data.ignore = true;
      this.path.dashArray = [12, 12];
      this.path.closed = true;
      this.path.fillColor = new paper.Color(0, 0, 1, 0.5) as any;
      this.path.strokeWidth = 1;
      this.path.strokeScaling = true;
      this.path.strokeColor = new paper.Color(0, 0, 1) as any;
      (this.scope.settings as any).insertItems = prev;
      this.project.activeLayer.insertChild(
        this.project.activeLayer.children.length,
        this.path
      );
    }
    this.path.add(e.point);
  });
  sduSub = this.selectUp.subscribe((e) => {
    // TODO hitTest appears to be able to honor fill, but requires a point, not an item
    if (this.path) {
      const intersected = this.scope.project.getItems({
        // !overlapping doesn't work for Shape.Rectangle, might want to use view bounds?
        // overlapping: this.path?.bounds,
        match: (item: paper.Item) => {
          if (item === this.path || item.className === 'Layer') {
            return false;
          }

          let hasMatch = false;
          if (item.className === 'Path') {
            const iPath = item as paper.Path;
            const segmentPoints = iPath.segments.map((s) => s.point);
            if (!this.greedySelect) {
              hasMatch = true;
              segmentPoints.forEach((p) => {
                if (!this.path.contains(p)) {
                  hasMatch = false;
                }
              });
            } else {
              segmentPoints.forEach((p) => {
                if (this.path.contains(p)) {
                  hasMatch = true;
                }
              });
            }
          } else if (item instanceof paper.Shape) {
            const corners = [
              item.bounds.bottomLeft,
              item.bounds.bottomRight,
              item.bounds.topRight,
              item.bounds.topLeft,
            ];

            // TODO: Greedy select on shape edges
            // const x = new paper.Path(corners);
            // x.closePath();
            // x.strokeWidth = 3;
            // x.strokeColor = new paper.Color('green');
            // x.removeOnDown();

            if (this.greedySelect) {
              return corners.find((p) => this.path.contains(p)) !== undefined;
            } else {
              return corners.find((p) => !this.path.contains(p)) === undefined;
            }
          }

          return hasMatch || (this.greedySelect && this.path?.intersects(item));
        },
      });
      intersected.forEach((item) => {
        item.selected = true;
      });

      if (this.project.selectedItems.length >= 0) {
        console.log('have selected', this.project.selectedItems.length);
        this.scope.tools.find((t: any) => t.name === 'move')?.activate();
      }

      this.path.remove();
      this.path = null as never;
    } else {
      // this.scope.project.deselectAll();
    }
  });
}

export class RectangleSelectTool extends SelectTool {
  name = 'area select';
  rect!: paper.Shape;
  sdSub = this.selectDown.subscribe((e) => {});
  sdrSub = this.selectDrag.subscribe((e) => {
    this.rect?.remove();
    const prev = (this.scope.settings as any).insertItems;
    (this.scope.settings as any).insertItems = false;
    this.rect = new paper.Shape.Rectangle(e.downPoint, e.point) as any;
    this.rect.pivot = new paper.Point(0, 0) as any;
    this.rect.data.ignore = true;
    this.rect.dashArray = [12, 12];
    this.rect.fillColor = new paper.Color(0, 0, 1, 0.5) as any;
    this.rect.strokeWidth = 1;
    this.rect.strokeColor = new paper.Color(0, 0, 1) as any;
    (this.scope.settings as any).insertItems = prev;
    this.project.activeLayer.insertChild(
      this.project.activeLayer.children.length,
      this.rect
    );
  });
  suSub = this.selectUp.subscribe((e) => {
    if (this.rect) {
      // FIXME this is also selecting Shape.Rectangles OUTSIDE the selection rectangle
      const intersected = this.scope.project.getItems({
        inside: this.rect.bounds,
        // overlapping: this.rect.bounds,
        match: (item: paper.Item) => item.className !== 'Layer',
      });
      intersected.forEach((i) => (i.selected = true));

      this.rect.remove();
      this.rect = null as never;
    } else {
      // this.scope.project.deselectAll();
    }
  });
}
