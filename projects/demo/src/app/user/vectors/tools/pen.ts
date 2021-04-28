import { VectorTool } from './paper-tool';
import { Path, Style } from 'paper';
import * as paper from 'paper';
import { Property } from '../functions/decorators';
import { isMouse, isPen } from '../functions/tool-functions';
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
  setup() {
    // this.style.strokeJoin
    this.down.subscribe((e) => {
      this.path = new paper.Path(e.point) as any;
      (this.path as any).pair.editing = true;
      this.path.style = this.style;
    });
    this.drag.subscribe((e) => {
      // this.logger.log('pen drag', e.point);
      this.path.add(e.point);
    });
    this.up.subscribe((e) => {
      this.path.strokeColor = this.project.currentStyle.strokeColor;
      this.path.fillColor = this.project.currentStyle.fillColor;
      // (this.path as any).pair?.save('segments');
      // (this.path as any).pair?.save();
      if (this.smoothing) {
        this.path.smooth();
      }
      (this.path as any).pair?.doSave();
      (this.path as any).pair.editing = false;
    });
  }

  filterEvent(event: any) {
    if (event.event instanceof PointerEvent) {
      const te = event.event as PointerEvent;
      console.log('touch type', te.pointerType);
    }
    this.logger.log(
      'type: %s, pointerType: %s, classname: %s',
      event.event.type,
      // tslint:disable-next-line: no-string-literal
      (window['event'] as any).pointerType,
      Object.getPrototypeOf(event.event).constructor.name
    );
    return isMouse(event) || isPen(event);
  }
}
