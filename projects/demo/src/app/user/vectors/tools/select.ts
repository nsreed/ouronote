import { VectorTool } from '../paper-tool';
import * as paper from 'paper';
import { filter, mergeMapTo, switchMapTo, tap } from 'rxjs/operators';
import { Property } from '../functions/decorators';

export type ToolSelectionMode = 'new' | 'add' | 'remove';

export class SelectTool extends VectorTool {
  @Property({
    values: ['new', 'add', 'remove'],
  })
  mode: ToolSelectionMode = 'new';

  name = 'select';
  selecting = false;

  clickSub = this.click.subscribe((e) => this.project.deselectAll());

  //#region sources
  selectDown = this.down.pipe(
    filter(
      (e) =>
        e.modifiers.shift ||
        this.scope.project.getItems({
          selected: true,
          match: (i: paper.Item) => i.className !== 'Layer',
        }).length === 0
    ),
    tap((e) => {
      this.selecting = true;
    })
  );

  selectDrag = this.drag.pipe(filter((e) => this.selecting));

  selectUp = this.up.pipe(
    filter((e) => this.selecting),
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
  path!: paper.Path;
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
      this.path.strokeColor = new paper.Color(0, 0, 1) as any;
      (this.scope.settings as any).insertItems = prev;
      this.project.activeLayer.insertChild(0, this.path);
    }
    this.path.add(e.point);
  });
  sduSub = this.selectUp.subscribe((e) => {
    console.log('select up');
    if (this.path) {
      const intersected = this.scope.project.getItems({
        match: (item: paper.Item) =>
          item.className !== 'Layer' && this.path?.intersects(item),
      });
      // this.scope.project.deselectAll();
      intersected.forEach((i) => (i.selected = true));

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
    // if (!this.rect) {
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
    // }
    // this.rect.position = e.downPoint;
    // this.rect.size.width = Math.abs(e.downPoint.x - e.point.x);
    // this.rect.size.height = Math.abs(e.downPoint.y - e.point.y);
  });
  suSub = this.selectUp.subscribe((e) => {
    if (this.rect) {
      const intersected = this.scope.project.getItems({
        match: (item: paper.Item) =>
          item.className !== 'Layer' && this.rect?.intersects(item),
      });
      // this.scope.project.deselectAll();
      intersected.forEach((i) => (i.selected = true));

      this.rect.remove();
      this.rect = null as never;
    } else {
      // this.scope.project.deselectAll();
    }
  });
}
