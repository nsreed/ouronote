import { VectorTool } from './paper-tool';
import * as paper from 'paper';
import { of } from 'rxjs';
import { Action } from './undo-stack';
export class MoveTool extends VectorTool {
  name = 'move';
  icon = 'arrows-alt';
  enabled$ = of(true);
  dragged = false;

  downSub = this.down.subscribe((e) => {
    this.dragged = false;
  });

  dragSub = this.drag.subscribe((e) => {
    this.dragged = this.dragged || e.delta.length > 0;
    const selectedItems = this.scope.project.getItems({
      selected: true,
      match: (item: paper.Item) => item.className !== 'Layer',
    });
    // TODO figure out how to ungroup items. Using this approach they stay grouped forever.
    // const selectedGroup = new paper.Group(selectedItems);
    // selectedGroup.translate(e.delta);
    selectedItems.forEach((item) => {
      item.translate(e.delta as any);
    });
  });

  upSub = this.up.subscribe((e) => {
    if (!this.dragged) {
      this.scope.tools.find((t: any) => t.name === 'lasso select')?.activate();
      this.project.deselectAll();
      return;
    }

    const selectedItems = this.scope.project.getItems({
      selected: true,
      match: (item: paper.Item) => item.className !== 'Layer',
    });

    selectedItems.forEach((item) => {
      const saveFields = ['position'];
      if (item.className === 'Path') {
        saveFields.push('segments');
      }
      (item as any).pair.save(saveFields);
    });
  });
}
