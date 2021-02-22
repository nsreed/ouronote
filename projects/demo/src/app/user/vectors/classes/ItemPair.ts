import {
  shareReplay,
  map,
  switchMap,
  mapTo,
  filter,
  distinct,
} from 'rxjs/operators';
import { ItemGraph } from '../../../model';
import { Observable, of } from 'rxjs';
import { PaperPair } from './PaperPair';
import { after$, before$, returned } from '../../../functions/aspect-rx';
import { getUUID } from '../edit-vector/converter-functions';
import {
  GunChain,
  GunChainCallbackOptions,
} from '../../../../../../ng-gun/src/lib/classes/GunChain';
import { EXPECT_ARRAY } from './constants';
import {
  propertyChange$,
  setupAllEmitters,
  getAllSettable,
} from './paper-chain';
import * as paper from 'paper';

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
  json$ = this.chain.on({ changes: true } as GunChainCallbackOptions).pipe();

  // Local Methods
  ignoreInsert = false;
  beforeImportJSON$ = before$(this.item, 'importJSON');
  afterImportJSON$ = after$(this.item, 'importJSON');
  afterInsertChild$ = after$(this.item, 'insertChild').pipe(
    map(returned),
    filter((item) => !this.ignoreInsert && item !== null && item !== undefined),
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

  // itemStrokeColor = this.chain.get('strokeColor');
  // itemStrokeColor$ = propertyChange$(this.item, 'strokeColor').pipe(distinct());

  constructor(
    private chain: GunChain<ItemGraph>,
    private item: paper.Item,
    project: paper.Project // Do we need the project? The item's `project` property should be able to get it...
  ) {
    super(item, project);
    // console.log('constructing ItemPair', item.toString());
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
          console.warn('UNEXPECTED ARRAY %s, NOT SERIALIZING!!!', k);
          console.warn('  value', value);
          // continue;
          delete shallow[k];
        } else {
          shallow[k] = JSON.stringify(value);
        }
      }
    });
    return shallow;
  }

  save() {
    const shallow = this.getShallow();
    if (this.importing) {
      console.warn('tried to save while importing');
      return;
    }
    console.log('%s saving', this.item.toString());
    console.log(shallow);
    this.chain.put(shallow); // TODO NOT READY FOR SAVE YET
    console.log('%s done saving', this.item.toString());
  }

  setup() {
    // console.log('setup()');
    // setupAllEmitters(this.item);
    this.beforeImportJSON$.subscribe(() => (this.importing = true));
    this.afterImportJSON$.subscribe(() => (this.importing = false));
    const allSettable = getAllSettable(this.item);
    console.log('all settable:', allSettable);
    allSettable
      .map((pdk) => pdk[1])
      .forEach((k) => {
        propertyChange$(this.item, k as any).subscribe((v) => {
          if (this.importing) {
            console.log('%s ignored save durimg import', this.item.toString());
            return;
          }
          console.log('%s property %s change', this.item.toString(), k, v);
          // this.chain.get(k)
          this.save();
        });
      });
    this.children$.subscribe((data) => this.onGraphChild(data));
    this.afterInsertChild$.subscribe((child) => this.onLocalChild(child));
    // this.itemStrokeColor$.subscribe((color) => this.onItemStrokeColor(color));
    this.data$.subscribe((data) => this.onGraphData(data));
    this.json$.subscribe((json) => this.onGraph(json));
    this.onLocalChildren();
  }

  onItemStrokeColor(color: any) {
    // const serialized = (color as any)._serialize();
    // const stringed = JSON.stringify(serialized);
    // this.itemStrokeColor.put(stringed as never);
    this.save();
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
    console.log('%s onLocalChild', this.item.toString(), item.toString());
    const l = item as any;
    if (!l.pair) {
      // console.log('  no gun');
      if (!l.data.soul) {
        // console.log('  no soul');
        const soul = getUUID(this.chain as any);
        l.data.soul = soul;
      }
      // console.log('  this has a soul ', l.data.soul);
      const childGun = this.children.get(l.data.soul);
      const childPair = new ItemPair(childGun, item, this.project);
      l.pair = childPair;
      // l.pair.save();
    }
  }

  onGraph(json: any) {
    console.log('%s onGraph', this.item.toString());
    const scrubbed = this.scrubJSON(json, this.item.data.soul);
    delete scrubbed.className;
    console.log({ json, scrubbed });
    // console.log(scrubbed);
    this.item.importJSON(
      JSON.stringify([this.item.className, scrubbed]) as any
    );
    console.log('  applied changes');
    console.log(this.item);
    // console.dir(json);
  }

  onGraphChild(data: any) {
    // console.log('%s onGraphChild', this.item.toString());
    const soul = data[1];
    const json = data[0];
    if (!json) {
      // console.log('  child was deleted');
      return;
    }
    let child = this.getChild(soul);
    if (!child) {
      console.log('%s onGraphChild', this.item.toString(), soul);
      child = this.constructChild(json, soul);
      console.log('  child was added', child.toString());
      this.ignoreInsert = true;
      this.item.insertChild(0, child); // Cause of save loop is here
      this.ignoreInsert = false;
      this.onLocalChild(child);
    } else {
      // console.log('  child exists');
    }
  }

  onGraphData(data: any) {}
}
