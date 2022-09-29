import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  InjectionToken,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Hammer from 'hammerjs';
import { LogService } from 'log';
import * as paper from 'paper';
import { from, fromEvent, timer, ReplaySubject, Observable } from 'rxjs';
import {
  map,
  mergeMap,
  switchMap,
  shareReplay,
  filter,
  tap,
} from 'rxjs/operators';
import { CAPABILITIES } from '../system.service';
import { PenEvent } from '../user/vectors/classes/PenEvent';
import { PanTool } from '../user/vectors/tools/pan';
import { UndoStack } from '../user/vectors/tools/undo-stack';
import { AfterViewInit, Input } from '@angular/core';
import { IEnhancedPaper } from './IEnhancedPaper';
import { scan, bufferTime } from 'rxjs/operators';
import { IEnhancedScope } from './IEnhancedScope';
const BACKGROUND_LAYER = new InjectionToken('background-layer');
@Directive({
  selector: '[appPaper]',
  exportAs: 'appPaper',
  providers: [
    {
      provide: 'background-layer',
      multi: false,
      useFactory: () => {
        const pd = inject(PaperDirective);
        return (
          pd.project.getItem({
            className: 'Layer',
            name: 'background-layer',
          }) ||
          pd.project.insertLayer(
            0,
            new paper.Layer({
              name: 'background-layer',
              data: {
                ignore: true,
              },
            })
          )
        );
      },
    },
  ],
})
export class PaperDirective implements OnInit, AfterViewInit {
  constructor(
    @Optional()
    private el: ElementRef<HTMLCanvasElement>,
    private snackBar: MatSnackBar,
    private logger: LogService
  ) {}

  @Input()
  set canvas(value: HTMLCanvasElement) {
    this.el = new ElementRef(value);
  }
  get canvas(): HTMLCanvasElement {
    return this.el.nativeElement;
  }

  @Output()
  appPaperChange = new EventEmitter();

  @Output()
  projectChange = new ReplaySubject<IEnhancedPaper>(1);
  @Output()
  selectedItemsChange: Observable<paper.Item[]> = this.projectChange.pipe(
    tap((p) => console.log('project', p)),
    switchMap((p) => p.selectedItems$),
    shareReplay(1)
  );

  private _project!: IEnhancedPaper;
  public get project(): IEnhancedPaper {
    return this._project;
  }
  @Input()
  public set project(value: IEnhancedPaper) {
    if (value !== this._project) {
      this._project = value;
      this.projectChange.next(value);
    }
  }

  backgroundLayer!: paper.Layer;
  hammer!: HammerManager;

  resize$ = this.projectChange.pipe(
    switchMap((project) =>
      fromEvent(project.view, 'resize').pipe(shareReplay(1))
    ),
    shareReplay(1)
  );

  frame$ = this.projectChange.pipe(
    switchMap((project) => fromEvent(project.view, 'frame'))
  );

  fps$ = this.frame$.pipe(
    bufferTime(1000),
    map((frames) => frames.length)
  );

  private _scope: IEnhancedScope = new paper.PaperScope() as any;
  public get scope(): IEnhancedScope {
    return this._scope;
  }
  @Input()
  public set scope(value: IEnhancedScope) {
    this._scope = value;
  }

  ignore(fn: any, ...args: any[]) {
    let item: any;
    try {
      // this.scope.settings.insertItems = false;
      item = new fn(...args);
      item.data.ignore = true;
      // this.scope.settings.insertItems = true;
      return item;
    } finally {
      // if (item) {
      //   if (fn.name === 'Layer') {
      //     (item as paper.Layer).insertAbove(this.project.activeLayer);
      //   } else {
      //     this.project.activeLayer.insertChild(0, item);
      //   }
      // }
    }
  }

  setupHammer() {
    // this.logger.log('setting up hammer.js');
    this.hammer = new Hammer(this.el.nativeElement);
    this.hammer.get('pinch').set({ enable: true });
    this.setupPen();
    this.setupTouch();
  }

  setupPen() {
    if (CAPABILITIES.POINTER) {
      this.logger.log('setting up pointer events');
      const events = ['move', 'down', 'up'];
      const pointerevents = events.map((n) => `pointer${n}`);
      from(pointerevents)
        .pipe(
          mergeMap((n) =>
            fromEvent(this.el.nativeElement, n).pipe(
              map((e: any) => e as PointerEvent),
              map((event) => new PenEvent(event, this.point(event)))
            )
          )
        )
        .subscribe((e: any) => {
          this.scope.tool.emit(e.event.type, e);
        });
    }
  }

