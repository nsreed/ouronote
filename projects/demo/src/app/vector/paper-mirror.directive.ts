import { Directive, Input } from '@angular/core';
import { CAPABILITIES } from '../system.service';
import { PaperBase, PaperDirective } from './paper.directive';

@Directive({
  selector: '[paperMirror]',
  exportAs: 'paperMirror',
})
export class PaperMirrorDirective extends PaperBase {
  private cursor!: paper.Shape.Circle;
  private _source!: PaperDirective;

  /** The PaperDirective instance to mimick */
  public get source(): PaperDirective {
    return this._source;
  }
  @Input('paperMirror')
  public set source(value: PaperDirective) {
    this._source = value;
    this.source.viewBounds$.subscribe(() => this.updateFromSource());
    this.projectChange.subscribe((sourceProject) => {
      this.updateFromSource();

      this.cursor = (this.project.getItem({ name: 'cursor' }) ||
        new this.ps.Shape.Circle(this.project.view.center, 0)) as any;
      this.cursor.name = 'cursor';
      this.project.activeLayer.addChild(this.cursor);

      this.source.project.view.on('mousewheel', (e: any) => {
        this.cursor.position = e.point;
      });

      // Intercept all mouse events from the canvas
      [
        'click',
        'doubleclick',
        'mousemove',
        'mousedown',
        'mousedrag',
        'mouseup',
        'mouseenter',
        'mouseleave',
      ].forEach((eType) => {
        this.source.project.view.on(eType, (e: any) => {
          this.cursor.position = e.point;
          this.updateCursor();
          this.project.view.emit(eType, {
            ...e,
            currentTarget: value.project.view,
            target: this.project.view,
            bubbles: true,
          } as MouseEvent);
        });
      });
    });
  }

  updateCursor() {
    if (this.cursor) {
      if (CAPABILITIES.POINTER || CAPABILITIES.TOUCH) {
        this.cursor.remove();
        return;
      }
      let s = this.currentStyle();
      // this.cursor.strokeWidth = s.strokeWidth;
      this.cursor.radius = s.strokeWidth / 2;
      this.cursor.fillColor = s.strokeColor;
      this.cursor.strokeWidth = 0;
      this.cursor.style.strokeScaling =
        (this.source.scope.tool as any).scale || s.strokeScaling;
    }
  }

  private currentStyle() {
    return (
      (this.source.scope.tool as any).effectiveStyle ||
      this.source.project.currentStyle
    );
  }

  updateViewSize(): void {
    this.updateFromSource();
  }

  updateFromSource() {
    this.project.view.autoUpdate = false;
    this.project.view.center = this.source.project.view.center;
    this.project.view.zoom = this.source.project.view.zoom;
    this.project.view.viewSize = this.source.project.view.viewSize;
    this.project.activate();
    this.source.project.activate();
    this.project.view.autoUpdate = true;
    this.project.view.update();
  }
}

class PaperRunner {
  constructor(public readonly scope: paper.PaperScope) {}
}

const p = (a: number, b: number) => new paper.Point(a, b);

/*
2x tightly spoked wheels, slightly offset

*/
class SpockRadar {
  // rotatey discs for things to reference
  public discs: paper.Item[] = [];

  constructor(public readonly scope: paper.PaperScope) {
    var discTotal = 2;

    const disc1 = new paper.Shape.Circle(p(0, 0), 10);
  }
}
