import * as paper from 'paper';
import { DrawTool } from './draw-tool';
export class EraserTool extends DrawTool {
  path?: paper.Path | null;
  name = 'eraser';
  icon = 'eraser';
  allIntersects: paper.Item[] = [];

  downSub = this.down.subscribe((e: any) => this.activateDrawLayer());

  dragSub = this.drag.subscribe((e: paper.ToolEvent) => {
    // console.log('eraser drag');
    const prev = (this.scope.settings as any).insertItems;
    (this.scope.settings as any).insertItems = false;
    this.path = new paper.Path([e.lastPoint, e.point]);
    this.path.data.ignore = true;
    const intersects = this.project.getItems({
      match: (i: paper.Item) =>
        i !== this.path &&
        i.className !== 'Layer' &&
        !i.data.ignore &&
        i.intersects(this.path as any),
    });
    // TODO skip removing items that were added since the beginning of this drag

    this.allIntersects = this.allIntersects.concat(intersects);
    intersects.forEach((i) => i.remove());
    (this.scope.settings as any).insertItems = prev;
  });

  upSub = this.up.subscribe((e: any) => {
    this.path = null;
    // TODO re-enable undo when race condition has been fixed
    // this.scope.actions = this.scope.actions || [];
    // const intersects = this.allIntersects;
    // if (intersects.length > 0) {
    //   this.scope.actions.push({
    //     undoFn: () => {
    //       console.log('should re-add', intersects);
    //       this.activateDrawLayer();
    //       // TODO add these to their original layer
    //       intersects.forEach((i) => {
    //         this.scope.project.activeLayer.addChild(i);
    //       });
    //     },
    //   });
    // }
    this.allIntersects = [];
  });
}
