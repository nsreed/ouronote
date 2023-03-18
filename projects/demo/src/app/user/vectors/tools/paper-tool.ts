import { LogService } from 'log';
import * as paper from 'paper';
import { fromEvent, Observable, of, from, timer } from 'rxjs';
import {
  filter,
  flatMap,
  map,
  shareReplay,
  switchMap,
  tap,
  mergeMap,
  mergeMapTo,
} from 'rxjs/operators';
import { IEnhancedPaper } from '../../../vector/IEnhancedPaper';
import { IEnhancedScope } from '../../../vector/IEnhancedScope';
import { PenEvent } from '../classes/PenEvent';
import { propertyChange$ } from '../functions/paper-chain';
import { EventEmitter } from '@angular/core';
import { timeout, take, takeUntil, mergeWith } from 'rxjs/operators';

export type ToolSchema = {
  name?: string;
};

export class ToolSchematic implements ToolSchema {
  name!: string;
  constructor(public target?: any) {}
}

export class VectorTool extends paper.Tool {
  activate$!: EventEmitter<any>;
  schematic = new ToolSchematic();
  // FIXME class names get mangled by production build, stop being lazy
  // @Reflect.metadata('type', 'string')
  name = Object.getPrototypeOf(this).constructor.name.replace(/tool/gi, '');
  readonly logger = LogService.getLogger(`${this.name}`);
  static stack: any[] = [];

  category = 'none';

  get isActive(): boolean {
    return this.scope.tool === (this as VectorTool);
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

  get effectiveStyle(): paper.Style {
    return {
      ...((this.project?.currentStyle as any)._values || {}),
      ...((this as any).style?._values || {}),
    };
  }

  constructor(public readonly scope: IEnhancedScope) {
    super();
    this.logger.name = this.name;

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
  matIconName?: string;

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
  ).pipe(
    tap(this.logger.eventTap(`mousemove`)),
    filter((e: any) => this.filterEvent(e))
  );
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
  ).pipe(
    tap(this.logger.eventTap(`mousedrag`)),
    filter((e: any) => this.filterEvent(e))
  );
  up: Observable<paper.ToolEvent> = fromEvent<paper.ToolEvent>(
    this,
    'mouseup'
  ).pipe(filter((e: any) => this.filterEvent(e)));
  click = this.down.pipe<paper.ToolEvent>(
    mergeMap(() => this.up.pipe(takeUntil(this.drag), take(1)))
  );
  downHold = this.down
    .pipe(
      mergeMap((e) => timer(0, 100).pipe(map(() => Date.now() - e.timeStamp)))
    )
    .pipe(takeUntil(this.drag.pipe(mergeWith(this.up))))
    .pipe(map((e) => e));

  wheel: Observable<WheelEvent | any> = fromEvent<{
    event: WheelEvent;
    point: paper.Point;
  }>(this, 'mousewheel');
  heldTime = this.down.pipe(
    switchMap((e: paper.ToolEvent) =>
      timer(0, 1).pipe(
        takeUntil(this.up.pipe(mergeWith(this.drag), mergeWith(this.move)))
      )
    )
  );

  keydown: Observable<paper.KeyEvent> = fromEvent<paper.KeyEvent>(
    this,
    'keydown'
  );
  keyup: Observable<paper.KeyEvent> = fromEvent<paper.KeyEvent>(this, 'keyup');

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
        i.selected = false; // TODO fix selection change emitter to listen to remove events
        i.remove();
      });
  });

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
