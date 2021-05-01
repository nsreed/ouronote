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
  const setFnName = `set${cap}`;
  const getFnName = `get${cap}`;
  const setter =
    (item as any)[setFnName] ||
    ((value: any) => ((item as any)[propertyName] = value));
  const getter =
    (item as any)[getFnName] || (() => (item as any)[propertyName]);

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
      // TODO predefine get/set before property to skip this check on every access
      if (!(item as any)[setFnName]) {
        // console.warn('no setter for', property);
        (item as any)[propertyName] = value;
      } else {
        (item as any)[setFnName](value);
      }
      // setter(value);
      // TODO only emit if value changed
      emitter.emit(value);
    },
    get: () => {
      // return getter();
      if ((item as any)[getFnName]) {
        return (item as any)[getFnName]();
      }
      // console.warn('no getter for %s', property);
      return (item as any)[propertyName];
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
