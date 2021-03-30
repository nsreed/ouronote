import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import * as paper from 'paper';
import { fromEvent, timer } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { propertyChange$ } from './classes/paper-chain';
import { EraserTool } from './tools/eraser';
import { EyedropperTool } from './tools/eyedropper';
import { MoveTool } from './tools/move';
import { PanTool } from './tools/pan';
import { PenTool } from './tools/pen';
import { LassoSelectTool, RectangleSelectTool } from './tools/select';
@Directive({
  selector: '[appPaper]',
  exportAs: 'appPaper',
})
export class PaperDirective implements OnInit {
  constructor(private el: ElementRef<HTMLCanvasElement>) {}
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

  resize$ = this.projectChange.pipe(
    switchMap((project) => fromEvent(project.view, 'resize'))
  );

  scope = new paper.PaperScope();
  tool$ = propertyChange$(this.scope, 'tool').pipe(shareReplay(1));

  public pen = new PenTool(this.scope as any);
  public eraser = new EraserTool(this.scope as any);
  public select = new LassoSelectTool(this.scope as any);
  public areaSelect = new RectangleSelectTool(this.scope as any);
  public pan = new PanTool(this.scope as any);
  public move = new MoveTool(this.scope as any);
  public eyedropper = new EyedropperTool(this.scope as any);

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

  ngOnInit(): void {
    this.scope.setup(this.el.nativeElement);

    this.project = this.scope.project as any;

    this.project.activate();
    this.scope.project = this.project as any;
    this.project.currentStyle = new this.scope.Style({}) as any;
    this.project.currentStyle.strokeColor = new this.scope.Color(
      1,
      0,
      0
    ) as any;
    this.project.currentStyle.strokeWidth = 5;

    // update the view size after a delay to account for UI loading time
    timer(1000).subscribe(() => this.updateViewSize());

    this.resize$.subscribe(() => {
      console.log('PROJECT CANVAS RESIZE');
    });

    // CREATE BACKGROUND LAYER
    this.scope.settings.insertItems = false;
    this.backgroundLayer = new paper.Layer() as any;
    this.backgroundLayer.data.ignore = true;
    this.backgroundLayer.name = 'background';
    (this.project as any).insertLayer(0, this.backgroundLayer);
    this.scope.settings.insertItems = true;
  }

  updateViewSize() {
    if (!this.project) {
      console.warn('scope not set on CanvasDirective');
      return;
    }
    // If we don't change the view size at all, paper.js doesn't seem to update
    // This solves an issue that occurs on first loading a default size canvas
    this.project.view.viewSize.width += 0.0001;
    this.project.view.viewSize.width =
      this.project.view.element.parentElement?.scrollWidth ||
      this.project.view.element.scrollWidth;
    this.project.view.viewSize.height =
      this.project.view.element.parentElement?.scrollHeight ||
      this.project.view.element.scrollHeight;
    this.onViewBounds();
  }

  @HostListener('window:resize', ['$event'])
  onHostResize(event?: any) {
    this.updateViewSize();
  }

  @HostListener('mouseenter')
  onHostMouseEnter(event?: any) {
    // this.scope.activate();
    // this.project.activate();
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event: WheelEvent) {
    // console.log(event);
    const point = this.scope.view.viewToProject(
      new paper.Point(event.offsetX, event.offsetY)
    );
    this.scope.view.emit('mousewheel', { event, point });

    this.scope.tool.emit('mousewheel', { event, point });
    event.preventDefault();
  }

  onViewBounds() {
    console.log('view bounds');
  }
}
