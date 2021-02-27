import * as paper from 'paper';
import { from, Observable, of } from 'rxjs';
import {
  delay,
  distinct,
  filter,
  map,
  mapTo,
  mergeMap,
  shareReplay,
  switchMap,
  switchMapTo,
  take,
} from 'rxjs/operators';
import {
  GunChain,
  GunChainCallbackOptions,
} from '../../../../../../ng-gun/src/lib/classes/GunChain';
import { after$, before$, returned } from '../../../functions/aspect-rx';
import { ItemGraph } from '../../../model';
import { getUUID } from '../edit-vector/converter-functions';
import { EXPECT_ARRAY, hasRequired, MUTATIONS } from './constants';
import { unpack } from './packaging';
import { getAllSettable, propertyChange$ } from './paper-chain';
import { PaperPair } from './PaperPair';

export class ItemPair extends PaperPair {
  graph$ = this.chain.on({ changes: true } as GunChainCallbackOptions).pipe(
    // tap((json) => console.log('graph JSON', json)),
    // filter((json) => hasRequired(json))
    shareReplay()
  );
  graphValue$ = this.graph$.pipe(
    filter((json) => hasRequired(json)),
    distinct((v) => JSON.stringify(v))
  );
  graphRemove$ = this.graph$.pipe(filter((json) => json === null));
  // Graph Methods
  children = this.chain.get('children');
  ready$ = this.graphValue$.pipe(take(1), shareReplay(1));
  private readonly graphLoad$ = this.children.open().pipe(
    distinct((v) => JSON.stringify(v)),
    take(1),
    delay(250),
    map((c) => unpack(c)),
    shareReplay()
  );

  private readonly childrenLoad$ = this.ready$.pipe(
    // switchMapTo(
    //   this.graphLoad$
    // )
    shareReplay()
  );

  childMap = this.children.map();
  children$ = this.childrenLoad$.pipe(
    switchMapTo(
      this.childMap.on({
        includeKeys: true,
        changes: true,
      } as GunChainCallbackOptions)
    ),
    shareReplay()
  );
  childrenExtant$ = this.children$.pipe(filter((ckv) => hasRequired(ckv[0])));
  newChildren$ = this.children$.pipe(filter((kvp) => !this.getChild(kvp[1])));
  removedChildren$ = this.children$.pipe(filter((kvp) => kvp[0] === null));

  data: GunChain = this.chain.get('data');
  data$ = (this.data as any).open() as Observable<any>;

  afterRemove$ = after$(this.item, 'remove');

