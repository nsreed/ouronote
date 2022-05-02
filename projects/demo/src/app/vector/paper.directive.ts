import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Hammer from 'hammerjs';
import { LogService } from 'log';
import * as paper from 'paper';
import { from, fromEvent, timer } from 'rxjs';
import { map, mergeMap, switchMap, shareReplay } from 'rxjs/operators';
import { CAPABILITIES } from '../system.service';
import { PenEvent } from '../user/vectors/classes/PenEvent';
import { PanTool } from '../user/vectors/tools/pan';
import { UndoStack } from '../user/vectors/tools/undo-stack';
import { AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appPaper]',
  exportAs: 'appPaper',
})
export class PaperDirective implements OnInit, AfterViewInit {
  constructor(
    private el: ElementRef<HTMLCanvasElement>,
    private snackBar: MatSnackBar,
    private logger: LogService
  ) {}

  get canvas(): HTMLCanvasElement {
    return this.el.nativeElement;
  }

  @Output()
  appPaperChange = new EventEmitter();

  projectChange = new EventEmitter<paper.Project>();

  private _project!: paper.Project;
  public get project(): paper.Project {
    return this._project;
  }
  public set project(value: paper.Project) {
    if (value !== this._project) {
      this._project = value;
      this.projectChange.emit(value);
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

  scope: paper.PaperScope & UndoStack = new paper.PaperScope() as any;

  ignore(fn: any, ...args: any[]) {
    let item: any;
    try {
      // this.scope.settings.insertItems = false;
      item = new fn(...args);
      item.data.ignore = true;
      // this.scope.settings.insertItems = true;
      return item;
    } finally {
      if (item) {
        if (fn.name === 'Layer') {
          (item as paper.Layer).insertAbove(this.project.activeLayer);
        } else {
          this.project.activeLayer.insertChild(0, item);
        }
      }
    }
  }

  setupHammer() {
    this.logger.log('setting up hammer.js');
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
              map((e) => e as PointerEvent),
              map((event) => new PenEvent(event, this.point(event)))
            )
          )
        )
        .subscribe((e) => {
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
              map((e) => e as TouchEvent)
            )
          )
        )
        .subscribe((e) => {
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
    this.setupHammer();
    this.scope.setup(this.el.nativeElement);
    this.scope.actions = [];

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

    this.resize$.subscribe(() => {
      console.log('PROJECT CANVAS RESIZE');
    });
  }

  updateViewSize() {
    if (!this.project) {
      console.warn('scope not set on CanvasDirective');
      return;
    }
    this.logger.log('updateViewSize()');
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
  }

  @HostListener('window:resize', ['$event'])
  onHostResize(event?: any) {
    console.log('host resize');
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
