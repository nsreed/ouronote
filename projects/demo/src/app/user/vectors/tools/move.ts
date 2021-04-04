import { VectorTool } from '../paper-tool';
import * as paper from 'paper';
export class MoveTool extends VectorTool {
  dragSub = this.drag.subscribe((e) => {
    this.scope.project
      .getItems({
        selected: true,
        match: (item: paper.Item) => item.className !== 'Layer',
      })
      .forEach((item) => {
        item.translate(e.delta as any);
      });
  });

  upSub = this.up.subscribe((e) => {
    this.scope.project
      .getItems({
        selected: true,
        match: (item: paper.Item) => item.className !== 'Layer',
      })
      .forEach((item) => {
        // TODO find a better way to keep track of saved fields
        (item as any).pair.save(['position', 'segments']);
      });
  });
}
