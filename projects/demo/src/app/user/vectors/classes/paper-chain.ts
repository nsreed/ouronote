import { after } from 'aspect-ts';
import { GunChain } from 'ng-gun';
import { shareReplay, map, take, switchMap } from 'rxjs/operators';
import { after$, before$, returned } from '../../../functions/aspect-rx';
import { ItemGraph, Vector } from '../../../model';
import { of } from 'rxjs';

const HIDDEN_DATA_KEYS = ['soul'];

const IGNORED_DATA_KEYS = ['ignore'];

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
    after(this.project, 'addLayer', (...args: any) => {
      console.log('after add layer');
    });
    let importing = false;
    const beforeImport$ = before$(this.project, 'importJSON');
    beforeImport$.subscribe((args: any) => {
      importing = true;
      console.log('before import', args[0]);
    });
    const afterImport$ = after$(this.project, 'importJSON');
    afterImport$.pipe(map(returned)).subscribe((item: paper.Item) => {
      importing = false;
      console.log(
        'after import',
        item.data?.soul,
        item.exportJSON({ asString: false })
      );
    });

    // TODO? importJSON() insert()s the item before importing its JSON
    const insert$ = after$(this.project, 'insertLayer');
    // insert$.subscribe((...args: any) => {
    //   console.log('raw insert', args);
    // });
    insert$
      .pipe(
        map(returned),
        switchMap((value) =>
          importing ? afterImport$.pipe(map((v) => value)) : of(value)
        )
      )
      .subscribe((inserted: paper.Layer) => {
        if (!inserted) {
          console.warn('ignoring uninserted');
          return;
        }
        if (importing) {
          console.warn('ignoring insert, as an import is in progress');
          return;
        }
        console.log('inserted$', inserted);
        const props = Object.getOwnPropertyDescriptors(inserted);
        // // a way to await setting of properties
        // Object.defineProperty(inserted, 'data', {
        //   set: (data) => {
        //     console.log('setting data', data);
        //     (inserted as any)._data = data;
        //   },
        //   get: () => {
        //     return (inserted as any)._data;
        //   },
        // });
        const keys = Object.keys(inserted);
        console.log('  properties', props);
        console.log('  keys', keys);

        const insertedJSON = inserted.exportJSON({ asString: false });
        console.log('json', insertedJSON);
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
