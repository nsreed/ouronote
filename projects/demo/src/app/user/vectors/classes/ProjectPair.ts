import { after } from 'aspect-ts';
import { GunChain } from 'ng-gun';
import { map, mapTo, switchMap, filter, tap } from 'rxjs/operators';
import { after$, before$, returned } from '../../../functions/aspect-rx';
import { Vector } from '../../../model';
import { of } from 'rxjs';
import { ItemPair } from './ItemPair';
import { PaperPair } from './PaperPair';
import * as Gun from 'gun';
import { getUUID } from '../edit-vector/converter-functions';

export class ProjectPair extends PaperPair {
  /* STATE */
  importing = false;

  /* GRAPH EVENTS */
  layers = this.chain.get('layers');
  layerMap = this.layers.map();
  layers$ = this.layerMap.on({ includeKeys: true });
  layerCache = {} as any;

  /* PROJECT EVENTS */
  beforeProjectImportJSON$ = before$(this.project, 'importJSON');
  afterProjectImportJSON$ = after$(this.project, 'importJSON').pipe(
    tap((inserted: any) => console.log('.afterImportJSON', inserted))
  );
  afterProjectInsertLayer$ = after$(this.project, 'insertLayer').pipe(
    tap((inserted: any) => console.log('.afterInsertLayer', inserted)),
    map(returned),
    filter((layer) => layer !== null && layer !== undefined),
    switchMap((value) =>
      this.importing
        ? this.afterProjectImportJSON$.pipe(mapTo(value))
        : of(value)
    )
  );

  constructor(public chain: GunChain<Vector>, public project: paper.Project) {
    super(project, project); // UGN
    this.setupProject();
    console.log('new ProjectPair');
    (project as any).pair = this;
    this.layers$.subscribe((data) => this.onGraphLayer(data));
    // project.layers
  }

  onGraphLayer(data: any) {
    const soul = data[1];
    const json = data[0];
    console.log('onGraphLayer %s %o', soul, json);
    if (!json) {
      console.log('  child was deleted');
      return;
    }
    let child = this.getChild(soul);
    if (!child) {
      console.log('  child was added');
      child = this.constructChild(json, soul);
    }
  }

  setupProject() {
    this.beforeProjectImportJSON$.subscribe(() => (this.importing = true));
    this.afterProjectImportJSON$.subscribe(() => (this.importing = false));
    this.afterProjectInsertLayer$.subscribe((layer: paper.Layer) => {
      console.log('inserted layer', layer.toString(), layer.data);
      const l = layer as any;
      if (!l.pair) {
        console.log('  no gun');
        if (!l.data.soul) {
          console.log('    no soul');
          const soul = getUUID(this.chain as any);
          l.data.soul = soul;
        }
        if (l.data.soul) {
          console.log('    this has a soul');
          const layerGun = this.layers.get(l.data.soul);
          const layerPair = new ItemPair(layerGun, layer, this.project);
          layerPair.save();
        }
        // this is local create
        // but it could be for a parent's importJSON?????
      }
    });
  }
}
