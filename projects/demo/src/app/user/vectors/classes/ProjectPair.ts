import { after } from 'aspect-ts';
import { GunChain } from 'ng-gun';
import { map, mapTo, switchMap, filter } from 'rxjs/operators';
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
  afterProjectImportJSON$ = after$(this.project, 'importJSON');
  afterProjectInsertLayer$ = after$(this.project, 'insertLayer').pipe(
    map(returned),
    filter((layer) => layer !== null && layer !== undefined),
    switchMap((value) =>
      this.importing
        ? this.afterProjectImportJSON$.pipe(mapTo(value))
        : of(value)
    )
  );

  constructor(public chain: GunChain<Vector>, public project: paper.Project) {
    super(project);
    console.log('new ProjectPair');
    (project as any).pair = this;
    this.layers$.subscribe((data) => this.onGraphLayer(data));
    this.setupProject();
    // project.layers
  }

  onGraphLayer(data: any) {
    console.log('project layer data', data);
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
        }
        // this is local create
        // but it could be for a parent's importJSON?????
      }
    });
  }
}
