import { Tool, ToolEvent } from 'paper';
import { fromEvent } from 'rxjs';
import { after$ } from '../../functions/aspect-rx';
import * as paper from 'paper';
import { filter } from 'rxjs/operators';

export class VectorTool extends Tool {
  drag = fromEvent<paper.ToolEvent>(this, 'mousedrag');
  down = fromEvent<paper.ToolEvent>(this, 'mousedown');
  up = fromEvent<paper.ToolEvent>(this, 'mouseup');
  move = fromEvent<paper.ToolEvent>(this, 'mousemove');

  name = 'unnamed tool';

  touchDown = this.down.pipe(filter((e: any) => e.event instanceof TouchEvent));

  get project() {
    return this.scope.project as paper.Project;
  }

  constructor(public readonly scope: paper.PaperScope) {
    super();
    this.touchDown.subscribe((e) => {
      console.log('touch down');
    });
    this.setup();
    // TODO touch events should be filterable/reduce()ed in such a way as to allow gesture integration
  }
  protected setup() {}
}
