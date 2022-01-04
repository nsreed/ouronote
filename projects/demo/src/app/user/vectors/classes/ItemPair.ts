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
  EXPECT_PRIMITIVE_ARRAY,
  hasRequired,
  MUTATIONS,
  MUTATION_PROPERTIES,
  SAVE_DEBOUNCE,
} from '../functions/constants';
import { getDeep, getShallow, serializeValue } from '../functions/packaging';
import { PaperPair } from './PaperPair';
import { SaveStrategy } from './SaveStrategy';
import { isIgnored } from '../functions/paper-functions';
import { EXPECT_KEYED_ARRAY } from '../functions/constants';

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
    filter((childVK) => {
      return (
        childVK[0] === null ||
        childVK[0] === undefined ||
        !this.childSouls.has(childVK[1])
      );
    }),
    tap((childVK) => {
      if (childVK[0] === null || childVK[0] === undefined) {
        this.childSouls.delete(childVK[1]);
      } else {
        this.childSouls.add(childVK[1]);
      }
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
    filter((item) => {
      return !this.isInsertingFromGraph && item !== null && item !== undefined;
    }),
    switchMap((item) => {
      return this.isImportingJSON
        ? this.afterImportJSON$.pipe(mapTo(item))
        : of(item);
    })
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

  /**
   * Returns a deep copy of the item for persistence to gun
   * @param item the item to get a deep object representation from
   * @returns a deep representation of the item
   */
  getDeep(item: paper.Item | any = this.item) {
    return getDeep(item);
  }

  /**
   * Returns a shallow copy of the item for persistence to gun
   * @param item the item to get a shallow object representation from
   * @returns a shallow representation of the item
   */
  getShallow(item: paper.Item = this.item) {
    return getShallow(item);
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
    this.afterImportJSON$.subscribe(() => this.save());
    this.afterInsertChild$.subscribe((child) => this.onLocalChild(child));

    this.graphValue$.subscribe((json) => this.onGraph(json));
    this.graphRemove$.subscribe((json) => {
      if (this.item.isInserted()) {
        this.item.remove();
      }
    });
    this.onLocalChildren();
    this.childrenBuffer$.subscribe((data) => this.onGraphChildren(data));

    (this.item as any).changes$
      .pipe(
        tap(() => {
          if (this.isImportingJSON) {
            this.logger.verbose('ignoring local change because importing JSON');
          }
        }),
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

  /**
   * Processes a child of this item. Creates a Pair object for the child if it doesn't have one.
   * @param localChild the child which should be processed
   * @returns void
   */
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
      let childNode;
      if (!childObj.data.soul) {
        // This is a new child, not yet inserted in the graph
        const soul = getUUID(this.chain).replace(/~.*/, '');
        childNode = this.children.get(soul);
        childObj.data.soul = soul;
      } else {
        // This is a cached child
        childNode = this.children.get(childObj.data.soul);
      }
      // Create a new ItemPair for the child
      const childPair = new ItemPair(
        childNode,
        localChild,
        this.project,
        this.scope,
        this.logger
      );
      childObj.pair = childPair;
    } else {
      this.logger.log('locally added child has an associated pair.');
      childObj.pair.doSave();
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

  /**
   * Processes changes to children from the gun graph
   * @param data the list of children to process
   * @returns void
   */
  onGraphChildren(data: any[]) {
    if (data.length === 0) {
      return;
    }
    this.logger.verbose(
      'onGraphChildren',
      data
        .map((v) => v[0] as Partial<paper.Item>)
        .filter((i) => i !== null)
        .map((i) => `${i.className} ${Gun.node.soul(i as any)}`)
    );

    const toInsert = [] as paper.Item[];
    data.forEach((childVK) => {
      const json = childVK[0];
      const key = childVK[1];

      const child = this.getChild(key);
      if (child && !json) {
        // child was removed - this is handled by the child
        this.logger.verbose(`child ${key} was removed.`);
        // this.childSouls.delete(key);
        delete this.childCache[key]; // TODO verify this works with erase
      } else if (json && !child) {
        // child was added
        this.logger.verbose(`child ${key} was added.`);
        const newChild = this.constructChild(json, key);
        if (newChild) {
          // TODO Performance: onLocalChild sets up **everything** on **every** child in this loop, can we suffice for deferred setups???
          this.onLocalChild(newChild);
          toInsert.push(newChild);
        }
      } else if (child) {
        if (child.parent === null) {
          // This happens for local followed by remote undo
          this.logger.verbose(
            `child ${key} already exists, but does not have a parent`,
            {
              child,
              json,
            }
          );
          // this.item.addChild(child); // FIXME is this breaking undo erase???
          toInsert.push(child); // TODO did this fix undo erase???
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
