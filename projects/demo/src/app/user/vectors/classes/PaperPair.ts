import { EventEmitter } from '@angular/core';
import * as paper from 'paper';
import { buffer, bufferTime, filter, map } from 'rxjs/operators';
import { LogService } from '../../../../../../log/src/lib/log.service';
import {
  EXPECT_PRIMITIVE_ARRAY,
  hasRequired,
  PAPER_STYLE_EMPTY,
} from '../functions/constants';
import { serializeValue } from '../functions/packaging';
import { copyNulls } from '../functions/paper-functions';
import { IItemData } from './IItemData';

export class PaperPair {
  childCache = {} as any;
  protected isImportingJSON = false;
  save$ = new EventEmitter();
  debouncedSave$ = this.save$.pipe(
    filter((v) => !this.ctx.data?.ignore),
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
      Object.getPrototypeOf(this).constructor.name + ' ' + this.ctx.toString()
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
      this.logger.verbose('saving from buffer: ', Object.keys(buf).join(','));
      this.doSave(buf);
    });
  }

  /**
   * Gets a child of this paper object with the provided key
   * @param jsonOrKey The key of the child to find
   * @returns The child with the matching key
   */
  getChild(jsonOrKey: any) {
    // TODO undo + cache invalidation is the hardest problem
    if (!this.childCache[jsonOrKey]) {
      const child = this.ctx.children?.find(
        (i: paper.Item) => i.data.soul === jsonOrKey
      );
      this.childCache[jsonOrKey] = child;
    }
    return this.childCache[jsonOrKey];
  }

  /**
   * Prepares GUN data for paper import
   * @param json The object to sanitize
   */
  scrubJSON(json: any) {
    const scrubbed = { ...json } as any;
    delete scrubbed._;
    delete scrubbed.children;
    delete scrubbed.data;
    delete scrubbed.className;
    delete scrubbed.previousSibling;
    delete scrubbed.selected;
    Object.keys(scrubbed).forEach((k) => {
      if (EXPECT_PRIMITIVE_ARRAY.includes(k)) {
        const parsed = JSON.parse(scrubbed[k]);
        // this.logger.log('  deserializing %s', k, scrubbed[k], parsed);
        scrubbed[k] = parsed;
      }
    });
    return scrubbed;
  }

  /**
   * Creates a new paper item under this item, given a JSON object describing the child
   * @param childJSON the JSON from which to construct the child
   * @param key the soul from whence the child came
   * @returns the child if one was created, undefined if there was an error
   */
  constructChild(childJSON: any, key: string) {
    // this.logger.log('constructing child: %o', childJSON);
    if (!childJSON.className) {
      this.logger.verbose('child has no class name', childJSON);
      if (this.ctx instanceof paper.Project) {
        childJSON.className = 'Layer';
      }
      return;
    }
    if (!hasRequired(childJSON)) {
      this.logger.verbose('child does not have required fields', childJSON);
      return;
    }
    const prevInsertItemsValue = (this.scope.settings as any).insertItems;
    (this.scope.settings as any).insertItems = false;
    const scrubbed = {
      ...PAPER_STYLE_EMPTY,
      ...childJSON,
    };
    delete scrubbed._;
    delete scrubbed.children;
    delete scrubbed.data;
    delete scrubbed.className;
    delete scrubbed.previousSibling;
    delete scrubbed.selected;
    scrubbed.data = {
      soul: key,
      path: childJSON._['#'],
    } as IItemData;
    Object.keys(scrubbed).forEach((k) => {
      if (EXPECT_PRIMITIVE_ARRAY.includes(k)) {
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

  /**
   * Requests this object be persisted to GUN
   * @param properties An array of property names to save
   * @returns void
   */
  save(properties?: string | string[]) {
    this.logger.verbose('save()');
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
      // this.saveProperty$.emit(properties as any);
    }

    this.save$.emit();
  }

  destroy() {
    this.logger.log('destroying');
  }

  /**
   * Persists this item's JSON to GUN
   * @param json the object value to save
   */
  protected doSave(json?: any) {
    // ...
  }
}
