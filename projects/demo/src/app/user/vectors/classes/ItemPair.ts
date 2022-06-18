import * as Gun from 'gun';
import { from, of } from 'rxjs';
import {
  bufferTime,
  filter,
  map,
  mapTo,
  mergeAll,
  mergeMap,
  scan,
  shareReplay,
  skip,
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
  getMissing,
  hasRequired,
  MUTATIONS,
  MUTATION_PROPERTIES,
  SAVE_DEBOUNCE,
} from '../functions/constants';
import { getDeep, getShallow, serializeValue } from '../functions/packaging';
import { PaperPair } from './PaperPair';
import { SaveStrategy } from './SaveStrategy';
import {
  PAPER_STYLE_DEFAULTS,
  PAPER_STYLE_EMPTY,
} from '../functions/constants';
import { IterableDiffers } from '@angular/core';
import { defaultsFor } from '../functions/paper-functions';
import { PairedItem } from './paper-pair';
import { around } from 'aspect-ts';
import { take, distinct } from 'rxjs/operators';
import { NgSeaService } from '../../../../../../ng-gun/src/lib/ng-sea.service';

export class ItemPair extends PaperPair {
  private ipTimer = this.logger.time('ItemPair');
  settings = {
    forceImport: false,
  };
  graphValue: any;
  savedValue: any = {};
  readonly graph$ = this.chain.on().pipe(shareReplay(1));
  readonly graphValue$ = this.graph$.pipe(filter((json) => hasRequired(json)));
  readonly graphRemove$ = this.graph$.pipe(filter((json) => json === null));

  readonly previousSibling = this.chain.get('previousSibling');

  // Graph Methods
  readonly childSouls = new Set<string>();
  readonly children = this.chain.get('children');

  readonly childMap = this.children.map();
  readonly children$ = this.childMap
    .on({
      includeKeys: true,
      bypassZone: true,
    })
    .pipe(shareReplay(1));

  readonly childrenReady$ = this.children$.pipe(
    filter((c) => hasRequired(c[0]))
  );
  readonly childrenBuffer$ = this.childrenReady$.pipe(
    filter((childVK) => {
      const newChild = !this.childSouls.has(childVK[1]);
      if (newChild) {
        this.childSouls.add(childVK[1]);
      }
      return newChild;
    }),
    bufferTime(200),
    filter((children) => children.length > 0),
    shareReplay(1)
  );
  readonly childrenRemoved$ = this.children$.pipe(
    filter((c) => c[0] === null || c[0] === undefined)
  );

  readonly afterRemove$ = after$(this.item, 'remove');

