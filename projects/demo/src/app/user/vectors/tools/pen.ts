import * as paper from 'paper';
import { Style } from 'paper';
import { Observable } from 'rxjs';
import { CAPABILITIES } from '../../../system.service';
import { PenEvent } from '../classes/PenEvent';
import { Property } from '../functions/decorators';
import { VectorTool } from './paper-tool';
export class PenTool extends VectorTool {
  path!: paper.Path;
  icon = 'marker';
  name = 'pen';

  @Property()
  style = new Style({
    strokeCap: 'round',
    strokeJoin: 'round',
    strokeWidth: 3,
  } as paper.Style);

  @Property()
  smoothing = true;

  propertyNames = ['style', 'smoothing'];

  penDown: Observable<PenEvent | paper.ToolEvent> = CAPABILITIES.POINTER
    ? this.pointerDown
    : this.down;
  penDrag: Observable<PenEvent | paper.ToolEvent> = CAPABILITIES.POINTER
    ? this.pointerDrag
    : this.drag;
  penUp: Observable<PenEvent | paper.ToolEvent> = CAPABILITIES.POINTER
    ? this.pointerUp
    : this.up;
  downSub = this.down.subscribe((e) => {
    if (this.path) {
      this.logger.warn('pre-existing path on pointer down!');
      this.path = null as any;
    }
    this.activateDrawLayer();
  });
  dragSub = this.drag.subscribe((e: any) => {
    if (!this.path) {
      this.path = new paper.Path(e.point) as any;
      (this.path as any).pair.editing = true;
      this.path.style = this.style;
      this.path.strokeWidth = this.style.strokeWidth;
      this.path.strokeColor = this.project.currentStyle.strokeColor;
      this.path.fillColor = this.project.currentStyle.fillColor;
    }
    this.path.add(e.point);
  });
  upSub = this.up.subscribe((e) => {
    if (this.path) {
      if (this.path.length === 0) {
        this.path.remove();
        return;
      } else {
        const p = this.path;
        this.scope.actions = this.scope.actions || [];
        this.scope.actions.push({
          undoFn: () => {
            console.log('should remove', p);
            p.remove();
          },
        });
      }
      // this.path.style.strokeWidth = this.style.strokeWidth;
      // this.path.strokeColor = this.project.currentStyle.strokeColor;
      // this.path.fillColor = this.project.currentStyle.fillColor;
      // if (this.smoothing) {
      //   this.path.smooth();
      // }
      (this.path as any).pair.doSave();
      (this.path as any).pair.editing = false;
      // TODO add this path to the undo stack
      this.path = null as any;
    }
  });

  filterEvent(event: any) {
    // Respond to pen if pointerType is present, if it isn't assume we're mouse-only
    return true; // ['pen', undefined].includes(event.event.pointerType); // TODO re-enable me when ready to tackle digitizer support
  }
}
