import {
  GunChain,
  GunChainCallbackOptions,
} from '../../../../../../ng-gun/src/lib/classes/GunChain';
import { EXPECT_ARRAY, hasRequired } from './constants';
import * as paper from 'paper';
import { EventEmitter } from '@angular/core';
import { serializeValue } from './packaging';
import {
  buffer,
  debounceTime,
  reduce,
  scan,
  map,
  filter,
  distinct,
  shareReplay,
  bufferTime,
} from 'rxjs/operators';

export class PaperPair {
  // get project(): paper.Project {
  //   return this.scope instanceof paper.Project
  //     ? this.scope
  //     : this.scope.project;
  // }
  protected importing = false;

  save$ = new EventEmitter();
  debouncedSave$ = this.save$.pipe(
    filter((v) => !this.ctx.data.ignored),
    bufferTime(100)
  );
  saveProperty$ = new EventEmitter<[string] | [string, any]>();
  saveBuffer$ = this.saveProperty$.pipe(
    buffer(this.debouncedSave$),
    filter((v) => v.length > 0),
    map((v) =>
      v.reduce((propertyBuffer, val) => {
        const propertyName = val[0];
        const propertyValue =
          val.length > 1 ? val[1] : serializeValue(this.ctx[propertyName]);
        propertyBuffer[propertyName] = Array.isArray(propertyValue)
          ? JSON.stringify(propertyValue)
          : propertyValue;
        return propertyBuffer;
      }, {} as any)
    )
  );
  childCache = {} as any;
  lastSavedKeys: string[] = [];

  constructor(
    private ctx: any,
    protected project: paper.Project, // Do we need the project? The item's `project` property should be able to get it...
    protected scope: paper.PaperScope
  ) {
    // console.log('%s Pair', ctx.toString());
    if (ctx.pair) {
      console.error('CREATING A DUPLICATE PAIR FOR SCOPE', ctx);
    }
    ctx.pair = this;
    // this.debouncedSave$.subscribe(() => this.doSave());
    this.saveBuffer$.subscribe((buf) => {
      if (this.ctx?.data.ignore || this.importing) {
        console.warn('cannot save');
        return;
      }
      // TODO find a way to ignore the next incoming change for these keys
      this.lastSavedKeys = Object.keys(buf);
      this.doSave(buf);
      // console.log('save buffer');
      // console.log(buf);
    });
  }

  hasChild(key: string) {
    return this.childCache[key] === undefined;
  }

  getChild(jsonOrKey: any) {
    // console.log('finding child', jsonOrKey);
    if (!this.childCache[jsonOrKey]) {
      const child = this.ctx.children?.find(
        (i: paper.Item) => i.data.soul === jsonOrKey
      );
      this.childCache[jsonOrKey] = child;
    }
    return this.childCache[jsonOrKey];
  }

  scrubJSON(json: any, key: string) {
    const scrubbed = { ...json } as any;
    delete scrubbed._;
    delete scrubbed.children;
    delete scrubbed.data;
    delete scrubbed.className;
    scrubbed.data = {
      soul: key,
    };
    Object.keys(scrubbed).forEach((k) => {
      if (EXPECT_ARRAY.includes(k)) {
        // console.log('  deserializing %s', k, scrubbed[k]);
        scrubbed[k] = JSON.parse(scrubbed[k]);
      }
    });
    return scrubbed;
  }

  constructChild(childJSON: any, key: string) {
    // console.log('constructing child: %o', childJSON);
    if (!childJSON.className) {
      console.warn('child has no class name', childJSON);
      if (this.ctx instanceof paper.Project) {
        childJSON.className = 'Layer';
      }
      return;
    }
    const prevInsertItemsValue = (this.scope.settings as any).insertItems;
    (this.scope.settings as any).insertItems = false;
    const scrubbed = {
      ...childJSON,
    };
    delete scrubbed._;
    delete scrubbed.children;
    delete scrubbed.data;
    delete scrubbed.className;
    scrubbed.data = {
      soul: key,
    };
    Object.keys(scrubbed).forEach((k) => {
      if (EXPECT_ARRAY.includes(k)) {
        scrubbed[k] = JSON.parse(scrubbed[k]);
      }
    });
    // scrubbed.data.soul = key;
    // scrubbed.name = scrubbed.name || key;
    const stringed = JSON.stringify([childJSON.className, scrubbed]);
    let child: any;
    if (childJSON.className === 'Layer') {
      // If the Project already has a layer, using importJSON will merge the incoming layer with it,
      // so we have to use its constructor instead
      // console.log('child is layer, forcing new Layer()');
      child = new paper.Layer();
      child.importJSON(stringed);
    } else {
      child = this.project.importJSON(stringed);
    }
    // console.log('created', child);
    (this.scope.settings as any).insertItems = prevInsertItemsValue;
    return child;
  }

  save(properties?: string[]) {
    if (this.ctx?.data?.ignore) {
      console.warn('tried saving ignored item');
      return;
    }

    if (properties) {
      properties.forEach((name) => this.saveProperty$.emit([name]));
    }

    this.save$.emit();
  }

  protected doSave(json: any) {
    // ...
  }
}
