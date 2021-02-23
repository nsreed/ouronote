import { GunChain } from '../../../../../../ng-gun/src/lib/classes/GunChain';
import { EXPECT_ARRAY } from './constants';
import * as paper from 'paper';
import { EventEmitter } from '@angular/core';

export class PaperPair {
  // get project(): paper.Project {
  //   return this.scope instanceof paper.Project
  //     ? this.scope
  //     : this.scope.project;
  // }
  protected importing = false;

  save$ = new EventEmitter();

  constructor(
    private scope: any,
    protected project: paper.Project // Do we need the project? The item's `project` property should be able to get it...
  ) {
    if (scope.pair) {
      console.error('CREATING A DUPLICATE PAIR FOR SCOPE', scope);
    }
    scope.pair = this;
  }

  getChild(jsonOrKey: any) {
    // console.log('finding child', jsonOrKey);
    const child = this.scope.children?.find(
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
      if (this.scope instanceof paper.Project) {
        childJSON.className = 'Layer';
      }
      return;
    }
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
    const child = this.project.importJSON([
      childJSON.className,
      scrubbed,
    ] as any);
    // console.log('created', child);
    return child;
  }
}
