import { PaperWidget } from './paper-widget';
import { ReplaySubject } from 'rxjs';
import * as paper from 'paper';
import { UseAspect, Advice } from 'ts-aspect';
import { BlendMode } from '../../user/vectors/functions/constants';
import { NameCacheAspect, CachedName } from '../aspects/name-cache-aspect';

function pathCircleFactory(
  that: any,
  center: paper.Point,
  radius: number,
  ...args: any[]
) {
  const circle = new that.paper.Path.Circle(center, radius);
  while (args.length > 0) {
    const a = args.pop();
    circle.set(a);
  }
  return circle;
}

export class PointWidget<T = paper.Point> extends PaperWidget<T> {
  point$ = new ReplaySubject<paper.Point>();
  private _point!: paper.Point;
  public get point(): paper.Point {
    return this._point;
  }
  public set point(value: paper.Point) {
    if (value.equals(this._point)) {
      return;
    }
    this._point = value;
    this.point$.next(value);
  }

  @CachedName('indicator', pathCircleFactory)
  drawPoint(
    center: paper.Point,
    radius: number = this.project.currentStyle.strokeWidth,
    options: any = {},
    circle?: paper.Path.Circle
  ) {
    if (!circle) {
      console.warn('no circle');
      circle = new paper.Path.Circle(center, radius);
    }
    this.layer.addChild(circle);
    circle.position = center;
    const radiusPoint = new paper.Point(radius, radius);
    circle.fitBounds(
      new paper.Rectangle(
        center.add(radiusPoint),
        center.add(radiusPoint.multiply(-1))
      ),
      true
    );
    return circle;
  }
}
