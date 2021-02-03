import { GunChain } from '../../../../../../ng-gun/src/lib/classes/GunChain';
import * as Gun from 'gun';
import {
  concatMap,
  map,
  mergeMap,
  take,
  mergeAll,
  takeLast,
} from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
const quit = Symbol('unmatched');
const SOUL_KEY = 'soul';
const CLASS_KEY = 'className';
const ARRAY_PREFIX = '&';
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
  const obj = {
    className: data[0],
    ...data[1],
  };
  const soul = getItemSoul(data[1]);
  if (soul) {
    obj._['#'] = soul;
  }
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
        const soul =
          getItemSoul(value) || (parent.gun as any)._.root.opt.uuid();
        setItemSoul(value, soul);
        // if (value.data) {
        //   value.data['#'] = soul;
        // } else {
        //   value.data = {
        //     '#': soul,
        //   };
        // }
        obj[soul] = { ...value, index };
        return obj;
      }, {});
      // console.log('bound values to object', boundValues);
      return boundValues;
    default:
      return `${JSON.stringify(data)}`;
    // just primitives, stringify it
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
      target[key] = bindPaperJSON(data[key], parent.get(key));
      return target;
    }, {});
  } else {
    // console.log('handling primitive', data);
  }
  return data;
}

export function gunifyProject(node: GunChain, project: paper.Project) {
  const projectData = project.exportJSON({ asString: false });
  const gunified = bindPaperJSON(projectData, node);
  console.log('gunified', gunified);
  // node.put(null as never);
  // node.put(gunified);
  // project.layers.map((layer) => {
  //   bindItem(node, layer);
  // });
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
          console.log('%s  has keys %s', soul, subKeys.join(', '));
          const subNodes = subKeys.map((sk) => ref.get(sk));
          return from(subNodes).pipe(mergeMap((sn) => loadNode(sn)));
        } else {
          console.log('value %s', key, valueOrRef);
          return of(valueOrRef);
        }
      })
    );
}

export function deGunifyProject(node: GunChain, project: paper.Project) {
  // ungunPaperChain(node, null, project);
  // console.log('ungunified', ungun);
  // node.load().subscribe((gunified: any) => {
  //   // console.log('degunifying data', gunified, JSON.stringify(gunified));
  //   // const descs = Object.getOwnPropertyDescriptors(gunified);
  //   // console.log('property descriptors', descs);
  //   const ungun = unBindPaperJSON(gunified);
  //   console.log('ungunified:', ungun);
  // });
  loadNode(node).subscribe((toImport) => console.log('to import', toImport));
}
