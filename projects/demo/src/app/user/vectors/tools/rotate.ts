import { VectorTool } from './paper-tool';
import * as paper from 'paper';
import { of } from 'rxjs';
import { Action } from './undo-stack';
import { SelectionTool } from './selection-tool';
export class RotateTool extends SelectionTool {
  name = 'rotate';
  matIconName = 'crop_rotate';
  dragged = false;

  selectedItems: paper.Item[] = [];
  selectedBounds!: paper.Rectangle;
  selectedCenter!: paper.Point;

  downSub = this.down.subscribe((e) => {
    this.dragged = false;
    this.updateSelected();
  });

  dragSub = this.drag.subscribe((e) => {
    this.dragged = this.dragged || e.delta.length > 0;
    const initAngle = this.selectedCenter
      ?.subtract(e.downPoint)
      .multiply(-1).angle;
    const lastAngle = this.selectedCenter
      ?.subtract(e.lastPoint)
      .multiply(-1).angle;

    const currentAngle = this.selectedCenter
      ?.subtract(e.point)
      .multiply(-1).angle;

    const deltaAngle = currentAngle - lastAngle;

    // console.log(
    //   'should rotate %f degrees around %o',
    //   deltaAngle,
    //   this.selectedCenter
    // );

    this.selectedItems.forEach((i) => {
      // console.dir(i.exportJSON({ asString: false }));
      i.rotate(deltaAngle, this.selectedCenter);
      // console.dir(i.exportJSON({ asString: false }));
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
      (item as any).pair?.save(saveFields);
    });
  });

  updateSelected() {
    const selection = this.scope.project.getItems({
      selected: true,
      match: (item: paper.Item) => item.className !== 'Layer',
    });

    const newSelections = selection.filter(
      (s) => !this.selectedItems.includes(s)
    );
    const deSelections = this.selectedItems.filter(
      (s) => !selection.includes(s)
    );
    if (newSelections.length > 0 || deSelections.length > 0) {
      console.log('updated selection');
      this.selectedItems = selection;

      if (this.selectedItems.length > 0) {
        this.selectedBounds = this.selectedItems.reduce((p, s) => {
          return p.unite(s.bounds);
        }, this.selectedItems[0].bounds);
        this.selectedCenter = this.selectedBounds.center;
      }
    }
  }
}
