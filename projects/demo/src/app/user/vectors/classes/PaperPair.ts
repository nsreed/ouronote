import { EventEmitter } from '@angular/core';
import * as paper from 'paper';
import { buffer, bufferTime, filter, map } from 'rxjs/operators';
import { LogService } from '../../../../../../log/src/lib/log.service';
import { EXPECT_ARRAY, hasRequired } from './constants';
import { serializeValue } from './packaging';

export class PaperPair {
  childCache = {} as any;
  protected isImportingJSON = false;
  save$ = new EventEmitter();
  debouncedSave$ = this.save$.pipe(
    filter((v) => !this.ctx.data.ignore),
    bufferTime(100)
  );
  saveProperty$ = new EventEmitter<[string] | [string, any]>(); // TODO document this...
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

  constructor(
    private ctx: any,
    protected project: paper.Project, // Do we need the project? The item's `project` property should be able to get it...
    protected scope: paper.PaperScope,
    protected logger: LogService
  ) {
    this.logger = logger.supplemental(
      Object.getPrototypeOf(this).constructor.name
    );
    if (ctx.pair) {
      this.logger.error('CREATING A DUPLICATE PAIR FOR SCOPE', ctx);
    }
    ctx.pair = this;

    this.saveBuffer$.subscribe((buf) => {
      if (this.ctx?.data.ignore || this.isImportingJSON) {
        this.logger.warn('cannot save');
        return;
      }
      // TODO find a way to ignore the next incoming change for these keys
      this.doSave(buf);
    });
  }

  hasChild(key: string) {
    return this.childCache[key] === undefined;
  }

  getChild(jsonOrKey: any) {
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
        // this.logger.log('  deserializing %s', k, scrubbed[k]);
        scrubbed[k] = JSON.parse(scrubbed[k]);
      }
    });
    return scrubbed;
  }

  constructChild(childJSON: any, key: string) {
    // this.logger.log('constructing child: %o', childJSON);
    if (!childJSON.className) {
      this.logger.error('child has no class name', childJSON);
      if (this.ctx instanceof paper.Project) {
        childJSON.className = 'Layer';
      }
      return;
    }
    if (!hasRequired(childJSON)) {
      this.logger.error('child does not have required fields', childJSON);
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
    const stringed = JSON.stringify([childJSON.className, scrubbed]);
    let child: any;
    if (childJSON.className === 'Layer') {
      // If the Project already has a layer, using importJSON will merge the incoming layer with it,
      // so we have to use its constructor instead
      // this.logger.log('child is layer, forcing new Layer()');
      child = new paper.Layer();
      child.importJSON(stringed);
    } else {
      child = this.project.importJSON(stringed);
    }
    (this.scope.settings as any).insertItems = prevInsertItemsValue;
    return child;
  }

  save(properties?: string[]) {
    if (this.ctx?.data?.ignore) {
      this.logger.warn('tried saving ignored item');
      return;
    }

    if (properties) {
      if (!Array.isArray(properties)) {
        if (typeof properties === 'string') {
          properties = [properties];
        } else {
          this.logger.error('save() properties argument must string or array');
          return;
        }
      }
      properties.forEach((name) => this.saveProperty$.emit([name]));
    }

    this.save$.emit();
  }

  protected doSave(json: any) {
    // ...
  }
}