  // Local Methods
  ignoreInsert = false;
  beforeImportJSON$ = before$(this.item, 'importJSON');
  afterImportJSON$ = after$(this.item, 'importJSON');
  afterInsertChild$ = after$(this.item, 'insertChild').pipe(
    map(returned),
    filter((item) => !this.item.data.ignored),
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

  localMutators = MUTATIONS[this.item.className] || [];
  localChange$ = from(this.localMutators).pipe(
    // tap((methodName) => console.log('  mutation method', methodName)),
    mergeMap((method: any) => after$(this.item, method))
    // tap((mutation) => console.log('%s mutation', mutation))
  );

  constructor(
    private chain: GunChain<ItemGraph>,
    private item: paper.Item,
    project: paper.Project,
    scope: paper.PaperScope
  ) {
    super(item, project, scope);
    this.graphLoad$.subscribe((loaded) => {
      console.log('%s graph load', this.item.toString());
      console.log(loaded);
    });
    this.childrenLoad$
      .pipe(filter((children) => children.length > 0))
      .subscribe((children: any) => {
        // TODO Performance: bulk-load children before setting up this item
        // console.dir(json);
        // const unpacked = unpack(json, this.item.data.soul);
        // console.log('%s children', this.item.toString());
        // const newChildren = children.filter(
        //   (c: any) => !this.getChild(c[1].data.soul)
        // );
        // const toImport = [
        //   this.item.className,
        //   {
        //     children: newChildren,
        //     data: {
        //       soul: this.item.data.soul,
        //     },
        //   },
        // ];
        // console.dir(toImport);
        // this.item.importJSON(JSON.stringify(toImport));
      });
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

  doSave() {
    const shallow = this.getShallow();
    // TODO only put() changed fields
    if (this.importing) {
      console.warn('tried to save while importing');
      return;
    }
    // console.log('%s saving', this.item.toString());
    // console.log(shallow);
    this.chain.put(shallow);
    // console.log('%s done saving', this.item.toString());
  }

  setup() {
    this.afterRemove$.subscribe(() => this.onLocalRemove());
    this.beforeImportJSON$.subscribe(() => (this.importing = true));
    this.afterImportJSON$.subscribe(() => (this.importing = false));
    this.children$.subscribe((data) => this.onGraphChild(data));
    // TODO? ignoreInsert causing multiple local child adds to be ignored???
    this.afterInsertChild$.subscribe((child) => this.onLocalChild(child));
    this.data$.subscribe((data) => this.onGraphData(data));
    this.graphValue$.subscribe((json) => this.onGraph(json));
    this.graphRemove$.subscribe((json) => {
      console.log('%s should remove this', this.item.toString());
    });
    this.onLocalChildren();
    const allSettable = getAllSettable(this.item);
    // console.log('all settable:', allSettable);

    // TODO? move propertyChange$ interception to prototype
    allSettable
      .map((pdk) => pdk[1])
      .forEach((k) => {
        propertyChange$(this.item, k as any).subscribe((v) => {
          if (this.importing) {
            return;
          }
          // console.log('%s property %s change', this.item.toString(), k, v);
          // this.chain.get(k)
          this.save();
        });
      });
    this.localChange$.subscribe((data) => {
      // console.log('localChange$', data);
      // this.save();
    });
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
    const l = item as any;
    if (!l.pair) {
      console.log('%s onLocalChild', this.item.toString(), item.toString());
      // console.log('  no gun');
      if (!l.data.soul) {
        // console.log('  no soul');
        const soul = getUUID(this.chain as any);
        l.data.soul = soul;
      }
      console.log('  soul ', l.data.soul);
      const childGun = this.children.get(l.data.soul);
      const childPair = new ItemPair(childGun, item, this.project, this.scope);
      l.pair = childPair;
      // l.pair.save();
    }
  }

  onGraph(json: any) {
    // FIXME path segments getting overwritten by previous saves
    console.log('%s onGraph', this.item.toString());
    if (!json) {
      console.warn('  NO JSON! SHOULD REMOVE???');
    }
    const scrubbed = this.scrubJSON(json, this.item.data.soul);
    delete scrubbed.className;
    // console.log({ json, scrubbed });
    // console.log(scrubbed);
    const imported = this.item.importJSON(
      JSON.stringify([this.item.className, scrubbed]) as any
    ) as any;
    if (imported !== this.item) {
      console.error('unexpected new item!!!');
    }
    // console.log('  applied changes');
    // console.log(this.item);
    try {
      (this.item as any).project.view.update();
    } catch (e: any) {
      console.error('error drawing item', e);
    }
    // console.dir(json);
  }

  onGraphChild(data: any) {
    // console.log('%s onGraphChild', this.item.toString());
    const soul = data[1];
    const json = data[0];
    let child = this.getChild(soul);
    if (!json) {
      if (child) {
        console.log('child was deleted');
        child.remove();
      } else {
        // This is a null graph child that wasn't created locally (historic delete), don't do anything
        // console.warn('incoming delete for unmatched child!');
      }
    } else {
      if (!child) {
        // console.log('%s onGraphChild', this.item.toString(), soul);
        child = this.constructChild(json, soul);
        // console.log('  child was added', child.toString());
        this.ignoreInsert = true;
        this.item.insertChild(0, child); // Cause of save loop is here
        this.ignoreInsert = false;
        this.onLocalChild(child);
      } else {
        // This is an update for an existing child
        // console.log('  child exists');
      }
    }
  }

  onGraphChildRemoved(key: string) {}

  onGraphData(data: any) {}

  onLocalRemove() {
    console.log('%s local remove()', this.item.toString());
    // delete item's data.soul

    // un-link this pair

    // remove chain from its parent?????
    // or just put(null)?
    this.chain.put(null as never);
  }
}