  setupTouch() {
    if (CAPABILITIES.TOUCH) {
      // this.logger.log('setting up touch events');
      const events = ['move', 'down', 'up'];
      const pointerevents = events.map((n) => `touch${n}`);
      from(pointerevents)
        .pipe(
          mergeMap((n) =>
            fromEvent(this.el.nativeElement, n).pipe(
              // TODO map this to a ToolEvent, or touch events can just be handled by the normal paper event listeners
              map((e: any) => e as TouchEvent)
            )
          )
        )
        .subscribe((e: any) => {
          this.scope.tool.emit(e.type, e);
        });

      // this.hammer.on('pan', (ev: any) => {
      //   const srcEvent = ev.srcEvent as PointerEvent;
      //   console.log('pan', ev);
      //   this.logger.log('pan', ev.srcEvent);
      //   this.snackBar.open(
      //     `pan ${srcEvent.type} ${srcEvent.pointerType} ${srcEvent.pressure}`
      //   );
      // });
      // this.hammer.on('pinch', (ev: any) => {
      //   const srcEvent = ev.srcEvent as PointerEvent;
      //   console.log('pinch', ev);
      //   this.snackBar.open(`pinch ${srcEvent.type}`);
      // });
    }
  }

  ngOnInit(): void {
    if (!this.canvas) {
      this.logger.log('no canvas! setting up fake canvas?');
      this.scope.setup(new paper.Size(560, 560));
      this.canvas = this.scope.project.view.element;
    } else {
      this.scope.setup(this.canvas);
    }
    this.scope.actions = [];
    this.setupHammer();

    // const hammer = new Hammer(this.el.nativeElement);

    this.project = this.scope.project as any;
    this.project.activate();
    this.scope.project = this.project as any;
    // this.project.currentStyle.strokeWidth = 5;

    // CREATE BACKGROUND LAYER
    this.scope.settings.insertItems = false;

    this.backgroundLayer = new paper.Layer() as any;
    this.backgroundLayer.data.ignore = true;
    this.backgroundLayer.name = 'background';
    (this.project as any).insertLayer(0, this.backgroundLayer);
    this.scope.settings.insertItems = true;
  }

  ngAfterViewInit() {
    // update the view size after a delay to account for UI loading time
    timer(1000).subscribe(() => this.updateViewSize());
  }

  updateViewSize() {
    if (!this.project) {
      console.warn('scope not set on CanvasDirective');
      return;
    }
    // this.logger.log('updateViewSize()');
    let tempWidth = 0;
    let tempHeight = 0;

    // If we don't change the view size at all, paper.js doesn't seem to update
    // This solves an issue that occurs on first loading a default size canvas

    tempWidth =
      this.project.view.element.parentElement?.scrollWidth ||
      this.project.view.element.scrollWidth;

    this.project.view.viewSize.width -= this.project.view.viewSize.width;
    this.project.view.viewSize.width = tempWidth;

    // if (this.project.view.element.parentElement !== null) {
    //   tempHeight = this.project.view.element.parentElement.scrollHeight;
    // } else {
    //   tempHeight = this.project.view.element.scrollHeight;
    // }
    tempHeight =
      this.project.view.element.parentElement?.scrollHeight ||
      this.project.view.element.scrollHeight;
    this.project.view.viewSize.height -= this.project.view.viewSize.height;
    this.project.view.viewSize.height = tempHeight;
    this.drawBackground();
  }

  drawBackground() {
    if (this.backgroundLayer) {
      this.logger.log('updating background layer');
      const rect =
        this.backgroundLayer.getItem({
          name: 'background-color',
        }) || new paper.Shape.Rectangle(this.project.view.viewSize);
      rect.name = 'background-color';
      rect.fillColor = new paper.Color(1, 1, 1);
      rect.strokeColor = null;
      rect.data.ignore = true;
      this.backgroundLayer.insertChild(0, rect);

      // rect.fitBounds(this.project.view.bounds);
      rect.bounds = this.project.view.bounds;
    }
  }

  @HostListener('window:resize', ['$event'])
  onHostResize(event?: any) {
    this.logger.log('onHostResize');
    this.updateViewSize();
  }

  @HostListener('mouseenter')
  onHostMouseEnter(event?: any) {
    // this.scope.activate();
    // this.project.activate();
  }

  @HostListener('wheel', ['$event'])
  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event: any) {
    const point = this.scope.view.viewToProject(
      new paper.Point(event.offsetX, event.offsetY)
    );
    this.scope.view.emit('mousewheel', { event, point });
    this.scope.tool?.emit('mousewheel', { event, point });
    this.drawBackground();
    event.preventDefault();
  }

  onViewBounds() {
    console.log('view bounds');
  }

  private point(event: { offsetX: number; offsetY: number }) {
    return this.project.view.viewToProject(
      new paper.Point(event.offsetX, event.offsetY)
    );
  }
}
