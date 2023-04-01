import { EventEmitter } from '@angular/core';
import {
  fromEvent,
  map,
  merge,
  of,
  ReplaySubject,
  shareReplay,
  Subscription,
  switchMap,
} from 'rxjs';
import { distinct } from 'rxjs/operators';
import { Advice, UseAspect } from 'ts-aspect';
import { PaperStateAspect } from '../aspects/paper-state-aspect';

export class PaperWidget<T = any> {
  private _project!: paper.Project;
  private _paper!: paper.PaperScope;
  paper$ = new ReplaySubject<paper.PaperScope>();
  public get paper(): paper.PaperScope {
    return this._paper;
  }
  public set paper(value: paper.PaperScope) {
    this._paper = value;
    this.paper$.next(value);
  }
  project$ = new ReplaySubject<paper.Project>();
  public get project(): paper.Project {
    return this._project;
  }
  public set project(value: paper.Project) {
    this._project = value;
    this.project$.next(value);
  }

  private _layer!: paper.Layer;
  public get layer(): paper.Layer {
    return this._layer;
  }
  public set layer(value: paper.Layer) {
    this._layer = value;
    this.layer$.next(value);
  }
  layer$ = new ReplaySubject<paper.Layer>(1);
  constructor(
    layer: paper.Layer,
    project: paper.Project,
    paper: paper.PaperScope
  ) {
    this.registerSubs([this.draw$.subscribe(() => this.onDraw())]);

    this.paper = paper;
    this.project = project;
    this.layer = layer;
  }
  private _cache?: paper.Group;
  public get cache(): paper.Group {
    if (!this._cache) {
      this._cache = new this.paper.Group();
      this._cache.data.ignore = true;
    }
    return this._cache;
  }
  get scale() {
    return 1 / this.project.view.zoom;
  }

  @UseAspect(
    Advice.Around,
    new PaperStateAspect({ autoUpdate: false, insertItems: false })
  )
  public draw() {
    this.layer.activate();
    this.draw$.emit();
  }
  destroy$ = new EventEmitter();
  draw$ = new EventEmitter();
  resize$ = this.project$.pipe(
    switchMap((project: paper.Project) =>
      fromEvent(project.view, 'resize').pipe(shareReplay(1))
    )
  );
  scale$ = this.project$.pipe(
    switchMap((project) =>
      merge(of(this.scale), this.resize$.pipe(map(() => 1 / project.view.zoom)))
    ),
    distinct(),
    shareReplay(1)
  ); //.resize$.pipe(map(() => this.scale));

  onDraw() {}
  onDestroy() {
    this.cache.remove();
    this._cache = undefined;
    this._subs.forEach((s) => s.unsubscribe());
    this.destroy$.emit();
  }

  private _subs: Subscription[] = [];
  protected registerSubs(subs: Subscription[]) {
    this._subs.push(...subs);
  }
}
