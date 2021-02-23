import { EventEmitter } from '@angular/core';
import { take, map, shareReplay } from 'rxjs/operators';
import { after$ } from '../../../functions/aspect-rx';
import { bindPaperJSON } from '../edit-vector/converter-functions';
import { Observable, fromEventPattern, from, fromEvent } from 'rxjs';
import { GunChain } from 'projects/ng-gun/src/lib/classes/GunChain';

const HIDDEN_DATA_KEYS = ['soul'];

const IGNORED_DATA_KEYS = ['ignore'];

// type PaperGun<T extends paper.Item | paper.Project> = T & {
//   gun: PaperChain<T>;
// };
const IGNORED_PROPS = ['selected', 'segments'];

export const propertyChange$ = <T = any, K extends keyof T = any>(
  item: T,
  property: K
): Observable<T[K]> => {
  if (!item) {
    throw new Error('No item provided!');
  }
  if (typeof property !== 'string') {
    throw new Error('BAD PROP');
  }
  const propertyName = `_${property}`;
  const underlyingKey = `__${property}`;
  const emitterName = `${property}$`;

  if ((item as any)[emitterName]) {
    return (item as any)[emitterName] as EventEmitter<T[K]>;
  }
  const cap = property.charAt(0).toUpperCase() + property.slice(1);
  const setFn = `set${cap}`;
  const getter = `get${cap}`;

  let priorValue: any;

  try {
    priorValue = (item as any)[property];
  } catch (e: any) {
    priorValue = (item as any)[propertyName];
    console.warn(
      '%s error trying to get initial value %s',
      (item as any).toString(),
      property,
      priorValue
    );
    throw e;
  }
  const emitter = new EventEmitter();
  (item as any)[emitterName] = emitter;
  Object.defineProperty(item, property, {
    set: (value) => {
      if (!(item as any)[setFn]) {
        console.warn('no setter for', property);
        (item as any)[propertyName] = value;
      } else {
        (item as any)[setFn](value);
      }
      emitter.emit(value);
    },
    get: () => {
      if ((item as any)[getter]) {
        return (item as any)[getter]();
      }
      // console.warn('no getter for %s', property);
      return (item as any)[propertyName] || null;
    },
  });

  if (priorValue) {
    (item as any)[property] = priorValue as any;
  }

  return (item as any)[emitterName];
};
const settable: any = {};
export function getAllSettable(item: any) {
  if (!item.className) {
    console.error('cannot get settable for a non-item', item);
    return [];
  }
  if (!settable[item.className]) {
    let proto = Object.getPrototypeOf(item);
    let properties: any[] = [];
    while (proto) {
      const likelyProperties = Object.getOwnPropertyDescriptors(proto);
      const props = Object.keys(likelyProperties)
        .map((k) => [likelyProperties[k], k])
        .filter((prop) => {
          const d = prop[0] as PropertyDescriptor;
          return (
            d.enumerable &&
            d.set &&
            !(prop[1] as any).startsWith('on') &&
            !IGNORED_PROPS.includes(prop[1] as any)
          );
        });
      properties = [...properties, ...props];

      // console.log('property descriptors', props);
      // console.log('emitting all from', Object.getOwnPropertyNames(proto));
      proto = Object.getPrototypeOf(proto);
    }
    settable[item.className] = properties;
  }
  return settable[item.className] as [any, string][];
}
export function setupAllEmitters(item: any) {
  let proto = Object.getPrototypeOf(item);
  while (proto) {
    const likelyProperties = Object.getOwnPropertyDescriptors(proto);
    const props = Object.keys(likelyProperties)
      .map((k) => [likelyProperties[k], k])
      .filter((prop) => {
        const d = prop[0] as PropertyDescriptor;
        return d.enumerable && d.set;
      });

    console.log('property descriptors', props);
    // console.log('emitting all from', Object.getOwnPropertyNames(proto));
    proto = Object.getPrototypeOf(proto);
  }
}

const install = <T extends paper.Project | paper.Item>(item: T) => {
  // TODO this should wait for the item to have a project/parent (or wait for gun$ via propertyChange$),
  // ... since we can't construct a node until the object has some kind of parent
  const itemOrProject = item as any;
  if (itemOrProject.gun) {
    return itemOrProject.gun;
  }
  if (itemOrProject instanceof paper.Project) {
    const chain = new ProjectChain(itemOrProject);
    (itemOrProject as any).gun = chain;
  } else {
    const chain = new ItemChain(itemOrProject);
    (itemOrProject as any).gun = chain;
  }
  return itemOrProject.gun;
};

class ProjectChain<T extends paper.Project> extends GunChain<any> {
  constructor(private scope: T) {
    super(null as any, null as any);
    // propertyChange$(scope, 'parent').subscribe();
    // propertyChange$(scope, 'data').subscribe(data=>)
  }
}

class ItemChain<T extends paper.Item> extends GunChain<any> {
  project$ = propertyChange$(this.scope, 'project').pipe(shareReplay(1));
  parent$ = propertyChange$(this.scope, 'parent').pipe(shareReplay(1));
  parentChain$ = this.parent$.pipe(
    map((parent) => install(parent)),
    shareReplay(1)
  );
  constructor(private scope: T) {
    super(null as any, null as any);
    // propertyChange$(scope, 'parent').subscribe();
    // propertyChange$(scope, 'data').subscribe(data=>)
  }
}
