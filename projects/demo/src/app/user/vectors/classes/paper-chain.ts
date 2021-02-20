import { EventEmitter } from '@angular/core';
import { GunChain } from 'ng-gun';
import { take, map, shareReplay } from 'rxjs/operators';
import { after$ } from '../../../functions/aspect-rx';
import { bindPaperJSON } from '../edit-vector/converter-functions';
import { Observable, fromEventPattern } from 'rxjs';

const HIDDEN_DATA_KEYS = ['soul'];

const IGNORED_DATA_KEYS = ['ignore'];

// type PaperGun<T extends paper.Item | paper.Project> = T & {
//   gun: PaperChain<T>;
// };

export const propertyChange$ = <T, K extends keyof T>(
  item: T,
  property: K
): Observable<T[K]> => {
  const propName = `${property}$`;
  if ((item as any)[propName]) {
    return (item as any)[propName] as EventEmitter<T[K]>;
  }
  const emitter = new EventEmitter<T[K]>();
  (item as any)[propName] = emitter;

  // fromEventPattern((handler))
  Object.defineProperty(item, property, {
    set: (value) => {
      (item as any)[`_${property}`] = value;
      emitter.emit(value);
    },
    get: () => {
      return (item as any)[`_${property}`];
    },
  });

  return emitter;
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
