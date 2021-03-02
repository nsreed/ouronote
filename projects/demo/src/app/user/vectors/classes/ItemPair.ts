import * as paper from 'paper';
import { from, Observable, of, timer, fromEvent } from 'rxjs';
import {
  buffer,
  bufferCount,
  bufferTime,
  bufferToggle,
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
import {
  EXPECT_ARRAY,
  hasRequired,
  MUTATIONS,
  MUTATION_PROPERTIES,
} from './constants';
import { unpack, serializeValue } from './packaging';
import { getAllSettable, propertyChange$ } from './paper-chain';
import { PaperPair } from './PaperPair';
import { debounceTime, tap } from 'rxjs/operators';

export class ItemPair extends PaperPair {
  graph$ = this.chain
    .on({ changes: true, bypassZone: true } as GunChainCallbackOptions)
    .pipe(debounceTime(25), shareReplay());
  graphValue$ = this.graph$.pipe(
    filter((json) => hasRequired(json)),
    distinct((v) => JSON.stringify(v))
  );
  graphRemove$ = this.graph$.pipe(filter((json) => json === null));

  // Graph Methods
  childSouls = new Set<string>();
  children = this.chain.get('children');

  childMap = this.children.map();
  children$ = this.childMap
    .on({
      includeKeys: true,
      changes: true,
      bypassZone: true,
    })
    .pipe();

  // FIXME find a better way to buffer by time window - bufferTime() continuously emits, causing expensive filtering for thousands of objects!
  childrenBuffer$ = this.children$.pipe(
    filter((childVK) => !this.childSouls.has(childVK[1])),
    tap((childVK) => {
      this.childSouls.add(childVK[1]);
    }),
    bufferTime(1000),
    filter((children) => children.length > 0)
  );

  afterRemove$ = after$(this.item, 'remove');

  // Local Methods
  ignoreInsert = false;
  beforeImportJSON$ = before$(this.item, 'importJSON');
  afterImportJSON$ = after$(this.item, 'importJSON');
  afterInsertChild$ = after$(this.item, 'insertChild').pipe(
    map(returned),
    filter((item) => !this.item.data.ignored && !item.data.ignored),
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
  localChange$ = from(this.localMutators as string[]).pipe(
    mergeMap((method: string) =>
      after$(this.item, method).pipe(
        map((v: any) => MUTATION_PROPERTIES[method])
      )
    )
  );

  constructor(
    private chain: GunChain<ItemGraph>,
    private item: paper.Item,
    project: paper.Project,
    scope: paper.PaperScope
  ) {
    super(item, project, scope);
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

  doSave(json: any) {
    if (this.importing) {
      console.warn('tried to save while importing');
      return;
    }
    if (this.item.data.ignored) {
      console.warn('tried saving ignored item');
      return;
    }
    if (!json) {
      // We are performing a "dumb" save
      this.chain.put(this.getShallow());
    } else {
      // We were provided the JSON to update
      this.chain.put({
        ...json,
        className: this.item.className,
      });
    }
  }

  setup() {
    this.afterRemove$.subscribe(() => this.onLocalRemove());
    this.beforeImportJSON$.subscribe(() => (this.importing = true));
    this.afterImportJSON$.subscribe(() => (this.importing = false));
    // TODO? ignoreInsert causing multiple local child adds to be ignored???
    this.afterInsertChild$.subscribe((child) => this.onLocalChild(child));

    this.graphValue$.subscribe((json) => this.onGraph(json));
    this.graphRemove$.subscribe((json) => {
      if (this.item.isInserted()) {
        this.item.remove();
      }
    });
    this.onLocalChildren();
    this.childrenBuffer$.subscribe((data) => this.onGraphChildren(data));

    // fromEvent(this.item, 'strokeColorChange').subscribe((change) => {
    //   console.log('%s got native change', this.item.toString(), change);
    // });
    (this.item as any).changes$
      .pipe(filter((v) => !this.importing))
      .subscribe((change: [string, any]) => {
        // console.log('%s %s change', this.item.toString(), change[0]);
        const value = change[1];
        this.saveProperty$.emit([change[0], serializeValue(value)]);
        this.save();
      });
    this.localChange$.subscribe((data) => {
      // console.log('localChange$', data);
      if (Array.isArray(data)) {
        data.forEach((propName: string) => {
          this.saveProperty$.emit([
            propName,
            serializeValue((this.item as any)[propName]),
          ]);
        });
      } else {
        // TODO handle this (will be necessary for supporting function interceptions that change non-array values)
        console.warn('%s onLocalChange$ was not an array, not saving!!!');
      }
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
    if (item.data.ignored) {
      console.warn('tried to pair an ignored child!');
      return;
    }
    const l = item as any;
    if (!l.pair) {
      if (!l.data.soul) {
        const soul = getUUID(this.chain as any);
        l.data.soul = soul;
      }
      const childGun = this.children.get(l.data.soul);
      const childPair = new ItemPair(childGun, item, this.project, this.scope);
      l.pair = childPair;
    }
  }

  onGraph(json: any) {
    // FIXME path segments getting overwritten by previous saves
    // console.log('%s onGraph', this.item.toString());
    if (!json) {
      console.warn('  NO JSON! SHOULD REMOVE???');
    }
    const scrubbed = this.scrubJSON(json, this.item.data.soul);
    delete scrubbed.className;
    const imported = this.item.importJSON([
      this.item.className,
      scrubbed,
    ] as any) as any;
    if (imported !== this.item) {
      console.error('unexpected new item!!!');
    }
  }

  onGraphChildren(data: any[]) {
    // console.log('%s onGraphChildren', this.item.toString());
    // console.log(data);
    const toInsert = [] as paper.Item[];
    data.forEach((childVK) => {
      const soul = childVK[1];
      const json = childVK[0];
      const child = this.getChild(soul);
      if (child && !json) {
        // child was removed - this is handled by the child
      } else if (json && !child) {
        // child was added
        const newChild = this.constructChild(json, soul);
        // TODO Performance: onLocalChild sets up **everything** on **every** child in this loop, can we suffice for deferred setups???
        this.onLocalChild(newChild);
        toInsert.push(newChild);
      }
    });
    this.ignoreInsert = true;
    this.item.insertChildren(this.item.children.length, toInsert as any);
    this.ignoreInsert = false;
  }

  onLocalRemove() {
    if (this.item.data.ignored) {
      return;
    }
    this.chain.put(null as never);
  }
}
