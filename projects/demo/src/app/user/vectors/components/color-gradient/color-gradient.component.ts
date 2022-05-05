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
  padding = 10;

  mode = 'rectangle';

  @ViewChild(PaperDirective)
  paperDirective!: PaperDirective;

  get scope() {
    return this.paperDirective.scope;
  }

  get project() {
    return this.paperDirective.project;
  }

  private _color!: paper.Color;
  public get color(): paper.Color {
    return this._color;
  }
  public set color(value: paper.Color) {
    this._color = value;
    this.updateIndicator();
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.paperDirective.resize$.subscribe(() => {
      console.log('resize$');
      this.draw();
    });
    this.paperDirective.updateViewSize();
    this.draw();
  }

  ngOnInit(): void {}

  draw() {
    // this.drawHueCircle();
    this.drawHueLightnessRect();
  }

  updateIndicator() {
    if (!this.project) {
      return;
    }
    this.scope.activate();
    this.project.activate();
    if (this.mode === 'rectangle') {
      let indicator = this.project.getItem({ name: 'indicator' });
      if (!indicator) {
        indicator = new paper.Shape.Circle(this.project.view.center, 4);
        indicator.name = 'indicator';
        indicator.strokeWidth = 1;
        indicator.strokeColor = new paper.Color('gray');
      }
      const pos = new paper.Point(
        this.project.view.bounds.width * (this.color.hue / 359),
        this.project.view.bounds.height -
          this.project.view.bounds.height * this.color.lightness
      );
      indicator.position = pos;
      indicator.fillColor = this.color;
      indicator.bringToFront();
    }
  }

  drawHueLightnessRect() {
    if (!this.project) {
      return;
    }

    this.project.activate();
    this.project.clear();
    const c = this.project.view.center;

    const stepColor = new paper.Color(1, 0, 0);
    const lightnessSteps = 3;
    const h = this.project.view.bounds.height;

    const l = this.project.view.bounds.topLeft;
    const r = this.project.view.bounds.topRight;
    const d = r.subtract(l);
    while (stepColor.hue < 360) {
      const colCenter = l.add(d.multiply(stepColor.hue / 360));
      const p = new paper.Shape.Rectangle(colCenter, new paper.Size(1, h));
      const gradient = new paper.Gradient();
      gradient.stops = [
        new paper.GradientStop(new paper.Color('#FFFFFF'), 0),
        new paper.GradientStop(stepColor, 0.5),
        new paper.GradientStop(new paper.Color('#000000'), 1),
      ];
      const grad = new paper.Color(
        gradient,
        p.bounds.topCenter,
        p.bounds.bottomCenter
      );
      p.fillColor = grad;
      stepColor.hue++;
    }
    const raster = this.project.activeLayer.rasterize({ insert: true });
    this.project.activeLayer.onClick = (e: paper.ToolEvent) => {
      const selected = raster.getAverageColor(e.point);
      console.log(selected.toCSS(true));
      this.project.activate();
      this.color = selected;
    };
  }

  drawHueCircle() {
    if (!this.project) {
      return;
    }
    console.log('fillGradient()');

    const r =
      Math.min(
        this.project.view.bounds.width,
        this.project.view.bounds.height
      ) /
        2 -
      this.padding;
    const c = this.project.view.center;

    this.project.activate();
    this.project.clear();

    const gradientLayer = new paper.Layer();
    const hubLayer = new paper.Layer();
    const indicatorLayer = new paper.Layer();

    this.project.currentStyle.fillColor = new paper.Color(0, 0, 0) as any;

    hubLayer.activate();
    const hub = new paper.Shape.Circle(c, r * 0.3);
    hub.strokeColor = new paper.Color(0, 0, 0);
    hub.strokeWidth = 12;

    indicatorLayer.activate();
    const indicator = new paper.Path();
    indicator.add(c);
    indicator.add(c.add(new paper.Point(1, 0).multiply(r)));
    indicator.strokeCap = 'round';
    indicator.strokeJoin = 'round';
    indicator.strokeWidth = 1;

    gradientLayer.activate();

    const stepColor = new paper.Color(1, 0, 0);
    while (stepColor.hue < 360) {
      const hueVector = new paper.Point(0, 1).rotate(
        stepColor.hue,
        new paper.Point(0, 0)
      );
      const pointOnRing = c.add(hueVector.multiply(r));
      const p = new paper.Path();
      p.add(c);
      p.add(pointOnRing.rotate(2, c));
      p.add(pointOnRing);

      p.fillColor = stepColor;
      p.strokeCap = 'round';
      p.strokeJoin = 'round';
      p.strokeColor = stepColor;
      p.strokeWidth = 0.5;
      stepColor.hue++;
    }

    const raster = gradientLayer.rasterize({
      insert: true,
    });

    hub.bringToFront();
    indicator.bringToFront();

    this.project.activeLayer.onMouseDrag = (e: paper.MouseEvent) => {
      const fromCenter = e.point.subtract(c).normalize();
      const deltaAngle = e.delta.y;
      gradientLayer.rotate(deltaAngle, c);

      const pointColor = raster.getAverageColor(
        c.add(new paper.Point(1, 0).multiply(r))
      );
      // indicator.strokeColor = this.project.currentStyle.strokeColor;
      if (!pointColor) {
        return;
      }
      this.project.currentStyle.strokeColor = pointColor;
      indicator.strokeColor = pointColor;
      e.preventDefault();
      e.stopPropagation();
    };

    this.project.activeLayer.onClick = (e: paper.MouseEvent) => {
      const pointColor = raster.getAverageColor(e.point);
      console.log(pointColor?.toCSS(false));
      if (!pointColor) {
        indicator.removeSegments();
      }
    };

    // this.project.activeLayer.onMouseLeave = (e: paper.MouseEvent) => {
    //   console.log('mouse left');
    // };
    // this.project?.view.update();
    // prior?.activate();
  }
}
