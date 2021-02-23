import { Tool, ToolEvent } from 'paper';
import { fromEvent } from 'rxjs';
import { after$ } from '../../functions/aspect-rx';
import * as paper from 'paper';

export class VectorTool extends Tool {
  drag = fromEvent<paper.ToolEvent>(this, 'mousedrag');
  down = fromEvent<paper.ToolEvent>(this, 'mousedown');
  up = fromEvent<paper.ToolEvent>(this, 'mouseup');
  move = fromEvent<paper.ToolEvent>(this, 'mousemove');

  name = 'unnamed tool';

  get project() {
    return this.scope.project as paper.Project;
  }

  constructor(public readonly scope: paper.PaperScope) {
    super();
    this.setup();
  }
  protected setup() {}
}
