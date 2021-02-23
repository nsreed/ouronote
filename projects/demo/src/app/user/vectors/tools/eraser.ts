import { VectorTool } from '../paper-tool';
import { Path, Point, Style, ToolEvent, Project } from 'paper';
import * as paper from 'paper';
export class EraserTool extends VectorTool {
  path?: typeof Path | null;
  name = 'eraser';
  setup() {
    this.drag.subscribe((e: paper.ToolEvent) => {
      // console.log('eraser drag');
      const hits = this.project.hitTestAll(e.point as any);
      console.log('would erase', hits);
    });
    this.up.subscribe((e) => (this.path = null));
  }
}
