import { after } from 'aspect-ts';
import { GunChain } from 'ng-gun';
import { shareReplay } from 'rxjs/operators';
import { ItemGraph, Vector } from '../../../model';

export class PaperPair {}

export class ProjectPair {
  layers = this.chain.get('layers');
  layerMap = this.layers.map();
  layers$ = this.layerMap.on({ includeKeys: true });

  constructor(public chain: GunChain<Vector>, public project: paper.Project) {
    console.log('new ProjectPair');
    this.layers$.subscribe((data) => this.onLayer(data));
    this.setupProject();
    // project.layers
  }

  onLayer(data: any) {
    console.log('project layer data', data);
  }

  setupProject() {
    const addLayerFn = this.project.addLayer;
    after(this.project, 'addLayer', (...args: any) => {
      console.log('after add layer');
    });
    after(this.project, 'insertLayer', (...args: any[]) => {
      // console.log('after insert layer', args);
      if (args?.length > 0) {
        const inserted = args[args.length - 1]; // after() puts return in last arg, prior args are arguments passed to the function
        // console.log('inserted', inserted);
        if (!inserted.data.soul) {
          console.log(
            'inserted soulless! creating new child?',
            inserted.data.soul
          );
        }
      }
    });
  }
}

export class ItemPair {
  children = this.chain.get('children');
  childMap = this.children.map();
  children$ = this.childMap.on({ includeKeys: true });

  json$ = this.chain.on().pipe(shareReplay());

  constructor(
    private chain: GunChain<ItemGraph>,
    private item: paper.Item,
    private project: paper.Project // Do we need the project? The item's `project` property should be able to get it...
  ) {
    this.children$.subscribe((data) => this.onChild(data as any));
  }

  onChange(data: any) {
    console.log('on change', data);
    // this.item.importJSON(data);
  }

  onChild(entry: [any, string]) {
    console.log('on child', entry);
  }

  constructChild(childJSON: any) {
    if (!childJSON.className) {
      console.warn('child has no class name');
      return;
    }
    const child = this.project.importJSON(childJSON);
    this.item.insertChild(childJSON.index, child);
    return child;
  }
}
