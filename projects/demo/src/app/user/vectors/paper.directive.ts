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
import { mergeAll, tap, map, distinct } from 'rxjs/operators';
import { after } from 'aspect-ts';
@Directive({
  selector: '[appPaper]',
  exportAs: 'appPaper',
})
export class PaperDirective implements OnInit {
  constructor(private el: ElementRef<HTMLCanvasElement>) {
    // (this.tool as any).exportJSON = () => '';
    // paper.settings.insertItems = false;
    // this.ignored.settings.insertItems = false;
    // this.scope.install(this.scopeObject);

    // this.ignored.install(this.ignoredScopeObject);
    // const ignoredProps = Object.getOwnPropertyDescriptors(
    //   this.ignoredScopeObject
    // );
    // Object.keys(ignoredProps)
    //   .map((k) => ({
    //     key: k,
    //     descriptor: ignoredProps[k],
    //   }))
    //   .filter(
    //     (kd) =>
    //       typeof kd.descriptor.value === 'function' &&
    //       /^[A-Z]/.test(kd.descriptor.value.name) &&
    //       /^[A-Z]/.test(kd.key)
    //   )
    //   .forEach((kd) => {
    //     console.log('  descriptor %s', kd.key, kd.descriptor);
    //     const c = kd.descriptor.value as any;
    //     // TODO this interferes with some kind of paper internals....
    //     // after(this.ignoredScopeObject, kd.key, (...args: any) => {
    //     //   console.log('  after construct', kd.key, args);
    //     // });
    //   });

    console.log('paper.directive', this);

    this.toolWheel.subscribe(console.log);
  }
  @Output()
  appPaperChange = new EventEmitter();
  project!: paper.Project;
  scope = new paper.PaperScope();

  public tool = new paper.Tool();

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
    // this.scope.project = this.project as any;
    this.project.currentStyle = new this.scope.Style({}) as any;
    this.project.currentStyle.strokeColor = new this.scope.Color(
      1,
      0,
      0
    ) as any;
    [this.toolDown, this.toolUp, this.toolDrag, this.toolMove].forEach((e$) => {
      e$.subscribe();
    });
    this.updateViewSize();
  }

  updateViewSize() {
    if (!this.project) {
      console.warn('scope not set on CanvasDirective');
      return;
    }
    // If we don't change the view size at all, paper.js doesn't seem to update
    // This solves an issue that occurs on first loading a default size canvas
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
    this.tool.activate();
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event: WheelEvent) {
    console.log(event);
    this.tool.emit('mousewheel', new PaperToolWheelEvent(event));
    event.preventDefault();
  }
}
