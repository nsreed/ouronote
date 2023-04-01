import * as paper from 'paper';
import {
  PAPER_STYLE_LIB_DEFAULTS,
  BlendMode,
} from '../../user/vectors/functions/constants';
import {
  PaperHaverCtx,
  getPaperState,
  applyPaperState,
} from '../aspects/paper-state-aspect';
import { PointWidget } from './point-widget';
import { EventEmitter } from '@angular/core';
import {
  ReplaySubject,
  of,
  shareReplay,
  map,
  combineLatest,
  merge,
} from 'rxjs';
import {
  switchMap,
  tap,
  mergeMap,
  take,
  filter,
  combineLatestWith,
  withLatestFrom,
  auditTime,
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { distinct, pluck, debounceTime } from 'rxjs/operators';
import { Advice, UseAspect } from 'ts-aspect';
import { PaperStateAspect } from '../aspects/paper-state-aspect';
const p2 = paper;

export function isHitResultEqual(
  c?: paper.HitResult,
  r?: paper.HitResult
): boolean {
  return c?.item === r?.item && c?.type === r?.type;
}

interface IHasProject {
  project: paper.Project;
}

interface IHasPaper {
  paper: paper.PaperScope;
}

interface IHasGroup extends PaperHaverCtx {
  cache: paper.Group;
}

export class HitResultWidget
  extends PointWidget<paper.HitResult>
  implements IHasPaper, IHasProject
{
  @UseAspect(
    Advice.Around,
    new PaperStateAspect({ insertItems: false, autoUpdate: false })
  )
  snapshot<T extends (...args: any[]) => O, O>(fn: T): O {
    return fn() as O;
  }
  // saveState(observable: Observable<any>) {
  //   return of(getPaperState(this.project, this.paper)).pipe(
  //     combineLatestWith(observable),
  //     tap(([state, o]) => {
  //       applyPaperState(state, this.project, this.paper);
  //       return o;
  //     })
  //   );
  // }
  mouseDown$ = new EventEmitter<paper.MouseEvent>();
  group$ = this.paper$.pipe(
    combineLatestWith(this.layer$),
    switchMap(
      ([paper, layer]) =>
        this.snapshot(() => {
          layer.data.ignore = true;
          layer.activate();
          const group = new paper.Group();
          group.data.ignore = true;
          layer.addChild(group);
          return of(group);
        }) as Observable<paper.Group>
    ),
    shareReplay(1)
  );
  hitResult$ = new ReplaySubject<paper.HitResult>(1);
  type$ = this.hitResult$.pipe(
    map((r) => r.type),
    distinct()
  );
  hitPoint$ = this.hitResult$.pipe(
    auditTime(100),
    map((r) => r.point)
  );
  item$ = this.hitResult$.pipe(map((r) => r.item));
  update$ = combineLatest([
    this.paper$.pipe(take(1)),
    this.project$.pipe(take(1)),
    this.hitResult$,
    of(1).pipe(mergeMap((v) => this.scale$)),
  ]);
  style$ = this.type$.pipe(
    combineLatestWith(this.scale$.pipe(take(1))),
    // tap(console.log),
    map(([type, scale]) => {
      // return this.snapshot(() => {
      const paper = this.paper;
      const fontStyle = {
        justification: 'center',
        fontFamily: 'serif',
        fontWeight: 200,
      } as paper.Style;
      const style = new paper.Style({
        ...PAPER_STYLE_LIB_DEFAULTS,
        ...fontStyle,
        strokeScaling: true,
        fillColor: new paper.Color('blue'),
        strokeColor: new paper.Color('white'),
        strokeWidth: 1,
        shadowColor: null,
      } as unknown as Partial<paper.Style>) as paper.Style;
      switch (type) {
        case 'segment':
          style.fillColor = new paper.Color('indigo');
          style.strokeColor = new paper.Color('blue');
          break;
        case 'stroke':
          style.fillColor = new paper.Color('orange');
          style.strokeColor = new paper.Color('white').set({ alpha: 0.4 });
          break;
        default:
          style.fillColor = new paper.Color('orange');
          style.strokeColor = new paper.Color('red');
      }
      return style;
      // });
    })
  );
  label$ = this.group$.pipe(
    map((group) => {
      return this.snapshot(() => {
        this.layer.activate();
        const label = new this.paper.PointText(new this.paper.Point(0, 0)).set({
          name: 'label',
          data: { ignore: true },
        });
        group.addChild(label);
        label.blendMode = BlendMode.normal;
        return label;
      }) as paper.PointText;
    }),
    combineLatestWith(this.hitResult$),
    map(([label, hitResult]) => {
      label.data.hitResult = this.hitResult;
      label.set({ content: hitResult.type });
      label.translate(hitResult.point.subtract(label.bounds.center));
      return label;
    }),
    combineLatestWith(this.style$),
    tap(([label, style]) => (label.style = style)),
    shareReplay(1)
  );
  constructor(
    hitResult: paper.HitResult,
    layer: paper.Layer,
    project: paper.Project,
    scope: paper.PaperScope
  ) {
    super(layer, project, scope);
    this.hitResult = hitResult;
    this.destroy$.subscribe(() => {
      this.group$.pipe(take(1)).subscribe((group) => {
        group.remove();
        group.removeOnMove();
      });
    });
    this.registerSubs([this.label$.subscribe((label) => {})]);
  }

  private _hitResult!: paper.HitResult;
  public get hitResult(): paper.HitResult {
    return this._hitResult;
  }
  public set hitResult(value: paper.HitResult) {
    if (
      isHitResultEqual(this._hitResult, value) &&
      this._hitResult.point.equals(value.point)
    ) {
      return;
    }
    this._hitResult = value;
    this.hitResult$.next(value);
  }

  onDraw() {
    const indicatorStyle = new this.paper.Style({
      ...PAPER_STYLE_LIB_DEFAULTS,
      strokeColor: new this.paper.Color('white'),
      fillColor: new this.paper.Color(0.7, 0.7, 0.7, 0.8),
      shadowColor: new this.paper.Color(0, 0, 0, 0.25),
      strokeScaling: false,
      strokeWidth: 1.5,
      shadowOffset: new this.paper.Point(0, 0).multiply(this.scale),
    } as unknown as Partial<paper.Style>);
    let pipDiameter = 5;
    indicatorStyle.shadowBlur = pipDiameter * this.scale;
    this.project.currentStyle = indicatorStyle;

    const indicator = this.drawPoint(
      this.hitResult.point,
      pipDiameter * 0.5 * this.scale,
      {
        style: this.project.currentStyle,
        data: { hitResult: this.hitResult, ignore: true },
        blendMode: 'difference',
      }
    );
    indicator.onMouseDown = (e: paper.MouseEvent) => {
      this.mouseDown$.emit(e);
    };
  }

  remove() {
    this.cache.remove();
    super.onDestroy();
  }
}
