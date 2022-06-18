import { VectorTool } from './paper-tool';
import * as paper from 'paper';
import { of } from 'rxjs';
import { Action } from './undo-stack';
import { SelectionTool } from './selection-tool';
export class ResizeTool extends SelectionTool {
  name = 'resize';
  matIconName = 'aspect_ratio';
  dragged = false;

  selectedItems: paper.Item[] = [];
  selectedBounds!: paper.Rectangle;
  selectedCenter!: paper.Point;

  downSub = this.down.subscribe((e) => {
    this.dragged = false;
    this.selectedItems = this.scope.project.getItems({
      selected: true,
      match: (item: paper.Item) => item.className !== 'Layer',
    });

    if (this.selectedItems.length > 0) {
      this.selectedBounds = this.selectedItems.reduce((p, s) => {
        return p.unite(s.bounds);
      }, this.selectedItems[0].bounds);
      this.selectedCenter = this.selectedBounds.center;
    }
  });

  dragSub = this.drag.subscribe((e) => {
    this.dragged = this.dragged || e.delta.length > 0;
    const initLength = this.selectedCenter
      ?.subtract(e.downPoint)
      .multiply(-1).length;
    const lastLength = this.selectedCenter
      ?.subtract(e.lastPoint)
      .multiply(-1).length;
    const currentLength = this.selectedCenter
      ?.subtract(e.point)
      .multiply(-1).length;

    const deltaLength = currentLength / lastLength;

    this.selectedItems.forEach((i) => {
      const vectorFromCenter = i.bounds.center.subtract(this.selectedCenter);
      const moveBy = vectorFromCenter.multiply(deltaLength - 1);
      i.translate(moveBy);
      i.scale(deltaLength);
    });
  });

  upSub = this.up.subscribe((e) => {
    // if (!this.dragged) {
    //   this.scope.tools.find((t: any) => t.name === 'lasso select')?.activate();
    //   this.project.deselectAll();
    //   return;
    // }

    const selectedItems = this.scope.project.getItems({
      selected: true,
      match: (item: paper.Item) => item.className !== 'Layer',
    });

    selectedItems.forEach((item) => {
      const saveFields = ['position', 'matrix'];
      if (item.className === 'Path') {
        saveFields.push('segments');
      }
      (item as any).pair.save(saveFields);
    });
  });
}
