import { GunChain } from '../../../../../../ng-gun/src/lib/classes/GunChain';
import * as Gun from 'gun';
import {
  concatMap,
  map,
  mergeMap,
  take,
  mergeAll,
  takeLast,
  delay,
  catchError,
} from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import { distinct } from 'rxjs/operators';
const quit = Symbol('unmatched');
const SOUL_KEY = 'soul';
const CLASS_KEY = 'className';
const ARRAY_PREFIX = '__';
const ARRAY_PRIMITIVE_PREFIX = '&%';

function setItemSoul(item: any, soul: string) {
  if (!item.data) {
    item.data = {};
  }
  item.data[SOUL_KEY] = soul;
}

function getItemSoul(item: any) {
  return item.data ? item.data[SOUL_KEY] : null;
}

function getItemNode(parent: GunChain, item: paper.Item) {
  const soul = item.data[SOUL_KEY];
  if (soul) {
    return parent.get(soul);
  } else {
    return parent.set(item as never);
  }
}

function bindItem(node: GunChain, item: paper.Item) {
  console.log('binding data', item);
}

function isPaperObject(data: any) {
  return (
    Array.isArray(data) &&
    data.length >= 2 &&
    typeof data[0] === 'string' &&
    typeof data[1] === 'object'
  );
}

function paperExportToObject(data: any) {
  const soul = getItemSoul(data[1]);
  const obj = {
    className: data[0],
    ...data[1],
  };
  // if (soul) {
  //   obj._ = {
  //     '#': soul,
  //   };
  // }
  return obj;
}

export function bindArray(data: any[], parent: GunChain) {
  // console.log(Gun);
  // find what type of objects are stored in the array
  const prevalentType = data.reduce((accType, val) => {
    if (accType === typeof val) {
      return typeof val;
    } else {
      return quit;
    }
  }, typeof data[0]);

  switch (prevalentType) {
    case quit:
      console.warn('no pevalent type found for %o, uniqueifying', data);
    case 'object':
    case 'array':
      const boundValues = data.reduce((obj, value, index) => {
        const soul = getItemSoul(value) || getUUID(parent);
        setItemSoul(value, soul);
        obj[soul] = { ...value, index };
        return obj;
      }, {});
      return boundValues;
    default:
      return `${JSON.stringify(data)}`;
  }
}

export function bindPaperJSON(data: any, parent: GunChain): any {
  if (isPaperObject(data)) {
    // console.log('handling data of type', data[0], data[1]);
    // const obj = bindExport(data[1]);
    const expObj = paperExportToObject(data);
    const bound = bindPaperJSON(expObj, parent);
    return bound;
    // console.log('bound', bound, expObj);
    // paperExportToObject(data);
  } else if (Array.isArray(data)) {
    // console.log('handling array');
    const bound = data.map((e: any) => bindPaperJSON(e, parent));
    const obj = bindArray(bound, parent);
    return obj;
    // console.log('bound array', obj);
  } else if (typeof data === 'object') {
    // console.log('handling object', data);
    return Object.keys(data).reduce((target: any, key) => {
      const isArray = Array.isArray(data[key]);
      target[isArray ? `${ARRAY_PREFIX}${key}` : key] = bindPaperJSON(
        data[key],
        parent.get(key)
      );
      return target;
    }, {});
  } else {
    // console.log('handling primitive', data);
  }
  return data;
}

export function getUUID(parent: GunChain) {
  return (parent.gun as any)._.root.opt.uuid();
}

export function gunifyProject(node: GunChain, project: paper.Project) {
  // TODO find a way to uniquely identify exported items. This is a chicken and egg problem?
  // TODO like, we need to assign souls to paper items recursively?
  // TODO like... exporting should be done after we've assigned souls (or tentative souls?) to every item we want to export
  const soulless = project.getItems({
    match: (item: any) => {
      // console.log('considering', item);
      return item.data.soul === undefined || item.data.soul === null;
    },
  });
  console.log('found soulless items', soulless);
  soulless.forEach((item) => setItemSoul(item, getUUID(node)));

  const projectData = project.exportJSON({ asString: false });
  const gunified = bindPaperJSON(projectData, node);
  console.log('gunified', gunified);
  // TODO Uncomment this when you're ready for actually putting paper data in graph
  // node.put(gunified);
  return gunified;
}

function loadNode(node: GunChain, ctx?: any): Observable<any> {
  return node
    .map()
    .on({ includeKeys: true })
    .pipe(
      mergeMap((kvp) => {
        const valueOrRef = kvp[0];
        const key = kvp[1];
        console.log({ key, chain: valueOrRef });
        if (Gun.node.is(valueOrRef)) {
          const ref = node.get(key);
          const soul = Gun.node.soul(valueOrRef);
          const subKeys = Object.keys(valueOrRef).filter((k) => k !== '_');
          // console.log('%s  has keys %s', soul, subKeys.join(', '));
          // const subNodes = subKeys.map((sk) => ref.get(sk));
          return from(subKeys).pipe(
            map((sk) => {
              const subLoad = loadNode(ref.get(sk), soul + '/' + sk);
              const r = {} as any;
              r[sk] = subLoad;
              return subLoad;
            }),
            mergeAll()
          );
        } else {
          // console.log('value %s %s', ctx, key, valueOrRef);
          return of(valueOrRef);
        }
      })
    );
}

export function deGunifyLoaded(loaded: any, asArray = false): any {
  if (asArray) {
    return Object.values(loaded).map((v: any) => deGunifyLoaded(v));
  }
  // console.log('degunifying loaded:', loaded);
  if (typeof loaded === 'object') {
    const obj = {} as any;
    const loadedKeys = Object.keys(loaded);
    if (loadedKeys.length === 0) {
      console.warn('possibly unloaded value!!!');
      throw new Error('unloaded key');
    }
    if (loadedKeys.includes('className')) {
      // console.log('should convert to [classname, obj]', loaded);
      const { className, ...degunned } = loaded;
      return [className, deGunifyLoaded(degunned)];
    }
    // tslint:disable-next-line: forin
    for (const key in loaded) {
      const toArray = key.startsWith(ARRAY_PREFIX);
      const value = loaded[key];
      if (toArray) {
        const arrkey = key.replace(ARRAY_PREFIX, '');
        if (typeof value === 'string') {
          // console.log('should unpack to child array: ', key, value);
          obj[arrkey] = JSON.parse(value);
        } else {
          // console.log('should convert to child array: ', key, value);
          obj[arrkey] = Object.values(value).map((v: any) => deGunifyLoaded(v));
        }
      } else {
        const degunned = deGunifyLoaded(value);
        obj[key] = degunned;
      }
      // console.log({ key, degunned });
    }
    return obj;
  }
  return loaded;
}

export function deGunifyProject(node: GunChain, project: paper.Project) {
  node
    .open()
    .pipe(
      delay(1000),
      distinct((v) => JSON.stringify(v))
    )
    .subscribe((loaded: any) => {
      // const keys = Object.keys(loaded);
      // const values = keys.map((k) => [k, loaded[k]]);
      // console.log('loaded project', { keys, values, loaded });
      try {
        const degunned = deGunifyLoaded(loaded, true);
        const stringed = JSON.stringify(degunned, null, 2);
        console.log(
          'should import %o \n%s',
          {
            degunned,
            length: stringed.length,
          },
          stringed
        );
        console.log(stringed);
        // project.clear();
        // project.importJSON(stringed);
      } catch (e) {
        console.warn(e.message);
      }
    });
  // loadNode(node).subscribe((toImport) => console.log('to import', toImport));
}
