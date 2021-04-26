import * as Gun from 'gun';
import { from, of } from 'rxjs';
import {
  bufferTime,
  filter,
  map,
  mapTo,
  mergeMap,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { LogService } from '../../../../../../log/src/lib/log.service';
import {
  GunChain,
  GunChainCallbackOptions,
} from '../../../../../../ng-gun/src/lib/classes/GunChain';
import { after$, before$, returned } from '../../../functions/aspect-rx';
import { ItemGraph } from '../../ItemGraph';
import { getUUID } from '../edit-vector/converter-functions';
import {
  EXPECT_ARRAY,
  hasRequired,
  MUTATIONS,
  MUTATION_PROPERTIES,
  SAVE_DEBOUNCE,
} from './constants';
import { serializeValue } from './packaging';
import { PaperPair } from './PaperPair';
import { SaveStrategy } from './SaveStrategy';

export class ItemPair extends PaperPair {
  graphValue: any;
  graph$ = this.chain
    .on({ changes: true, bypassZone: true } as GunChainCallbackOptions)
    .pipe(shareReplay(1));

  graphValue$ = this.graph$.pipe(
    filter((json) => hasRequired(json)),
    // distinct((v) => JSON.stringify(v)),
    tap((value) => (this.graphValue = value))
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

  // FIXME find a better way to buffer by time window -
  // bufferTime() continuously emits, causing expensive filtering for thousands of objects!
  childrenBuffer$ = this.children$.pipe(
    filter((childVK) => !this.childSouls.has(childVK[1])),
    tap((childVK) => {
      this.childSouls.add(childVK[1]);
    }),
    bufferTime(SAVE_DEBOUNCE),
    filter((children) => children.length > 0)
  );

  afterRemove$ = after$(this.item, 'remove');

  // Local Methods
  isInsertingFromGraph = false;
  beforeImportJSON$ = before$(this.item, 'importJSON');
  afterImportJSON$ = after$(this.item, 'importJSON');
  afterInsertChild$ = after$(this.item, 'insertChild').pipe(
    map(returned),
    tap((item) =>
      this.isInsertingFromGraph
        ? this.logger.log('ignored %o because children are being imported')
        : {}
    ),
    filter((item) => !this.item.data.ignore && !item.data.ignore),
    filter(
      (item) =>
        !this.isInsertingFromGraph && item !== null && item !== undefined
    ),
    switchMap((item) =>
      this.isImportingJSON ? this.afterImportJSON$.pipe(mapTo(item)) : of(item)
    )
  );
  afterAddChild$ = after$(this.item, 'addChild').pipe(
    map(returned),
    filter(
      (item) =>
        !this.isInsertingFromGraph && item !== null && item !== undefined
    ),
    switchMap((item) =>
      this.isImportingJSON ? this.afterImportJSON$.pipe(mapTo(item)) : of(item)
    )
  );

  localChange$ = from((MUTATIONS[this.item.className] || []) as string[]).pipe(
    mergeMap((method: string) =>
      after$(this.item, method).pipe(
        map((v: any) => MUTATION_PROPERTIES[method])
      )
    )
  );

  editing = false;

  constructor(
    private chain: GunChain<ItemGraph>,
    private item: paper.Item,
    project: paper.Project,
    scope: paper.PaperScope,
    logger: LogService
  ) {
    super(item, project, scope, logger);
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
    if (this.isImportingJSON) {
      console.warn('tried to save while importing');
      return;
    }
    if (this.item.data.ignore) {
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
    this.beforeImportJSON$.subscribe(() => (this.isImportingJSON = true));
    this.afterImportJSON$.subscribe(() => (this.isImportingJSON = false));
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
      .pipe(
        // tap(() => {
        //   if (this.isImportingJSON) {
        //     this.logger.verbose('ignoring local change because importing JSON');
        //   }
        // }),
        filter(
          (v) =>
            (this.project as any).pair.saveStrategy === SaveStrategy.AUTOMATIC
        ),
        filter((v) => !this.isImportingJSON)
      )
      .subscribe((change: [string, any]) => {
        this.logger.verbose('%s %s change', this.item.toString(), change[0]);
        const value = change[1];
        this.saveProperty$.emit([change[0], serializeValue(value)]);
        this.save();
      });
    this.localChange$
      .pipe(
        filter(
          (v) =>
            (this.project as any).pair.saveStrategy === SaveStrategy.AUTOMATIC
        )
      )
      .subscribe((data) => {
        this.logger.verbose('localChange$', data);
        if (Array.isArray(data)) {
          data.forEach((propName: string) => {
            const serializedValue = serializeValue(
              (this.item as any)[propName]
            );
            this.saveProperty$.emit([propName, serializedValue]);
          });
          this.save();
        } else {
          // TODO handle this (will be necessary for supporting function interceptions that change non-array values)
          this.logger.warn('onLocalChange$ was not an array, not saving!!!');
        }
      });
  }

  onLocalChildren() {
    this.item.children?.forEach((item) => {
      this.onLocalChild(item);
    });
  }

  onLocalChild(localChild: paper.Item) {
    if (!localChild) {
      this.logger.warn('null child');
      return;
    }
    if (localChild.data.ignore) {
      this.logger.warn('tried to pair an ignored child!');
      return;
    }
    const childObj = localChild as any;
    if (!childObj.pair) {
      if (!childObj.data.soul) {
        const soul = getUUID(this.chain as any);
        childObj.data.soul = soul;
      }
      const childGun = this.children.get(childObj.data.soul);
      const childPair = new ItemPair(
        childGun,
        localChild,
        this.project,
        this.scope,
        this.logger
      );
      childObj.pair = childPair;
    }
  }

  onGraph(json: any) {
    this.graphValue = json;
    if (this.editing) {
      this.logger.log('ignored incoming graph update because editing');
      return;
    }
    // FIXME path segments getting overwritten by previous saves
    // FIXME occasionally only the first debounce of a path will be saved
    // console.log('%s onGraph', this.item.toString());
    if (!json) {
      this.logger.warn('  NO JSON! SHOULD REMOVE???');
    }
    const scrubbed = this.scrubJSON(json, this.item.data.soul);
    delete scrubbed.className;
    const imported = this.item.importJSON([
      this.item.className,
      scrubbed,
    ] as any) as any;
    if (imported !== this.item) {
      this.logger.error('unexpected new item!!!');
    }
  }

  onGraphChildren(data: any[]) {
    if (data.length === 0) {
      return;
    }
    this.logger.log(
      'onGraphChildren',
      data
        .map((v) => v[0] as Partial<paper.Item>)
        .filter((i) => i !== null)
        .map((i) => `${i.className} ${Gun.node.soul(i as any)}`)
    );
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
        if (newChild) {
          // TODO Performance: onLocalChild sets up **everything** on **every** child in this loop, can we suffice for deferred setups???
          this.onLocalChild(newChild);
          toInsert.push(newChild);
        }
      }
    });

    if (toInsert.length > 0) {
      this.logger.log('inserting %d paper items', toInsert.length);
      this.isInsertingFromGraph = true;
      this.item.insertChildren(this.item.children.length, toInsert as any);
      this.isInsertingFromGraph = false;
    }
  }

  onLocalRemove() {
    if (this.item.data.ignore) {
      return;
    }
    this.chain.put(null as never);
  }
}
