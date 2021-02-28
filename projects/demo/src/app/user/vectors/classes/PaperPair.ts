import { GunChain } from '../../../../../../ng-gun/src/lib/classes/GunChain';
import { EXPECT_ARRAY } from './constants';
import * as paper from 'paper';
import { EventEmitter } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

export class PaperPair {
  // get project(): paper.Project {
  //   return this.scope instanceof paper.Project
  //     ? this.scope
  //     : this.scope.project;
  // }
  protected importing = false;

  save$ = new EventEmitter();
  debouncedSave$ = this.save$.pipe(debounceTime(100));

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
    this.debouncedSave$.subscribe(() => this.doSave());
  }

  getChild(jsonOrKey: any) {
    // console.log('finding child', jsonOrKey);
    const child = this.ctx.children?.find(
      (i: paper.Item) => i.data.soul === jsonOrKey
    );
    return child;
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

  save() {
    if (this.ctx?.data?.ignore) {
      console.warn('tried saving ignored item');
      return;
    }
    this.save$.emit();
  }

  doSave() {
    // ...
  }
}
