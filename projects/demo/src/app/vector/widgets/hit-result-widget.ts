import { PaperWidget } from './paper-widget';
import * as paper from 'paper';
import { PaperDirective } from '../paper.directive';
import { around, before } from 'aspect-ts';
import { fromEvent, map, shareReplay } from 'rxjs';
import { Advice, Aspect, AspectContext, UseAspect } from 'ts-aspect';
import { saveStyle } from '../../user/vectors/functions/paper-functions';
import { EPaperBlendMode } from '../../user/vectors/functions/constants';
import {
  copyStyleToItem,
  copyNulls,
} from '../../user/vectors/functions/paper-functions';
import {
  PAPER_STYLE_EMPTY,
  PAPER_STYLE_LIB_DEFAULTS,
} from '../../user/vectors/functions/constants';
const p2 = paper;
interface IPaperState {
  activeLayer?: any;
  restoreStyle?: any;
  autoUpdate?: any;
  insertItems?: any;
}

interface IHitResultWidgetCtx extends AspectContext {
  target: HitResultWidget;
  state: IPaperState;
}

interface IHasProject {
  project: paper.Project;
}

interface IHasPaper {
  paper: paper.PaperScope;
}

class PaperStateAspect implements Aspect {
  /**
   * @param tempState The state to apply during the function call
   */
  constructor(private tempState: IPaperState = {}) {}
  execute(ctx: IHitResultWidgetCtx) {
    const { project, paper } = ctx.target;

    // return:
    if (ctx.state) {
      applyPaperState(ctx.state, project, paper);
      return;
    }

    // enter:
    ctx.state = getPaperState(project, paper);
    applyPaperState(this.tempState, project, paper);
  }
}

class NameCacheAspect implements Aspect {
  constructor(private name: any, private ignore = true) {}
  execute(ctx: IHitResultWidgetCtx) {
    if (ctx.returnValue) {
      ctx.returnValue.name = this.name;
      ctx.returnValue.data.ignore = true;
      ctx.target.cache.addChild(ctx.returnValue);
      return;
    }
    const cached = ctx.target.cache.children[this.name];
    if (!cached) {
      return;
    }
    ctx.functionParams[3] = cached;
  }
}

export class HitResultWidget
  extends PaperWidget<paper.HitResult>
  implements IHasPaper, IHasProject
{
  resize$ = fromEvent(this.project.view, 'resize').pipe(shareReplay(1));
  get scale() {
    return 1 / this.project.view.zoom;
  }
  scale$ = this.resize$.pipe(map(() => this.scale));

  constructor(
    private _hitResult: paper.HitResult,
    layer: paper.Layer,
    project: paper.Project,
    scope: paper.PaperScope
  ) {
    super(project, scope);
    this.draw();
  }

  subs = [this.scale$.subscribe((scale) => this.onScale(scale))];

  public get hitResult(): paper.HitResult {
    return this._hitResult;
  }
  public set hitResult(value: paper.HitResult) {
    this._hitResult = value;
    this.draw();
  }

  private lastFrame = Date.now();
  private _cache?: paper.Group;
  public get cache(): paper.Group {
    if (!this._cache) {
      this._cache = new this.paper.Group();
      this._cache.data.ignore = true;
    }
    return this._cache;
  }

  @UseAspect(
    Advice.Around,
    new PaperStateAspect({ autoUpdate: false, insertItems: false })
  )
  draw() {
    const indicatorStyle = new this.paper.Style({
      ...PAPER_STYLE_LIB_DEFAULTS,
      strokeColor: new this.paper.Color('white'),
      fillColor: new this.paper.Color(0.7, 0.7, 0.7, 0.8),
      shadowColor: new this.paper.Color(0, 0, 0, 0.25),
      strokeScaling: false,
      strokeWidth: 0.5,
    } as unknown as Partial<paper.Style>);
    indicatorStyle.shadowOffset = new this.paper.Point(0, 0).multiply(
      this.scale
    );
    const [dMin, dMax] = [10, 15];
    let pipDiameter = this.hitResult.item.strokeWidth || 5;

    pipDiameter =
      pipDiameter < dMin ? dMin : pipDiameter > dMax ? dMax : pipDiameter;
    indicatorStyle.shadowBlur = pipDiameter * this.scale;
    this.project.currentStyle = indicatorStyle;
    this.drawPoint(this.hitResult.point, (pipDiameter * this.scale) / 2);
  }

  @UseAspect(Advice.Around, new NameCacheAspect('indicator'))
  drawPoint(
    center: paper.Point,
    radius: number = this.project.currentStyle.strokeWidth,
    style: paper.Style = this.project.currentStyle,
    circle?: paper.Path.Circle
  ) {
    if (circle) {
      circle.position = center;
      const radiusPoint = new paper.Point(radius, radius);
      circle.fitBounds(
        new paper.Rectangle(
          center.add(radiusPoint),
          center.add(radiusPoint.multiply(-1))
        ),
        true
      );
    }
    circle = circle || new this.paper.Path.Circle(center, radius);
    circle.applyMatrix = true;
    circle.blendMode = EPaperBlendMode.normal;
    circle.style = style;
    return circle;
  }

  remove() {
    this.subs.forEach((s) => s.unsubscribe());
    this.cache.remove();
    this._cache = undefined;
  }

  onScale(scale: number) {
    this.draw();
  }
}
function applyPaperState(
  state: IPaperState,
  project: paper.Project,
  paper: paper.PaperScope
) {
  if (state?.activeLayer) {
    state.activeLayer.activate();
  }
  if (state?.restoreStyle) {
    state.restoreStyle();
  }
  if (state?.autoUpdate !== undefined) {
    project.view.autoUpdate = state.autoUpdate;
  }
  if (state?.insertItems !== undefined) {
    paper.settings.insertItems = state.insertItems;
  }
}

function getPaperState(
  project: paper.Project,
  paper: paper.PaperScope
): IPaperState {
  return {
    activeLayer: project.activeLayer,
    restoreStyle: saveStyle(project),
    autoUpdate: project.view.autoUpdate,
    insertItems: paper.settings.insertItems,
  };
}
