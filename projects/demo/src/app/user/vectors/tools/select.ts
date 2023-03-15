import * as paper from 'paper';
import { filter, tap } from 'rxjs/operators';
import { Property } from '../functions/decorators';
import { VectorTool } from './paper-tool';

export type ToolSelectionMode = 'new' | 'add' | 'remove';

export class SelectTool extends VectorTool {
  category = 'select';
  @Property({
    values: ['new', 'add', 'remove'],
  })
  mode: ToolSelectionMode = 'new';
  icon = 'vector-square';

  name = 'select';
  selecting = false;

  //#region sources
  selectDown = this.down.pipe(
    // filter(
    //   (e: any) =>
    //     e.modifiers.shift ||
    //     this.scope.project.getItems({
    //       selected: true,
    //       match: (i: paper.Item) => i.className !== 'Layer',
    //     }).length === 0
    // ),
    tap((e: any) => {
      this.selecting = true;
      if (!e.modifiers.shift) {
        this.scope.project.deselectAll();
      }
    })
  );

  selectDrag = this.drag.pipe(filter((e: any) => true || this.selecting));

  selectUp = this.up.pipe(
    filter((e: any) => true || this.selecting),
    tap((e: any) => (this.selecting = false))
  );

  keyEsc = this.keyup.pipe(filter((e: any) => e.key === 'escape'));
  //#endregion

  //#region subscribers
  keyEscSub = this.keyEsc.subscribe((e: any) => {
    this.selecting = false;
    this.scope.project.deselectAll();
  });
  //#endregion

  protected deselectIgnored() {
    this.project?.selectedItems
      .filter((item) => item.parent.data.ignore || item.data.ignore)
      .forEach((item) => {
        item.selected = false;
      });
  }

  onClick(event: paper.ToolEvent) {
    const selected = this.project.getItem({
      match: (item: paper.Item) => {
        return (
          item.className !== 'Layer' &&
          item.hitTest(event.point) &&
          !item.data.ignore &&
          !item.layer.data.ignore
        );
      },
    });
    if (selected) {
      if (!event.modifiers.shift) {
        this.project.deselectAll();
      }
      selected.selected = !selected.selected;
    }
  }
}
export class LassoSelectTool extends SelectTool {
  name = 'lasso select';
  matIcon = 'lasso';
  path!: paper.Path;
  @Property()
  greedySelect = false;

  propertyNames: string[] = ['greedySelect'];

  sdSub = this.selectDown.subscribe((e: any) => {});
  sdrSub = this.selectDrag.subscribe((e: any) => {
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
  sduSub = this.selectUp.subscribe((e: any) => {
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
          } else if (
            item instanceof paper.Shape ||
            item instanceof paper.PointText
          ) {
            const corners = [
              item.bounds.bottomLeft,
              item.bounds.bottomRight,
              item.bounds.topRight,
              item.bounds.topLeft,
            ];

            if (this.greedySelect) {
              const x = new paper.Path(corners);
              x.closePath();
              if (x.intersects(this.path)) {
                x.remove();
                return true;
              }
              x.remove();
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

      // if (this.project.selectedItems.length > 0) {
      //   console.log('have selected', this.project.selectedItems.length);
      //   this.scope.tools.find((t: any) => t.name === 'move')?.activate();
      // }

      this.path.remove();
      this.path = null as never;
    } else {
      // this.scope.project.deselectAll();
      this.onClick(e);
    }

    this.deselectIgnored();
  });
}

export class RectangleSelectTool extends SelectTool {
  name = 'area select';
  rect!: paper.Shape;
  sdSub = this.selectDown.subscribe((e: any) => {});
  sdrSub = this.selectDrag.subscribe((e: any) => {
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
  suSub = this.selectUp.subscribe((e: any) => {
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
      this.onClick(e);
    }
    this.deselectIgnored();
  });
}
