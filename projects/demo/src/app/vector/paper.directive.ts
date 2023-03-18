import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { after, around } from 'aspect-ts';
import * as Hammer from 'hammerjs';
import { LogService } from 'log';
import * as paper from 'paper';
import { from, fromEvent, Observable, ReplaySubject, timer } from 'rxjs';
import {
  bufferTime,
  map,
  mergeMap,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CAPABILITIES } from '../system.service';
import { PenEvent } from '../user/vectors/classes/PenEvent';
import { IEnhancedPaper } from './IEnhancedPaper';
import { IEnhancedScope } from './IEnhancedScope';
import { PaperScope } from './paper-scope.directive';

@Directive()
export class PaperBase implements OnInit, AfterViewInit {
  @Output()
  projectChange = new ReplaySubject<IEnhancedPaper>(1);

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
  constructor(
    @Optional()
    protected el: ElementRef<HTMLCanvasElement>,
    protected snackBar: MatSnackBar,
    protected logger: LogService,
    @Inject(PaperScope)
    protected ps: PaperScope & IEnhancedScope & paper.PaperScope
  ) {}

  ngOnInit(): void {
    if (!this.canvas) {
      this.logger.log('no canvas! setting up fake canvas?');
      this.scope.setup(new paper.Size(560, 560));
      this.canvas = this.scope.project.view.element;
    } else {
      this.scope.setup(this.canvas);
    }
    this.scope.actions = [];
    this.project = this.scope.project as any;
    this.project.activate();
    this.scope.project = this.project as any;

    after(this.project.view, 'scrollBy', () => {
      this.updateViewSize();
    });
  }

  ngAfterViewInit() {
    // update the view size after a delay to account for UI loading time
    timer(1000).subscribe(() => this.updateViewSize());
  }

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

  private _scope: IEnhancedScope = new paper.PaperScope() as any;
  public get scope(): IEnhancedScope {
    return this._scope as IEnhancedScope;
  }
  @Input()
  public set scope(value: IEnhancedScope) {
    this._scope = value;
  }

  @Input()
  set canvas(value: HTMLCanvasElement) {
    this.el = new ElementRef(value);
  }
  get canvas(): HTMLCanvasElement {
    return this.el.nativeElement;
  }

  updateViewSize() {}
}

@Directive({
  selector: '[appPaper]',
  exportAs: 'appPaper',
})
export class PaperDirective extends PaperBase implements OnInit, AfterViewInit {
  backgroundLayer!: paper.Layer;
  hammer!: HammerManager;

  @Output()
  selectedItemsChange: Observable<paper.Item[]> = this.projectChange.pipe(
    // tap((p) => console.log('project', p)),
    switchMap((p) => p.selectedItems$),
    shareReplay(1)
  );

  newIgnored(fn: any, ...args: any[]) {
    let item: any;
    try {
      item = new fn(...args);
      item.data.ignore = true;
      return item;
    } finally {
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
          this.scope.view.emit(e.event.type, e);
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
    super.ngOnInit();
    this.setupHammer();
    timer(100, 10).subscribe((t) => this.drawSpinner());
    // this.project.currentStyle.strokeWidth = 5;

    // CREATE BACKGROUND LAYER
    this.scope.settings.insertItems = false;

    this.backgroundLayer = new paper.Layer() as any;
    this.backgroundLayer.data.ignore = true;
    this.backgroundLayer.name = 'background';
    (this.project as any).insertLayer(0, this.backgroundLayer);
    this.scope.settings.insertItems = true;
  }

  updateViewSize() {
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

    tempHeight =
      this.project.view.element.parentElement?.scrollHeight ||
      this.project.view.element.scrollHeight;
    this.project.view.viewSize.height -= this.project.view.viewSize.height;
    this.project.view.viewSize.height = tempHeight;
    this.onViewBounds();
  }

  drawSpinner() {
    return;
    const doUpdateRotation = (spinner: paper.Shape.Rectangle) => {
      spinner.rotation += 1;
    };

    const getOrBuildSpinner = () => {
      let found = this.project.getItem({ name: 'drawSpinner' });

      if (!found) {
        // If there's no spinner
        // build new one, hopefully the only one
        const spinner = this.backgroundLayer.addChild(
          new paper.Path.Rectangle(
            new paper.Rectangle(
              new paper.Point(0, 0),
              new paper.Point(100, 100)
            )
          )
        );
        // name it drawSpinner
        spinner.name = 'drawSpinner';
        found = spinner;
      }
      return found;
    };
    this.scope.activate();
    if (!this.project) {
      return;
    }

    const spinner = getOrBuildSpinner();
    if (spinner) {
      doUpdateRotation(spinner as any);
    }
  }

  drawBackground() {
    if (this.backgroundLayer) {
      // this.logger.log('updating background layer');
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
    this.logger.verbose('onHostResize');
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
    this.onViewBounds();
    event.preventDefault();
  }

  public viewBounds$ = new ReplaySubject(1);
  onViewBounds() {
    // console.log('view bounds');
    this.viewBounds$.next(this.project.view.bounds);
    this.drawBackground();
  }

  private point(event: { offsetX: number; offsetY: number }) {
    return this.project.view.viewToProject(
      new paper.Point(event.offsetX, event.offsetY)
    );
  }
}
