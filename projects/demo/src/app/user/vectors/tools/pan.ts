import { VectorTool } from './paper-tool';
import { filter } from 'rxjs/operators';
import { isMouse, isTouch } from '../functions/tool-functions';
export class PanTool extends VectorTool {
  name = 'pan';
  category = 'view';
  icon = 'hand-paper';
  lastDelta?: null | paper.Point;
  downSub = this.down.subscribe(() => {
    this.lastDelta = null;
  });
  dragSub = this.drag
    // .pipe(filter((e) => e.delta.length > 0.2))
    .subscribe((e) => {
      const actualDelta = this.lastDelta
        ? this.lastDelta.subtract(e.delta)
        : e.delta;
      (this.project.view as any).scrollBy((actualDelta as any).multiply(1));
      this.lastDelta = actualDelta;
    });
  filterEvent(event: any) {
    return true;
    // isMouse(event) || isTouch(event);
  }
}
