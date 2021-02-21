import { EventEmitter } from '@angular/core';
import { GunChain } from 'ng-gun';
import { take, map, shareReplay } from 'rxjs/operators';
import { after$ } from '../../../functions/aspect-rx';
import { bindPaperJSON } from '../edit-vector/converter-functions';
import { Observable, fromEventPattern, from, fromEvent } from 'rxjs';

const HIDDEN_DATA_KEYS = ['soul'];

const IGNORED_DATA_KEYS = ['ignore'];

// type PaperGun<T extends paper.Item | paper.Project> = T & {
//   gun: PaperChain<T>;
// };

export const propertyChange$ = <T = any, K extends keyof T = any>(
  item: T,
  property: K
): Observable<T[K]> => {
  if (typeof property !== 'string') {
    throw new Error('BAD PROP');
  }
  const propertyName = `_${property}`;
  const underlyingKey = `__${property}`;
  const emitterName = `${property}$`;

  const priorValue = item[property];

  if ((item as any)[emitterName]) {
    return (item as any)[emitterName] as EventEmitter<T[K]>;
  }
  const emitter = new EventEmitter();
  // (item as any)[emitterName] = fromEventPattern(
  //   (handler) => {
  //     const signal = {
  //       stop: false,
  //     };

  //     (item as any).on(`${property}Change`, (value: any) => {
  //       handler(value);
  //     });

  //     return signal;
  //   },
  //   (handler, signal) => {
  //     signal.stop = true;
  //   }
  // );
  (item as any)[emitterName] = emitter;
  const cap = property.charAt(0).toUpperCase() + property.slice(1);
  const setter = `set${cap}`;
  const getter = `get${cap}`;
  Object.defineProperty(item, property, {
    set: (value) => {
      (item as any)[setter](value);
      emitter.emit(value);
      // (item as any).emit(`${property}Change`, {
      //   type: `${property}Change`,
      //   value,
      // });
    },
    get: () => {
      if (item === undefined) {
        console.warn('no this');
        return undefined;
      }
      return (item as any)[getter]();
    },
  });

  if (priorValue) {
    (item as any)[property] = priorValue as any;
  }

  return (item as any)[emitterName];
};

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
