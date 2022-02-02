import { Tool, ToolEvent } from 'paper';
import { fromEvent, of, ReplaySubject } from 'rxjs';
import { after$ } from '../../../functions/aspect-rx';
import * as paper from 'paper';
import {
  filter,
  switchMap,
  switchMapTo,
  takeUntil,
  tap,
  shareReplay,
} from 'rxjs/operators';
import { LogService } from '../../../../../../log/src/lib/log.service';
import { EventEmitter } from '@angular/core';
import { PenEvent } from '../classes/PenEvent';
import { propertyChange$ } from '../functions/paper-chain';
import { UndoStack } from './undo-stack';

export class VectorTool extends Tool {
  get properties() {
    return Object.getPrototypeOf(this).___PROPERTIES || [];
  }

  get project() {
    return this.scope.project as paper.Project;
  }

  constructor(public readonly scope: paper.PaperScope & UndoStack) {
    super();

    this.wheel.subscribe((e) => {
      const zoomDelta = e.event.deltaY;
      const viewPoint = this.scope.view.projectToView(e.point);
      const zoomRate = 0.03 * this.scope.view.zoom;
      this.scope.view.zoom += zoomDelta > 0 ? -zoomRate : zoomRate;
      const zoomPoint = this.scope.view.viewToProject(viewPoint);
      const zoomOffset = (e.point as any)
        .subtract(zoomPoint)
        .multiply(zoomDelta > 0 ? 0 : 1);
      (this.scope.view as any).scrollBy(zoomOffset);
    });

    this.setup();

    this.selectedItems$.subscribe((si) => console.log(si));
    // this.pointerMove.subscribe((e: PenEvent) =>
    //   this.logger.log('tool pointer event', e.point)
    // );
    // this.touch.subscribe((e) => this.logger.log('tool touch event', e.touches));
  }
  static stack: any[] = [];
  static lastActive?: VectorTool;
  private isPointerDown = false;
  icon = 'hand-spock';

  /** Determines whether the tool can be activated */
  enabled$ = of(true);

  /** Determines whether the tool should be shown */
  show$ = of(true);

  /** The scope's current project */
  project$ = propertyChange$(this.scope, 'project').pipe(shareReplay(1));
  selectedItems$ = this.project$.pipe(
    switchMap((project) => propertyChange$(project, 'selectedItems')),
    shareReplay(1)
  );

  propertyNames: string[] = [];

  pointerDown = fromEvent<PenEvent>(this, 'pointerdown').pipe(
    tap((e) => (this.isPointerDown = true)),
    filter((e) => this.filterEvent(e))
  );
  pointerUp = fromEvent<PenEvent>(this, 'pointerup').pipe(
    tap((e) => (this.isPointerDown = false)),
    filter((e) => this.filterEvent(e))
  );
  pointerMove = fromEvent<PenEvent>(this, 'pointermove').pipe(
    filter((e) => this.filterEvent(e))
  );
  pointerDrag = this.pointerMove.pipe(
    filter((e) => this.filterEvent(e) && this.isPointerDown)
  );

  touchMove = fromEvent<TouchEvent>(this, 'touchdown');
  touchStart = fromEvent<TouchEvent>(this, 'touchstart');
  touchEnd = fromEvent<TouchEvent>(this, 'touchend');

  move = fromEvent<paper.ToolEvent>(this, 'mousemove').pipe(
    filter((e) => this.filterEvent(e))
  );
  down = fromEvent<paper.ToolEvent>(this, 'mousedown').pipe(
    filter((e) => this.filterEvent(e)),
    tap((e) => this.activateDrawLayer())
  );
  drag = fromEvent<paper.ToolEvent>(this, 'mousedrag').pipe(
    filter((e) => this.filterEvent(e))
  );
  up = fromEvent<paper.ToolEvent>(this, 'mouseup').pipe(
    filter((e) => this.filterEvent(e))
  );
  click = fromEvent<paper.ToolEvent>(this, 'mouseclick');

  wheel = fromEvent<{ event: WheelEvent; point: paper.Point }>(
    this,
    'mousewheel'
  );

  keydown = fromEvent<paper.KeyEvent>(this, 'keydown');
  keyup = fromEvent<paper.KeyEvent>(this, 'keyup');

  // FIXME class names get mangled by production build, stop being lazy
  name = Object.getPrototypeOf(this).constructor.name.replace(/tool/gi, '');

  readonly logger = LogService.getLogger(`${this.name}`);
  protected setup() {
    this.pointerDown.subscribe(() => (this.isPointerDown = true));
    this.pointerUp.subscribe(() => (this.isPointerDown = false));
  }

  activate() {
    if (this.scope) {
      if (this.scope.tool !== this) {
        VectorTool.lastActive = this.scope.tool as VectorTool;
      }
    }
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