  // Local Methods
  isInsertingFromGraph = false;
  readonly beforeImportJSON$ = before$(this.item, 'importJSON');
  readonly afterImportJSON$ = after$(this.item, 'importJSON');
  readonly afterInsertChild$ = after$(this.item, 'insertChild').pipe(
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
      this.isImportingJSON
        ? this.afterImportJSON$.pipe(mapTo(item), take(1))
        : of(item)
    )
  );

  // afterAddChild$ = after$(this.item, 'addChild').pipe(
  //   map(returned),
  //   filter((item) => {
  //     return !this.isInsertingFromGraph && item !== null && item !== undefined;
  //   }),
  //   switchMap((item) => {
  //     return this.isImportingJSON
  //       ? this.afterImportJSON$.pipe(mapTo(item))
  //       : of(item);
  //   })
  // );

  readonly localChange$ = from(
    (MUTATIONS[this.item.className] || []) as string[]
  ).pipe(
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
    // TODO Verify images + enable user denylist
    // this.logger.monitor(this, 'setup', 20);
    // this.logger.monitor(this, 'onGraphChildren', 20);
    // this.logger.monitor(this, 'onGraphChild', 20);
    // this.logger.monitor(this, 'onLocalChildren', 20);
    // this.logger.monitor(this, 'onLocalChild', 20);
    // this.logger.monitor(this, 'arrangeLocalChildren', 20);
    // this.logger.monitor(this, 'constructChild', 20);
    this.logger.timeEnd('ItemPair');
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

  async doSave(json?: any) {
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
      this.logger.verbose('full save');
      let shallow = this.getShallow();
      if (this.item.className === 'PointText') {
        shallow = {
          ...shallow,
          justification:
            (this.item as paper.PointText).justification ||
            PAPER_STYLE_DEFAULTS.PointText.justification ||
            PAPER_STYLE_EMPTY.justification,
          fontFamily:
            (this.item as paper.PointText).fontFamily ||
            PAPER_STYLE_DEFAULTS.PointText.fontFamily ||
            PAPER_STYLE_EMPTY.fontFamily,
          fontWeight:
            (this.item as paper.PointText).fontWeight ||
            PAPER_STYLE_DEFAULTS.PointText.fontWeight ||
            PAPER_STYLE_EMPTY.fontWeight,
          ...defaultsFor(this.item, shallow),
        };
      }
      if (this.item.className === 'Raster') {
        // const signed = await this.chain.auth().sign(shallow.source);
        // console.log('signed: ', signed);
        // shallow.source = signed;
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
    // this.logger.time('setup methods');
    around(this, 'onGraphChildren', (...args: any[]) => {
      const notify = args.pop();
      this.project.view.autoUpdate = false;
      const ret = notify(...args);
      this.project.view.autoUpdate = true;
      return ret;
    });
    this.afterRemove$.subscribe(() => this.onLocalRemove());
    this.beforeImportJSON$.subscribe(() => (this.isImportingJSON = true));
    this.afterImportJSON$.subscribe(() => (this.isImportingJSON = false));
    // TODO? ignoreInsert causing multiple local child adds to be ignored???
    // this.afterImportJSON$.subscribe(() => this.save()); // TODO WTF??? Was that needed?
    this.afterInsertChild$.subscribe((child) => this.onLocalChild(child));
    // this.logger.timeEnd('setup methods');

    // this.logger.time('setup graph'); // TODO ~5ms here
    this.graphValue$.subscribe((json) => this.onGraph(json));
    this.graphRemove$.subscribe(() => {
      if (this.item.isInserted()) {
        this.logger.verbose('item removed.');
        this.item.remove();
      }
    });
    this.previousSibling
      .on()
      .pipe(skip(1))
      .subscribe((previousSibling) => {
        // previousSibling = previousSibling[0];
        // this.logger.verbose('got previousSibling', previousSibling);
        if (!previousSibling) {
          this.item.sendToBack();
          return;
        }
        const prevSibSoul = previousSibling._['#'];
        this.item.data.previousSibling = previousSibling;
        const prevItem = this.project.getItem({
          data: {
            path: prevSibSoul,
          },
        });

        if (prevItem) {
          // this.logger.verbose('found previousSibling', prevItem);
          this.item.insertAbove(prevItem);
        } else {
          // This might not be a problem, just logging
          this.logger.verbose('could not find previous sibling', prevSibSoul);
        }
      });
    // this.logger.timeEnd('setup graph');

    // Skip setting up children listeners if we can't have children
    // Note: you'll have to expand this for compound paths, most likely
    if (this.item.className === 'Layer') {
      // this.logger.time('setup children'); // TODO ~5ms here
      this.onLocalChildren();

      this.childrenBuffer$.subscribe((children) => {
        this.onGraphChildren(children);
      });

      this.childrenRemoved$.subscribe((childVK) => {
        this.childSouls.delete(childVK[1]);
      });
      // this.logger.timeEnd('setup children');
    }

    // this.logger.time('setup changes');
    (this.item as any).changes$
      .pipe(
        filter(
          (v) =>
            (this.project as any).pair.saveStrategy ===
              SaveStrategy.AUTOMATIC && !this.isImportingJSON
        )
      )
      .subscribe((change: [string, any]) => {
        this.logger.log('%s %s change', this.item.toString(), change[0]);
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
    // this.logger.timeEnd('setup changes');
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
  async onLocalChild(localChild: PairedItem) {
    // this.logger.log('onLocalChild()');
    if (!localChild) {
      this.logger.warn('null child');
      return;
    }
    if (localChild.data.ignore) {
      this.logger.warn('tried to pair an ignored child!');
      return;
    }

    const childObj = localChild;

    if (childObj.pair) {
      this.logger.log('locally added child has an associated pair.');
      // childObj.pair.save();
      // childObj.pair.doSave();
      return;
    }

    // this.logger.verbose('creating new child pair');

    let childNode;
    if (!childObj.data.soul) {
      // This is a new child, not yet inserted in the graph
      this.logger.verbose('child not present in graph');
      const childKey = getSetKey(this.chain).replace(/~.*/, '');
      childNode = this.children.get(childKey);
      childObj.data.soul = childKey;
    } else {
      // This is a cached child
      childNode = this.children.get(childObj.data.soul);
    }

    childObj.data.path = childNode.pathFromRecord.join('/');

    // Create a new ItemPair for the child
    // const t = this.logger.time('new ItemPair()');
    const childPair = new ItemPair(
      childNode,
      localChild,
      this.project,
      this.scope,
      this.logger
    );
    // this.logger.timeEnd('new ItemPair()', 1000 / 60);
    childObj.pair = childPair;
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
    const scrubbed = this.scrubJSON(json);

    scrubbed.data = {
      soul: this.item.data.soul,
      path: json._['#'],
    };

    if (Object.keys(this.savedValue).length > 0) {
      Object.keys(json)
        .filter((k) => Object.keys(this.savedValue).includes(k))
        .forEach((k) => {
          const saved = this.savedValue[k];
          const graph = json[k];
          if (graph === saved) {
            // this.logger.log(`got expected ${k}`);
            delete this.savedValue[k];
          } else {
            // this.logger.log(`got different ${k}`);
            delete scrubbed[k];
          }
        });
    }

    if (scrubbed.className === 'Raster') {
      // TODO how are we supposed to figure out who wrote this data?
      // const verified = Gun.SEA.verify(scrubbed.source, )
      console.log('should verify raster');
    }

    if (!this.graphValue) {
      this.graphValue = {};
    }

    delete scrubbed.className;
    delete scrubbed.data;
    if (this.settings.forceImport) {
      // console.log(scrubbed);
      const imported = this.item.importJSON([
        this.item.className,
        scrubbed,
      ] as any) as any;
    } else {
      Object.keys(json).forEach((k) => {
        const oldVal = this.graphValue[k];
        const newVal = json[k];
        if (oldVal === newVal) {
          // console.log('no diff for ', k, oldVal, newVal);
          delete scrubbed[k];
        } else {
          // console.log('diff for ', k, oldVal, newVal);
        }
      });

      if (Object.keys(scrubbed).length === 0) {
        // console.log('no keys to import');
        // return;
      } else {
        // console.log(`diffs for ${Object.keys(scrubbed).join(',')}`);
        const imported = this.item.importJSON([
          this.item.className,
          scrubbed,
        ] as any) as any;
        if (imported !== this.item) {
          this.logger.error('unexpected new item!!!');
        }
      }
    }
    this.graphValue = json ? { ...json } : null;
  }

  onGraphChild(key: any, json: any) {
    const child = this.getChild(key);
    if (child && !json) {
      // child was removed - this is handled by the child
      this.logger.verbose(`child ${key} was removed.`);
      // child.remove();
      // this.childSouls.delete(key);
      // delete this.childCache[key];
    } else if (json && !child) {
      // child was added
      // this.logger.verbose(`child ${key} was added.`);

      const childGun = this.children.get(key);
      const childJSON = { ...json }; // TODO this is slow???

      // FIXME If a new child is missing required fields, the child will never be processed
      if (!json.className) {
        childGun
          .get('className')
          .once()
          .subscribe((className: any) => {
            this.logger.log('received missing className: %s', className);
            childGun.once().subscribe((newJSON: any) => {
              this.logger.log('updated child json', newJSON);
              this.onGraphChildren([[newJSON, key]]);
            });
          });
        return;
      }

      if (!hasRequired(json)) {
        // TODO childGun.get(...all required fields).once() & re-call this method
        const missing = getMissing(json);
        this.logger.log('missing values:', missing.join(', '));

        missing.forEach((mk) => {
          childJSON[mk] = PAPER_STYLE_DEFAULTS[childJSON.className][mk];
        });

        from(
          missing.map(
            (k) =>
              childGun
                .get(k)
                .on()
                .pipe(map((v: any) => ({ [k]: v })))
            // .pipe(filter((v) => v !== undefined)) // TODO reduce() these
          )
        )
          .pipe(
            mergeAll(),
            scan((acc, value) => {
              return { ...acc, ...value };
            }, {} as any)
          )
          .subscribe((values) => {
            this.logger.log('got values', values);
          });

        // return;
      }

      const newChild = this.constructChild(childJSON, key);
      if (newChild) {
        // TODO Performance: onLocalChild sets up **everything** on **every** child in this loop, can we suffice for deferred setups???
        this.onLocalChild(newChild);
        // toInsert.push(newChild);
        return newChild;
      } else {
        this.logger.error('Could not create child.');
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
        // toInsert.push(child); // TODO did this fix undo erase???
        return child;
      }
    }
  }

  /**
   * Processes changes to children from the gun graph
   * @param data the list of children to process
   * @returns void
   */
  onGraphChildren(data: any[]) {
    // this.logger.time('onGraphChildren()');
    if (data.length === 0) {
      return;
    }
    // this.logger.verbose(
    //   'onGraphChildren',
    //   data
    //     .map((v) => v[0] as Partial<paper.Item>)
    //     .filter((i) => i !== null)
    //     .map((i) => `${i.className} ${Gun.node.soul(i as any)}`)
    // );

    try {
      this.isInsertingFromGraph = true;
      const toInsert = data
        .map((childVK) => {
          const json = childVK[0];
          const key = childVK[1];
          return this.onGraphChild(key, json);
        })
        .filter((c) => c !== undefined && c !== null) as paper.Item[];

      if (toInsert.length > 0) {
        this.logger.log('inserting %d paper items', toInsert.length);
        this.item.insertChildren(this.item.children.length, toInsert as any);
        // toInsert.forEach((child) => {
        //   // Look for the item that should be above this one
        //   if (!child.data.previousSibling) {
        //     this.logger.verbose('found bottom child', child);
        //     child.sendToBack();
        //     return;
        //   }

        //   const below = this.item.getItem({
        //     match: (item: any) =>
        //       item.data.previousSibling &&
        //       item.data.previousSibling._['#'] === child.data.path,
        //   });

        //   if (below) {
        //     this.logger.verbose('should insert below', below);
        //     child.insertBelow(below);
        //   } else {
        //     // Look for the item that should be below this one
        //     const above = this.item.getItem({
        //       match: (item: any) =>
        //         child.data.previousSibling &&
        //         item.data.path === child.data.previousSibling._['#'],
        //     });

        //     if (above) {
        //       this.logger.verbose('should insert above', above.data.path);
        //       child.insertAbove(above);
        //     } else {
        //       this.logger.error(
        //         'could not find insert location for',
        //         child.data.path
        //       );
        //     }
        //   }
        // });
        this.arrangeLocalChildren();
      }
    } catch (err: any) {
      this.logger.error('Error encountered in onGraphChildren: ', err);
      this.isInsertingFromGraph = false;
    } finally {
      this.isInsertingFromGraph = false;
      // this.logger.timeEnd('onGraphChildren()');
    }
  }

  arrangeLocalChildren() {
    // Find the bottom child (should have no data.previousSibling)
    // Send it to back
    // find next child with current set as previousSibling, iteratively

    // tslint:disable-next-line: no-console
    // console.count('arrangeLocalChildren()');
    // this.logger.time('arrangeLocalChildren()');
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
    // tslint:disable-next-line: no-console
    // this.logger.timeEnd('arrangeLocalChildren()');
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
