import {
  PaperMouseWheelEvent,
  PaperToolWheelEvent,
} from './classes/paper-mouse-wheel-event';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  OnInit,
} from '@angular/core';
import * as paper from 'paper';
import { Color, Project, PaperScope } from 'paper';
import { fromEvent, from, Observable } from 'rxjs';
import {
  mergeAll,
  tap,
  map,
  distinct,
  switchMapTo,
  switchMap,
} from 'rxjs/operators';
import { after } from 'aspect-ts';
import { PenTool } from './tools/pen';
import { EraserTool } from './tools/eraser';
import { SelectTool } from './tools/select';
@Directive({
  selector: '[appPaper]',
  exportAs: 'appPaper',
})
export class PaperDirective implements OnInit {
  constructor(private el: ElementRef<HTMLCanvasElement>) {
    console.log('paper.directive', this);

    this.toolWheel.subscribe(console.log);
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

  resize$ = this.projectChange.pipe(
    switchMap((project) => fromEvent(project.view, 'resize'))
  );

  scope = new paper.PaperScope();

  public tool = new paper.Tool();
  public pen = new PenTool(this.scope);
  public eraser = new EraserTool(this.scope);
  public select = new SelectTool(this.scope);

  @Output()
  toolDown$ = new EventEmitter<paper.ToolEvent>();
  @Output()
  toolUp$ = new EventEmitter<paper.ToolEvent>();
  @Output()
  toolDrag$ = new EventEmitter<paper.ToolEvent>();
  @Output()
  toolMove$ = new EventEmitter<paper.ToolEvent>();
  @Output()
  toolWheel$ = new EventEmitter<PaperToolWheelEvent>();

  private toolMove = fromEvent<paper.ToolEvent>(this.tool, 'mousemove').pipe(
    // tap((event) => this.beforeEach(event)),
    tap((event) => this.toolMove$.emit(event))
    // tap((event) => this.afterEach(event))
  );
  private toolDown = fromEvent<paper.ToolEvent>(this.tool, 'mousedown').pipe(
    tap((event) => this.beforeTool(event)),
    tap((event) => this.beforeEach(event)),
    tap((event) => this.toolDown$.emit(event)),
    tap((event) => this.afterEach(event))
  );
  private toolDrag = fromEvent<paper.ToolEvent>(this.tool, 'mousedrag').pipe(
    tap((event) => this.beforeEach(event)),
    tap((event) => this.toolDrag$.emit(event)),
    tap((event) => this.afterEach(event))
  );
  private toolUp = fromEvent<paper.ToolEvent>(this.tool, 'mouseup').pipe(
    tap((event) => this.beforeEach(event)),
    tap((event) => this.toolUp$.emit(event)),
    tap((event) => this.afterEach(event)),
    tap((event) => this.afterTool(event))
  );

  private toolWheel = fromEvent<PaperToolWheelEvent>(
    this.tool,
    'mousewheel'
  ).pipe(
    tap((event) => this.beforeEach(event as any)),
    tap((event) => this.toolWheel$.emit(event as any)),
    tap((event) => this.afterEach(event as any)),
    tap((event) => this.afterTool(event as any))
  );

  data$ = this.toolUp.pipe(
    map(() => this.project.exportJSON()),
    distinct()
  );
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

  beforeTool(event: paper.ToolEvent) {
    console.log('beforeTool', event);
  }

  // TODO this might be unnecessary for anything except re-drawing grid between events
  beforeEach(event: paper.ToolEvent) {
    // console.log('beforeEach', event);
  }

  afterEach(event: paper.ToolEvent) {
    // console.log('afterEach', event);
  }

  afterTool(event: paper.ToolEvent) {
    console.log('afterTool', event);
  }

  ngOnInit(): void {
    // this.scope.install(this.el.nativeElement);
    // this.project = new this.scope.Project(this.el.nativeElement) as any;
    this.scope.setup(this.el.nativeElement);
    // this.ignore.setup(new this.ignore.Size(10, 10));
    this.project = this.scope.project as any;
    // this.project.exportJSON = () => {
    //   return '';
    // };
    this.project.activate();
    this.scope.tools.push(this.tool);
    this.tool.activate();
    this.scope.project = this.project as any;
    this.project.currentStyle = new this.scope.Style({}) as any;
    this.project.currentStyle.strokeColor = new this.scope.Color(
      1,
      0,
      0
    ) as any;
    this.project.currentStyle.strokeWidth = 5;
    [this.toolDown, this.toolUp, this.toolDrag, this.toolMove].forEach((e$) => {
      e$.subscribe();
    });
    this.updateViewSize();
    this.resize$.subscribe(() => {
      console.log('PROJECT CANVAS RESIZE');
    });
  }

  updateViewSize() {
    if (!this.project) {
      console.warn('scope not set on CanvasDirective');
      return;
    }
    // If we don't change the view size at all, paper.js doesn't seem to update
    // This solves an issue that occurs on first loading a default size canvas
    // FIXME cursor offset
    this.project.view.viewSize.width += 0.0001;
    this.project.view.viewSize.width = this.project.view.element.scrollWidth;
    this.project.view.viewSize.height = this.project.view.element.scrollHeight;
  }

  @HostListener('window:resize', ['$event'])
  onHostResize(event?: any) {
    this.updateViewSize();
  }

  @HostListener('mouseenter')
  onHostMouseEnter(event?: any) {
    this.scope.activate();
    this.project.activate();
    // this.pen.activate();
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event: WheelEvent) {
    console.log(event);
    this.tool.emit('mousewheel', new PaperToolWheelEvent(event));
    event.preventDefault();
  }
}
