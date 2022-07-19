import { Tool, ToolEvent } from 'paper';
import { fromEvent, of, ReplaySubject, Observable } from 'rxjs';
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
import { IEnhancedPaper } from '../../../vector/IEnhancedPaper';
import { map } from 'rxjs/operators';
import { IEnhancedScope } from '../../../vector/IEnhancedScope';

export class VectorTool extends Tool {
  static stack: any[] = [];

  category = 'none';

  get isActive() {
    return this.scope.tool === this;
  }

  get enabled() {
    return true;
  }

  get properties() {
    return Object.getPrototypeOf(this).___PROPERTIES || [];
  }

  get project() {
    return this.scope?.project as paper.Project;
  }

  constructor(public readonly scope: IEnhancedScope) {
    super();

    this.wheel.subscribe((e: any) => {
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
    // this.selectedItems$.subscribe((si) => console.log(si));
    // this.pointerMove.subscribe((e: PenEvent) =>
    //   this.logger.log('tool pointer event', e.point)
    // );
    // this.touch.subscribe((e: any) => this.logger.log('tool touch event', e.touches));
  }
  private isPointerDown = false;
  icon = 'hand-spock';

  /** Determines whether the tool can be activated */
  enabled$ = of(true);

  /** Determines whether the tool should be shown */
  show$ = of(true);

  /** The scope's current project */
  project$ = propertyChange$(this.scope, 'project').pipe(
    map((p) => p as IEnhancedPaper),
    shareReplay(1)
  ) as Observable<IEnhancedPaper>;
  selectedItems$ = this.project$.pipe(
    switchMap((project: IEnhancedPaper) => project.selectedItems$)
  );

  propertyNames: string[] = [];

  pointerDown: Observable<PenEvent> = fromEvent<PenEvent>(
    this,
    'pointerdown'
  ).pipe(
    tap((e: any) => (this.isPointerDown = true)),
    filter((e: any) => this.filterEvent(e))
  );
  pointerUp: Observable<PenEvent> = fromEvent<PenEvent>(this, 'pointerup').pipe(
    tap((e: any) => (this.isPointerDown = false)),
    filter((e: any) => this.filterEvent(e))
  );
  pointerMove: Observable<PenEvent> = fromEvent<PenEvent>(
    this,
    'pointermove'
  ).pipe(filter((e: any) => this.filterEvent(e)));
  pointerDrag: Observable<PenEvent> = this.pointerMove.pipe(
    filter((e: any) => this.filterEvent(e) && this.isPointerDown)
  );

  touchMove: Observable<TouchEvent> = fromEvent<TouchEvent>(this, 'touchdown');
  touchStart: Observable<TouchEvent> = fromEvent<TouchEvent>(
    this,
    'touchstart'
  );
  touchEnd: Observable<TouchEvent> = fromEvent<TouchEvent>(this, 'touchend');

  move: Observable<paper.ToolEvent> = fromEvent<paper.ToolEvent>(
    this,
    'mousemove'
  ).pipe(filter((e: any) => this.filterEvent(e)));
  down: Observable<paper.ToolEvent> = fromEvent<paper.ToolEvent>(
    this,
    'mousedown'
  ).pipe(
    filter((e: any) => this.filterEvent(e)),
    tap((e: any) => this.activateDrawLayer())
  );
  drag: Observable<paper.ToolEvent> = fromEvent<paper.ToolEvent>(
    this,
    'mousedrag'
  ).pipe(filter((e: any) => this.filterEvent(e)));
  up: Observable<paper.ToolEvent> = fromEvent<paper.ToolEvent>(
    this,
    'mouseup'
  ).pipe(filter((e: any) => this.filterEvent(e)));
  click: Observable<paper.ToolEvent> = fromEvent<paper.ToolEvent>(
    this,
    'mouseclick'
  );

  wheel: Observable<WheelEvent | any> = fromEvent<{
    event: WheelEvent;
    point: paper.Point;
  }>(this, 'mousewheel');

  keydown: Observable<paper.KeyEvent> = fromEvent<paper.KeyEvent>(
    this,
    'keydown'
  );
  keyup: Observable<paper.KeyEvent> = fromEvent<paper.KeyEvent>(this, 'keyup');

  // FIXME class names get mangled by production build, stop being lazy
  name = Object.getPrototypeOf(this).constructor.name.replace(/tool/gi, '');

  keyDel = this.keyup.pipe(
    filter((e: any) => {
      return (
        !['textarea', 'input'].includes(e.event.target.localName) &&
        e.key === 'delete'
      );
    })
  );
  keyDelSub = this.keyDel.subscribe((e: any) => {
    this.scope.project
      .getItems({
        selected: true,
        match: (i: paper.Item) => i.className !== 'Layer',
      })
      .forEach((i) => {
        i.remove();
      });
  });

  readonly logger = LogService.getLogger(`${this.name}`);
  protected setup() {
    this.pointerDown.subscribe(() => (this.isPointerDown = true));
    this.pointerUp.subscribe(() => (this.isPointerDown = false));
  }

  activate() {
    if (this.scope) {
      if (!this.enabled) {
        console.error('tried to activate a disabled tool');
        return;
      }
      if (this.scope.tool !== this) {
        this.scope.lastActiveTool = this.scope.tool;
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
        newDrawLayer.activate();
      }
    }
  }

  protected filterEvent(event: any) {
    return true;
  }
}
