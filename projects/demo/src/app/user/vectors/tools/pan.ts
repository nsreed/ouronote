import { VectorTool } from './paper-tool';
import { filter } from 'rxjs/operators';
import { isMouse, isTouch } from '../functions/tool-functions';
export class PanTool extends VectorTool {
  dragSub = this.drag
    .pipe(filter((e) => e.delta.length > 0.2))
    .subscribe((e) => {
      (this.project.view as any).scrollBy((e.delta as any).multiply(-1));
    });
  filterEvent(event: any) {
    return isMouse(event) || isTouch(event);
  }
}
