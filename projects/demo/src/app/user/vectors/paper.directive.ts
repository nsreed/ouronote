import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  OnInit,
} from '@angular/core';
import * as paper from 'paper';
import { fromEvent, from } from 'rxjs';
import { mergeAll, tap, map, distinct } from 'rxjs/operators';
@Directive({
  selector: '[appPaper]',
  exportAs: 'appPaper',
})
export class PaperDirective implements OnInit {
  @Output()
  appPaperChange = new EventEmitter();
  project = new paper.Project(this.el.nativeElement);

  private tool = new paper.Tool();

  @Output()
  toolDown$ = new EventEmitter<paper.ToolEvent>();
  @Output()
  toolUp$ = new EventEmitter<paper.ToolEvent>();
  @Output()
  toolDrag$ = new EventEmitter<paper.ToolEvent>();
  @Output()
  toolMove$ = new EventEmitter<paper.ToolEvent>();

  private toolDown = fromEvent<paper.ToolEvent>(this.tool, 'mousedown').pipe(
    tap((event) => this.beforeTool(event)),
    tap((event) => this.beforeEach(event)),
    tap((event) => this.toolDown$.emit(event)),
    tap((event) => this.afterEach(event))
  );
  private toolUp = fromEvent<paper.ToolEvent>(this.tool, 'mouseup').pipe(
    tap((event) => this.beforeEach(event)),
    tap((event) => this.toolUp$.emit(event)),
    tap((event) => this.afterEach(event)),
    tap((event) => this.afterTool(event))
  );
  private toolDrag = fromEvent<paper.ToolEvent>(this.tool, 'mousedrag').pipe(
    tap((event) => this.beforeEach(event)),
    tap((event) => this.toolDrag$.emit(event)),
    tap((event) => this.afterEach(event))
  );
  private toolMove = fromEvent<paper.ToolEvent>(this.tool, 'mousemove').pipe(
    // tap((event) => this.beforeEach(event)),
    tap((event) => this.toolMove$.emit(event))
    // tap((event) => this.afterEach(event))
  );

  data$ = this.toolUp.pipe(
    map(() => this.project.exportJSON()),
    distinct()
  );

  constructor(private el: ElementRef<HTMLCanvasElement>) {
    this.project.currentStyle.strokeColor = new paper.Color(1, 0, 0);
    [this.toolDown, this.toolUp, this.toolDrag, this.toolMove].forEach((e$) => {
      e$.subscribe();
    });
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
}
