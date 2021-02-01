import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  OnInit,
} from '@angular/core';
import * as paper from 'paper';
import { fromEvent } from 'rxjs';
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
  toolDown = fromEvent<paper.ToolEvent>(this.tool, 'mousedown');
  @Output()
  toolUp = fromEvent<paper.ToolEvent>(this.tool, 'mouseup');
  @Output()
  toolDrag = fromEvent<paper.ToolEvent>(this.tool, 'mousedrag');
  @Output()
  toolMove = fromEvent<paper.ToolEvent>(this.tool, 'mousemove');

  data = fromEvent<paper.Event>(this.project.view, 'mouseup');

  constructor(private el: ElementRef<HTMLCanvasElement>) {
    this.project.currentStyle.strokeColor = new paper.Color(1, 0, 0);
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
