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
import { getUUID as getSetKey } from '../edit-vector/converter-functions';
import {
  hasRequired,
  MUTATIONS,
  MUTATION_PROPERTIES,
  SAVE_DEBOUNCE,
} from '../functions/constants';
import { getDeep, getShallow, serializeValue } from '../functions/packaging';
import { PaperPair } from './PaperPair';
import { SaveStrategy } from './SaveStrategy';

export class ItemPair extends PaperPair {
  graphValue: any;
  savedValue: any = {};
  graph$ = this.chain
    .on({ changes: true, bypassZone: true } as GunChainCallbackOptions)
    .pipe(shareReplay(1));

  readonly z = this.chain.get('z');
  z$ = this.z.on();

  previousSibling = this.chain.get('previousSibling');

  graphValue$ = this.graph$.pipe(
    filter((json) => hasRequired(json))
    // distinct((v) => JSON.stringify(v)),
    // tap((value) => (this.graphValue = value))
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
    item.data.path = chain.pathFromRecord.join('/');
    this.setup();
  }

  destroy() {
    super.destroy();
    this.item.children?.forEach((c: any) => {
      c.pair?.destroy();
    });
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
      this.logger.log('full save');
      let shallow = this.getShallow();
      if (this.item.className === 'PointText') {
        shallow = {
          ...shallow,
          justification: (this.item as paper.PointText).justification,
          fontFamily: (this.item as paper.PointText).fontFamily,
          fontWeight: (this.item as paper.PointText).fontWeight,
        };
      }
      // console.log('saving', shallow);
      this.chain.put(shallow);
      const prevGun =
        (this.item.previousSibling as any)?.pair?.chain.gun || null;
      this.chain.get('previousSibling').put(prevGun as never); // FIXME this breaks for rasters
    } else {
      this.savedValue = {
        ...this.savedValue,
        ...json,
      };
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
        this.logger.log('item removed.');
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

    this.previousSibling.on().subscribe((previousSibling) => {
      this.logger.verbose('got previousSibling', previousSibling);
      if (!previousSibling) {
        this.item.sendToBack();
        return;
      }
      const prevSibSoul = previousSibling._['#'];
      this.item.data.previousSibling = previousSibling;
      const prevItem = this.project.getItem({
        match: (i: any) => {
          return i.data.path === prevSibSoul;
        },
      });

      if (prevItem) {
        this.logger.verbose('found previousSibling', prevItem);
        this.item.insertAbove(prevItem);
      } else {
        // This might not be a problem, just logging
        this.logger.verbose('could not find previous sibling', prevSibSoul);
      }
    });
  }

  /**
   * Processes all children of this item. See: onLocalChild()
   */
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
        const childKey = getSetKey(this.chain).replace(/~.*/, '');
        childNode = this.children.get(childKey);
        childObj.data.soul = childKey;
      } else {
        // This is a cached child
        childNode = this.children.get(childObj.data.soul);
      }
      childObj.data.path = childNode.pathFromRecord.join('/');
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

  /**
   * Applies incoming changes from GUN to this item
   * @param json The GUN value for this item
   * @returns void
   */
  onGraph(json: any) {
    if (this.editing) {
      this.logger.log('ignored incoming graph update because editing');
      return;
    }
    // console.log('%s onGraph', this.item.toString());
    if (!json) {
      this.logger.warn('  NO JSON! SHOULD REMOVE???');
    }
    const scrubbed = this.scrubJSON(json, this.item.data.soul);

    if (Object.keys(this.savedValue).length > 0) {
      // console.log('ignoring update, waiting for:', this.savedValue);
      Object.keys(json)
        .filter((k) => Object.keys(this.savedValue).includes(k))
        .forEach((k) => {
          const saved = this.savedValue[k];
          const graph = json[k];
          if (graph === saved) {
            // console.log('got expected value');
            delete this.savedValue[k];
            // delete scrubbed[k];
          } else {
            // console.log('got different value');
            delete scrubbed[k];
          }
        });
    } else {
      if (this.graphValue) {
        Object.keys(json).forEach((k) => {
          const oldVal = this.graphValue[k];
          const newVal = json[k];
          if (oldVal === newVal) {
            // console.log('no diff for ', k, oldVal, newVal);
            delete scrubbed[k];
          } else {
            // console.log('diff for ', k);
          }
        });
      }
      delete scrubbed.className;
      delete scrubbed.selected;

      if (Object.keys(scrubbed).length === 1) {
        // console.log('no keys to import');
        // return;
      } else {
        const imported = this.item.importJSON([
          this.item.className,
          scrubbed,
        ] as any) as any;
        if (imported !== this.item) {
          this.logger.error('unexpected new item!!!');
        }
      }
    }
    this.graphValue = { ...json };
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
        // child.remove();
        // this.childSouls.delete(key);
        // delete this.childCache[key];
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
      toInsert.forEach((child) => {
        // Look for the item that should be above this one
        if (!child.data.previousSibling) {
          this.logger.verbose('found bottom child', child);
          child.sendToBack();
          return;
        }
        const below = this.item.getItem({
          match: (item: any) =>
            item.data.previousSibling &&
            item.data.previousSibling._['#'] === child.data.path,
        });
        if (below) {
          this.logger.verbose('should insert below', below);
          child.insertBelow(below);
        } else {
          // Look for the item that should be below this one
          const above = this.item.getItem({
            match: (item: any) =>
              child.data.previousSibling &&
              item.data.path === child.data.previousSibling._['#'],
          });
          if (above) {
            this.logger.verbose('should insert above', above.data.path);
            child.insertAbove(above);
          } else {
            this.logger.error(
              'could not find insert location for',
              child.data.path
            );
          }
        }
      });
      this.arrangeLocalChildren();
      this.isInsertingFromGraph = false;
    }
  }

  arrangeLocalChildren() {
    // Find the bottom child (should have no data.previousSibling)
    // Send it to back
    // find next child with current set as previousSibling, iteratively

    let c =
      this.item.getItem({
        match: (i: paper.Item) => !i.data.previousSibling,
      }) || this.item.firstChild;

    while (c) {
      const next = this.item.getItem({
        match: (i: paper.Item) =>
          i.data.previousSibling?._['#'] === c.data.path,
      });
      if (next) {
        next.insertAbove(c);
      }
      c = next;
    }
  }

  /**
   * Handles this item's .remove()
   */
  onLocalRemove() {
    if (this.item.data.ignore) {
      return;
    }
    this.chain.put(null as never);
  }
}
