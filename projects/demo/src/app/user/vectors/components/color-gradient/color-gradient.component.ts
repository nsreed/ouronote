import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import * as paper from 'paper';
import { PaperDirective } from '../../../../vector/paper.directive';

@Component({
  selector: 'app-color-gradient',
  templateUrl: './color-gradient.component.html',
  styleUrls: ['./color-gradient.component.scss'],
})
export class ColorGradientComponent implements OnInit, AfterViewInit {
  private _canvasRef!: ElementRef<HTMLCanvasElement>;
  public get canvasRef(): ElementRef<HTMLCanvasElement> {
    return this._canvasRef;
  }
  @ViewChild('Gradient')
  public set canvasRef(value: ElementRef<HTMLCanvasElement>) {
    this._canvasRef = value;
  }

  get canvas() {
    return this.canvasRef.nativeElement;
  }
  ctx?: CanvasRenderingContext2D;

  @ViewChild(PaperDirective)
  paperDirective!: PaperDirective;

  get scope() {
    return this.paperDirective.scope;
  }

  get project() {
    return this.paperDirective.project;
  }

  constructor() {}

  ngAfterViewInit(): void {
    console.log([
      this.paperDirective,
      this.paperDirective?.scope,
      this.paperDirective?.project,
    ]);
    // this.resize();
    // this.scope = new paper.PaperScope();
    // this.scope.setup(this.canvas);
    // this.project = this.scope.project;
    this.paperDirective.resize$.subscribe(() => {
      console.log('resize$');
      this.draw();
    });
    this.paperDirective.updateViewSize();
    // this.project.view.autoUpdate = false;
    this.draw();
  }

  ngOnInit(): void {}

  draw() {
    this.fillGradient();
  }

  fillGradient() {
    const prior = this.scope.project;
    if (this.project) {
      console.log('fillGradient()');
      this.project.activate();

      this.project.clear();
      this.project.currentStyle.fillColor = new paper.Color(0, 0, 0) as any;
      const color = new paper.Color(1, 0, 0);
      const r =
        Math.min(
          this.project.view.bounds.width,
          this.project.view.bounds.height
        ) / 2;
      const c = this.project.view.center;
      while (color.hue < 360) {
        const hueVector = new paper.Point(0, 1).rotate(
          color.hue,
          new paper.Point(0, 0)
        );
        const pointOnRing = c.add(hueVector.multiply(r));

        // const c = new paper.Shape.Circle(pointOnRing, 3);
        // c.fillColor = color;
        // this.project.activeLayer.insertChild(0, c);

        const p = new paper.Path();
        p.add(c);
        p.add(pointOnRing.rotate(2, c));
        p.add(pointOnRing);

        p.fillColor = color;
        // p.onClick = (e: paper.ToolEvent) => {
        //   console.log(e, p.fillColor);
        // };
        // p.strokeColor = color;
        // p.strokeWidth = 0.5;

        color.hue++;
      }
      // this.project?.view.update();
      // prior?.activate();
    }
  }
}
