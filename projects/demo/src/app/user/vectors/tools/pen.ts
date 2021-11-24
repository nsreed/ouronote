import * as paper from 'paper';
import { Style } from 'paper';
import { Observable } from 'rxjs';
import { CAPABILITIES } from '../../../system.service';
import { PenEvent } from '../classes/PenEvent';
import { Property } from '../functions/decorators';
import { VectorTool } from './paper-tool';
export class PenTool extends VectorTool {
  path!: paper.Path;

  name = 'pen';
  @Property()
  style = new Style({
    strokeCap: 'round',
    strokeJoin: 'round',
    strokeWidth: 3,
  } as paper.Style);

  @Property()
  smoothing = true;

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
    this.activateDrawLayer();
    this.path = new paper.Path(e.point) as any;
    (this.path as any).pair.editing = true;
    this.path.style = this.style;
  });
  dragSub = this.drag.subscribe((e: any) => {
    this.path.add(e.point);
  });
  upSub = this.up.subscribe((e) => {
    if (this.path.length === 0) {
      this.path.remove();
    }
    this.path.strokeColor = this.project.currentStyle.strokeColor;
    this.path.fillColor = this.project.currentStyle.fillColor;
    if (this.smoothing) {
      this.path.smooth();
    }
    (this.path as any).pair?.doSave();
    (this.path as any).pair.editing = false;
  });

  filterEvent(event: any) {
    // Respond to pen if pointerType is present, if it isn't assume we're mouse-only
    return true; // ['pen', undefined].includes(event.event.pointerType); // TODO re-enable me when ready to tackle digitizer support
  }
}
