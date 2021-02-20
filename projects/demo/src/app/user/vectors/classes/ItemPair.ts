import { GunChain } from 'ng-gun';
import { shareReplay, map, switchMap, mapTo, filter } from 'rxjs/operators';
import { ItemGraph } from '../../../model';
import { Observable, of } from 'rxjs';
import { PaperPair } from './PaperPair';
import { after$, before$, returned } from '../../../functions/aspect-rx';
import { getUUID } from '../edit-vector/converter-functions';
import { GunChainCallbackOptions } from '../../../../../../ng-gun/src/lib/classes/GunChain';
import { EXPECT_ARRAY } from './constants';

export class ItemPair extends PaperPair {
  // Graph Methods
  children = this.chain.get('children');
  childMap = this.children.map();
  children$ = this.childMap.on({
    includeKeys: true,
    changes: true,
  } as GunChainCallbackOptions);

  data: GunChain = this.chain.get('data');
  data$ = (this.data as any).open() as Observable<any>;
  json$ = this.chain
    .on({ changes: true } as GunChainCallbackOptions)
    .pipe(shareReplay());

  // Local Methods
  ignoreInsert = false;
  beforeImportJSON$ = before$(this.item, 'importJSON');
  afterImportJSON$ = after$(this.item, 'importJSON');
  afterInsertChild$ = after$(this.item, 'insertChild').pipe(
    map(returned),
    filter((item) => item !== null && item !== undefined),
    switchMap((item) =>
      this.importing ? this.afterImportJSON$.pipe(mapTo(item)) : of(item)
    )
  );
  afterAddChild$ = after$(this.item, 'addChild').pipe(
    map(returned),
    filter((item) => !this.ignoreInsert && item !== null && item !== undefined),
    switchMap((item) =>
      this.importing ? this.afterImportJSON$.pipe(mapTo(item)) : of(item)
    )
  );

  constructor(
    private chain: GunChain<ItemGraph>,
    private item: paper.Item,
    project: paper.Project // Do we need the project? The item's `project` property should be able to get it...
  ) {
    super(item, project);
    console.log('constructing ItemPair', item.toString());
    this.setup();
  }

  getShallow() {
    const raw = this.item.exportJSON({ asString: false });
    const obj = raw[1] as any;
    const shallow = {
      ...obj,
      className: this.item.className,
    };

    // remove complex sub-objects
    delete shallow.data;
    delete shallow.children;

    // stringify arrays
    Object.keys(shallow).forEach((k) => {
      const value = shallow[k];
      if (Array.isArray(value)) {
        if (!EXPECT_ARRAY.includes(k)) {
          console.warn('UNEXPECTED ARRAY %s, NOT SERIALIZING!!!');
          // continue;
          delete shallow[k];
        }
        shallow[k] = JSON.stringify(value);
      }
    });
    return shallow;
  }

  save() {
    const shallow = this.getShallow();
    console.log('saving');
    console.log(shallow);
    this.chain.put(shallow); // TODO NOT READY FOR SAVE YET
  }

  setup() {
    console.log('setup()');
    this.onLocalChildren();
    this.afterInsertChild$.subscribe((child) => this.onLocalChild(child));
    this.children$.subscribe((data) => this.onGraphChild(data));
    this.data$.subscribe((data) => this.onGraphData(data));
    this.json$.subscribe((json) => this.onGraph(json));
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
      console.log('  this has a soul ', l.data.soul);
      const layerGun = this.children.get(l.data.soul);
      const layerPair = new ItemPair(layerGun, item, this.project);
      l.pair = layerPair;
      l.pair.save();
    }
  }

  onGraph(json: any) {
    console.log('onGraph');
    console.dir(json);
  }

  onGraphChild(data: any) {
    // console.log('onGraphChild');
    const soul = data[1];
    const json = data[0];
    // console.log('on graph child', soul, json);
    if (!json) {
      console.log('  child was deleted');
      return;
    }
    let child = this.getChild(soul);
    if (!child) {
      console.log('  child was added');
      child = this.constructChild(json, soul);
      this.ignoreInsert = true;
      this.item.insertChild(0, child); // Cause of save loop is here
      this.ignoreInsert = false;
    } else {
      // console.log('  child exists');
    }
  }

  onGraphData(data: any) {}
}
