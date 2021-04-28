import { Tool, ToolEvent } from 'paper';
import { fromEvent } from 'rxjs';
import { after$ } from '../../../functions/aspect-rx';
import * as paper from 'paper';
import { filter, switchMapTo, takeUntil, tap } from 'rxjs/operators';
import { LogService } from '../../../../../../log/src/lib/log.service';
import { EventEmitter } from '@angular/core';

export class VectorTool extends Tool {
  get properties() {
    return Object.getPrototypeOf(this).___PROPERTIES || [];
  }
  pointerEvent$ = new EventEmitter<PointerEvent>();

  pointer = fromEvent<PointerEvent>(this, 'pointermove');

  drag = fromEvent<paper.ToolEvent>(this, 'mousedrag').pipe(
    filter((e) => this.filterEvent(e))
  );
  down = fromEvent<paper.ToolEvent>(this, 'mousedown').pipe(
    filter((e) => this.filterEvent(e)),
    tap((e) => this.activateDrawLayer())
  );
  up = fromEvent<paper.ToolEvent>(this, 'mouseup').pipe(
    filter((e) => this.filterEvent(e))
  );
  move = fromEvent<paper.ToolEvent>(this, 'mousemove').pipe(
    filter((e) => this.filterEvent(e))
  );

  wheel = fromEvent<{ event: WheelEvent; point: paper.Point }>(
    this,
    'mousewheel'
  );

  keydown = fromEvent<paper.KeyEvent>(this, 'keydown');
  keyup = fromEvent<paper.KeyEvent>(this, 'keyup');

  click = this.up.pipe(filter((e) => e.delta.length === 0));

  // FIXME class names get mangled by production build, stop being lazy
  name = Object.getPrototypeOf(this).constructor.name.replace(/tool/gi, '');

  readonly logger = LogService.getLogger(`${this.name}`);
  // touchDown = this.down.pipe(filter((e: any) => e.event instanceof TouchEvent));

  get project() {
    return this.scope.project as paper.Project;
  }

  constructor(public readonly scope: paper.PaperScope) {
    super();
    // this.touchDown.subscribe((e) => {
    //   console.log('touch down', e);
    // });

    this.wheel.subscribe((e) => {
      const zoomDelta = e.event.deltaY;
      const viewPoint = this.scope.view.projectToView(e.point);
      const zoomRate = 0.03 * this.scope.view.zoom;
      this.scope.view.zoom += zoomDelta > 0 ? -zoomRate : zoomRate;
      const zoomPoint = this.scope.view.viewToProject(viewPoint);
      const zoomOffset = (e.point as any)
        .subtract(zoomPoint)
        .multiply(zoomDelta > 0 ? -1 : 1);
      // console.log(zoomOffset);
      (this.scope.view as any).scrollBy(zoomOffset);
    });
    this.setup();
    this.pointer.subscribe((e) =>
      this.logger.log('tool pointer event', e.pointerType)
    );
  }
  protected setup() {}

  activate() {
    super.activate();
  }

  activateDrawLayer() {
    if (this.scope.project.activeLayer.data.ignore) {
      const drawLayer = this.project.getItem({
        className: 'Layer',
        data: {
          ignore: undefined,
        },
      }) as paper.Layer;
      if (drawLayer) {
        drawLayer.activate();
      } else {
        const newDrawLayer = new paper.Layer();
      }
    }
  }

  protected filterEvent(event: any) {
    return true;
  }
}
