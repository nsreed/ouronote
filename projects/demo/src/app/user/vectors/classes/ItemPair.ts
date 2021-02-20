import { GunChain } from 'ng-gun';
import { shareReplay, map, switchMap, mapTo, filter } from 'rxjs/operators';
import { ItemGraph } from '../../../model';
import { Observable, of } from 'rxjs';
import { PaperPair } from './PaperPair';
import { after$, before$, returned } from '../../../functions/aspect-rx';
import { getUUID } from '../edit-vector/converter-functions';

export class ItemPair extends PaperPair {
  children = this.chain.get('children');
  childMap = this.children.map();
  children$ = this.childMap.on({ includeKeys: true });

  data: GunChain = this.chain.get('data');
  data$ = (this.data as any).open() as Observable<any>;

  json$ = this.chain.on().pipe(shareReplay());

  beforeImportJSON$ = before$(this.item, 'importJSON');
  afterImportJSON$ = after$(this.item, 'importJSON');
  afterInsertChild = after$(this.item, 'insertChild').pipe(
    map(returned),
    filter((item) => item !== null && item !== undefined),
    switchMap((item) =>
      this.importing ? this.afterImportJSON$.pipe(mapTo(item)) : of(item)
    )
  );
  afterAddChild = after$(this.item, 'addChild').pipe(
    map(returned),
    filter((item) => item !== null && item !== undefined),
    switchMap((item) =>
      this.importing ? this.afterImportJSON$.pipe(mapTo(item)) : of(item)
    )
  );
  constructor(
    private chain: GunChain<ItemGraph>,
    private item: paper.Item,
    private project: paper.Project // Do we need the project? The item's `project` property should be able to get it...
  ) {
    super(item);
    this.setup();
    console.log('constructing ItemPair', item.toString());
  }

  setup() {
    console.log('setup()');
    this.onLocalChildren();
    this.afterInsertChild.subscribe((child) => this.onLocalChild(child));
    this.children$.subscribe((data) => this.onGraphChild(data[1] as any));
    this.data$.subscribe((data) => this.onData(data));
  }

  onChange(data: any) {
    console.log('on change', data);
    // this.item.importJSON(data);
  }

  onLocalChildren() {
    this.item.children?.forEach((item) => {
      this.onLocalChild(item);
    });
  }

  onLocalChild(item: paper.Item) {
    if (!item) {
      console.warn('null child');
      return;
    }
    console.log('on child', item.toString());
    const l = item as any;
    if (!l.pair) {
      console.log('  no gun');
      if (!l.data.soul) {
        console.log('  no soul');
        const soul = getUUID(this.chain as any);
        l.data.soul = soul;
      }
      if (l.data.soul) {
        console.log('  this has a soul');
        const layerGun = this.children.get(l.data.soul);
        const layerPair = new ItemPair(layerGun, item, this.project);
        l.pair = layerPair;
      }
    }
  }

  onGraphChild(item: any) {
    console.log('on graph child', item);
  }

  onData(data: any) {}

  save() {}

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
