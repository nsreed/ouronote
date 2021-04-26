import { of } from 'rxjs';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';
import { LogService } from '../../../../../../log/src/lib/log.service';
import {
  GunChain,
  GunChainCallbackOptions,
} from '../../../../../../ng-gun/src/lib/classes/GunChain';
import { after$, before$, returned } from '../../../functions/aspect-rx';
import { VectorGraph } from '../../VectorGraph';
import { getUUID } from '../edit-vector/converter-functions';
import { ItemPair } from './ItemPair';
import { PaperPair } from './PaperPair';
import { SaveStrategy } from './SaveStrategy';

export class ProjectPair extends PaperPair {
  /* STATE */
  isImportingJSON = false;
  saveStrategy: SaveStrategy = SaveStrategy.MANUAL;

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
  afterProjectImportJSON$ = after$(this.project, 'importJSON');
  afterProjectInsertLayer$ = after$(this.project, 'insertLayer').pipe(
    // tap((inserted: any) => this.logger.log('.afterInsertLayer', inserted)),
    map(returned),
    filter((layer) => layer !== null && layer !== undefined),
    switchMap((value) =>
      this.isImportingJSON
        ? this.afterProjectImportJSON$.pipe(mapTo(value))
        : of(value)
    )
  );

  constructor(
    public chain: GunChain<VectorGraph>,
    public project: paper.Project,
    scope: paper.PaperScope,
    logger: LogService
  ) {
    super(project, project, scope, logger); // UGN
    this.setupProject();
    // this.logger.log('new ProjectPair');
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
    // this.logger.log('onGraphLayer %s', soul);
    if (!json) {
      this.logger.log('  child was deleted');
      return;
    }
    let child = this.getChild(soul);
    if (!child) {
      // this.logger.log('  child was added');
      if (!json.className) {
        // this.logger.warn('Child has no className, setting as Layer');
        json.className = 'Layer';
      }
      // child = new paper.Layer();
      // child.data.soul = soul;
      // this.importing = true;
      child = this.constructChild(json, soul);
      // TODO insert at appropriate z-order
      (this.project as any).insertLayer(this.project.layers.length, child);
      // this.logger.log('  created', child.toString());
      // this.importing = false;
      // this.onLocalLayer(child);
    }
  }

  onLocalLayer(layer: paper.Layer) {
    const l = layer as any;
    if (!l.pair) {
      // this.logger.log('onLocalLayer %s', l.toString());
      if (!l.data.soul) {
        // this.logger.log('    no soul');
        const soul = getUUID(this.chain as any);
        l.data.soul = soul;
      }
      const layerGun = this.layers.get(l.data.soul);
      const layerPair = new ItemPair(
        layerGun,
        layer,
        this.project,
        this.scope,
        this.logger
      );
    }
  }

  setupProject() {
    this.beforeProjectImportJSON$.subscribe(
      () => (this.isImportingJSON = true)
    );
    this.afterProjectImportJSON$.subscribe(
      () => (this.isImportingJSON = false)
    );
    this.afterProjectInsertLayer$.subscribe((layer) =>
      this.onLocalLayer(layer)
    );
    this.layers$.subscribe((data) => this.onGraphLayer(data));
  }
}
