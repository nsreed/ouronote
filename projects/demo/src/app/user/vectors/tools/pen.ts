import { VectorTool } from './paper-tool';
import { Path, Style } from 'paper';
import * as paper from 'paper';
import { Property } from '../functions/decorators';
import { isMouse, isPen } from '../functions/tool-functions';
import { from, Observable } from 'rxjs';
import { CAPABILITIES } from '../../../system.service';
import { PenEvent } from '../classes/PenEvent';
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
  downSub = this.penDown.subscribe((e) => {
    this.activateDrawLayer();
    this.path = new paper.Path(e.point) as any;
    (this.path as any).pair.editing = true;
    this.path.style = this.style;
  });
  dragSub = this.penDrag.subscribe((e: any) => {
    this.logger.log('pen drag', e.event.type, e.event.pointerType);
    this.path.add(e.point);
  });
  upSub = this.penUp.subscribe((e) => {
    this.path.strokeColor = this.project.currentStyle.strokeColor;
    this.path.fillColor = this.project.currentStyle.fillColor;
    if (this.smoothing) {
      this.path.smooth();
    }
    (this.path as any).pair?.doSave();
    (this.path as any).pair.editing = false;
  });

  filterEvent(event: any) {
    // if (event.event instanceof PointerEvent) {
    //   const te = event.event as PointerEvent;
    //   console.log('touch type', te.pointerType);
    // }
    // this.logger.log(
    //   'type: %s, pointerType: %s, classname: %s',
    //   event.event.type,
    //   // tslint:disable-next-line: no-string-literal
    //   (window['event'] as any).pointerType,
    //   Object.getPrototypeOf(event.event).constructor.name
    // );

    return ['pen', undefined].includes(event.event.pointerType);
  }
}
