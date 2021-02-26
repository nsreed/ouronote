import { after } from 'aspect-ts';
import { map, mapTo, switchMap, filter, tap } from 'rxjs/operators';
import { after$, before$, returned } from '../../../functions/aspect-rx';
import { Vector } from '../../../model';
import { of } from 'rxjs';
import { ItemPair } from './ItemPair';
import { PaperPair } from './PaperPair';
import * as Gun from 'gun';
import { getUUID } from '../edit-vector/converter-functions';
import {
  GunChain,
  GunChainCallbackOptions,
} from '../../../../../../ng-gun/src/lib/classes/GunChain';
import * as paper from 'paper';
import { leadingComment } from '@angular/compiler';

export class ProjectPair extends PaperPair {
  /* STATE */
  importing = false;

  /* GRAPH EVENTS */
  layers = this.chain.get('layers');
  layerMap = this.layers.map();
  layers$ = this.layerMap.on({
    includeKeys: true,
    changes: true,
  } as GunChainCallbackOptions);
  layerCache = {} as any;

  /* PROJECT EVENTS */
  beforeProjectImportJSON$ = before$(this.project, 'importJSON');
  afterProjectImportJSON$ = after$(this.project, 'importJSON')
    .pipe
    // tap((inserted: any) => console.log('.afterImportJSON', inserted))
    ();
  afterProjectInsertLayer$ = after$(this.project, 'insertLayer').pipe(
    // tap((inserted: any) => console.log('.afterInsertLayer', inserted)),
    map(returned),
    filter((layer) => layer !== null && layer !== undefined),
    switchMap((value) =>
      this.importing
        ? this.afterProjectImportJSON$.pipe(mapTo(value))
        : of(value)
    )
  );

  constructor(
    public chain: GunChain<Vector>,
    public project: paper.Project,
    scope: paper.PaperScope
  ) {
    super(project, project, scope); // UGN
    this.setupProject();
    console.log('new ProjectPair');
    (project as any).pair = this;
    // project.layers
  }

  getChild(jsonOrKey: any): any {
    const child = this.project.layers.find((l) => l.data.soul === jsonOrKey);
    return child;
  }

  onGraphLayer(data: any) {
    const soul = data[1];
    const json = data[0];
    console.log('onGraphLayer %s', soul);
    if (!json) {
      console.log('  child was deleted');
      return;
    }
    let child = this.getChild(soul);
    if (!child) {
      console.log('  child was added');
      if (!json.className) {
        console.warn('Child has no className, setting as Layer');
        json.className = 'Layer';
      }
      // child = new paper.Layer();
      // child.data.soul = soul;
      // this.importing = true;
      child = this.constructChild(json, soul);
      (this.project as any).insertLayer(0, child);
      console.log('  created', child.toString());
      // this.importing = false;
      // this.onLocalLayer(child);
    }
  }

  onLocalLayer(layer: paper.Layer) {
    const l = layer as any;
    if (!l.pair) {
      console.log('onLocalLayer %s', l.toString());
      // console.log('  no gun');
      let save = false;
      if (!l.data.soul) {
        // console.log('    no soul');
        const soul = getUUID(this.chain as any);
        l.data.soul = soul;
        save = true;
      }
      if (l.data.soul) {
        // console.log('    this has a soul');
        const layerGun = this.layers.get(l.data.soul);
        const layerPair = new ItemPair(
          layerGun,
          layer,
          this.project,
          this.scope
        );
        if (save) {
          // layerPair.save();
        }
      }

      // this is local create
      // but it could be for a parent's importJSON?????
    }
  }

  setupProject() {
    this.beforeProjectImportJSON$.subscribe(() => (this.importing = true));
    this.afterProjectImportJSON$.subscribe(() => (this.importing = false));
    this.afterProjectInsertLayer$.subscribe((layer) =>
      this.onLocalLayer(layer)
    );
    this.layers$.subscribe((data) => this.onGraphLayer(data));
  }
}
