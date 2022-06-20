/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before `zone.js` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code before importing zone.js.
 * import './zone-flags';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js'; // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/* GUN IMPORT */
// TODO move GUN.js imports to a better place
// These are here to make sure they're done before the app loads
import 'gun';
import 'gun/nts';
import 'gun/sea';

import 'gun/lib/store';
import 'gun/lib/rindexed';
import 'gun/lib/load';
import 'gun/lib/open';
import 'gun/lib/then';
import 'gun/lib/time';
import 'gun/lib/not';
import 'gun/lib/unset';

// import 'gun/lib/webrtc';

/* PAPER.JS OVERRIDES
 * Injects rxjs-style property change observables into paper.js
 */
// TODO move paper.js overrides to a better place
// These are here to make sure they're done before the app loads

import * as paper from 'paper';
import { EventEmitter } from '@angular/core';

// FIXME GunSharedWorkerPlugin loses data when using one tab
import { GunSharedWorkerPlugin } from 'projects/ng-gun/src/lib/classes/GunSharedWorkerPlugin';
GunSharedWorkerPlugin.register((window as any).Gun);

import { take } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { getAllSettable } from './app/user/vectors/functions/paper-chain';
import {
  MUTATION_METHODS,
  MUTATION_PROPERTIES,
} from './app/user/vectors/functions/constants';

// tslint:disable: space-before-function-paren
// tslint:disable: only-arrow-functions

const IGNORED_PROPS: string[] = [
  'fullySelected',
  'selected',
  'selection',
  'style',
  'data',
];
const NEEDS_BACKING_PROPERTY: string[] = ['position'];
const BUBBLE_PROPS: string[] = ['fullySelected', 'selected', 'selection'];
const prototypeOwnProperties = {} as any;
MUTATION_METHODS.forEach((name: string) => {
  console.log('mutta', name);
});

const afterProto =
  (proto: any) => (name: string) => (cb: (...args: any[]) => any) => {
    const o = proto[name];
    if (typeof o === 'function') {
      // console.log('after proto', proto.constructor.name, name);
      proto[name] = function (...args: any[]) {
        const r = o.call(this, ...args);
        cb.call(this, r);
        return r;
      };
    }
  };

/**
 * Gets a list of settable properties from a given prototype
 * @param proto the prototype from which the list of settable properties will be derived
 * @returns a list of settable properties belonging to the prototype
 */
function getOwnSettable(proto: any) {
  if (!(proto.constructor.name in prototypeOwnProperties)) {
    const likelyProperties = Object.getOwnPropertyDescriptors(proto);
    const props = Object.keys(likelyProperties)
      .map((k) => [likelyProperties[k], k, proto.constructor])
      .filter((prop) => {
        const d = prop[0] as PropertyDescriptor;
        return (
          d.enumerable &&
          d.set &&
          !(prop[1] as any).startsWith('on') &&
          !IGNORED_PROPS.includes(prop[1] as any)
        );
      });
    prototypeOwnProperties[proto.constructor.name] = props.sort();
  }
  return prototypeOwnProperties[proto.constructor.name];
}

function getEverySettable(proto: any) {
  let properties: any[] = [];
  while (proto) {
    const likelyProperties = Object.getOwnPropertyDescriptors(proto);
    const props = Object.keys(likelyProperties)
      .map((k) => [likelyProperties[k], k, proto])
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
  return properties;
}

function findAncestorWithKey(prototype: any, key: string) {
  while (prototype) {
    if (Object.keys(prototype).includes(key)) {
      return prototype;
    }
    if (Object.getOwnPropertyDescriptor(prototype, key)) {
      return prototype;
    }
    prototype = Object.getPrototypeOf(prototype);
  }
  return null;
}

/**
 * Adds a change emitter, .changes$, to the given prototype
 * @param prototype The prototype to add .changes$ to
 */
function addChangeEmitter(prototype: any) {
  if (!Object.getOwnPropertyDescriptor(prototype, 'changes$')) {
    Object.defineProperty(prototype, 'changes$', {
      get() {
        if (!this._changes$) {
          this._changes$ = new ReplaySubject(1);
        }
        return this._changes$;
      },
      enumerable: false,
    });
  }
}

/**
 * Creates new property setters for a prototype which emit new values on the prototype's changes$ emitter.
 * @param prototype the prototype to inject change emission into
 */
function addChangeListeners(
  cls: any,
  prototype = cls.prototype,
  cnst = prototype.constructor,
  properties = getOwnSettable(cls.prototype)
) {
  console.log(`${cnst.name}`);

  addChangeEmitter(prototype);

  // CONSTRUCTOR OVERRIDES
  if (false && prototype !== paper.Color.prototype) {
    console.log(`overriding ${cnst.name}`);
    const cn = prototype.constructor;
    prototype.constructor = function (...args: any[]) {
      console.log('constructed', cn.name);
      const instance = new cn(...args);
      const keys = Object.keys(instance);
      console.log({ keys });
      return instance;
    };
    const old = (paper as any)[cn.name];
    // console.log(`${cn.name}`, old);
    (paper as any)[cn.name] = prototype.constructor;
    // console.log(`${Object.keys(paper).join(',')}`);
  }

  Object.defineProperty(prototype, 'bubble', {
    get() {
      if (!this._bubble) {
        this._bubble = function (this: any, name: string, ev: any) {
          this.emit(name, ev);
        };
      }
      return this._bubble;
    },
    enumerable: false,
  });

  properties.forEach((prop: any[]) => {
    const property = prop[0];
    const propertyName = prop[1];
    console.log('%s.%s', prototype.constructor.name, propertyName);

    if (NEEDS_BACKING_PROPERTY.includes(propertyName)) {
      const propField = `_${propertyName}`;
      const protoWithField = findAncestorWithKey(prototype, propField);
      if (protoWithField) {
        console.log('creating backing property', protoWithField, propField);
        if (protoWithField[`_${propField}`]) {
          console.log('already created');
        }
        protoWithField[`_${propField}`] = protoWithField[propField];
        Object.defineProperty(protoWithField, propField, {
          enumerable: false,
          get() {
            return this[`__${propertyName}`];
          },
          set(value: any) {
            if (value !== this[`__${propertyName}`]) {
              this[`__${propertyName}`] = value;
              onPropertyChange.call(this, propertyName, value);
            }
          },
        });
      }
    }

    Object.defineProperty(prototype, propertyName, {
      get: property.get,
      set(value: any) {
        try {
          if (this[propertyName] === value) {
            return;
          }
          property.set?.call(this, value);
          onPropertyChange.call(this, propertyName, value);
        } catch (e: any) {
          console.error(`error setting property ${propertyName}`, e);
        }
      },
    });

    if (propertyName === 'position') {
      prototype._position = null;
      const oldTranslate = prototype.translate;
      prototype.translate = function (this: any, ...args: any[]) {
        const op = this.position;
        const r = oldTranslate.call(this, ...args);
        const np = this.position;
        if (op === np) {
          return;
        }
        onPropertyChange.call(this, 'position', this.position);
        return r;
      };
    }
  });
}

function onPropertyChange(this: any, propertyName: string, value: any) {
  this.changes$.next([propertyName, value]);
  if (this.data?.soul) {
    const changeEvent = {
      target: this,
      // bubbles: true,
      propertyName,
      value,
      soul: `${this.data.soul}/${propertyName}`,
    };
    if (this.isInserted() && this.project?.bubble) {
      // console.log('bubbling', propertyName);
      this.project?.bubble('change', changeEvent);
    }
  }
}

// Patch Project
const original = paper.Project.prototype.deselectAll;

paper.Project.prototype.deselectAll = function () {
  original.call(this);
};
// tslint:disable: no-string-literal
const us = (paper.Project.prototype as any)['_updateSelection'];
(paper.Project.prototype as any)['_updateSelection'] = function (
  this: any,
  item: any
) {
  us.call(this, item);
  this.changes$?.next(['selectedItems', this.selectedItems]);
  this.selectedItems$?.next(this.selectedItems);
};
Object.defineProperty(paper.Project.prototype, 'selectedItems$', {
  get() {
    if (!this._selectedItems$) {
      this._selectedItems$ = new ReplaySubject(1);
    }
    return this._selectedItems$;
  },
  enumerable: false,
});
Object.defineProperty(paper.Project.prototype, 'allChanges$', {
  get() {
    if (!this._allChanges$) {
      this._allChanges$ = new EventEmitter();
    }
    return this._allChanges$;
  },
  enumerable: false,
});
// console.log(us);

const oActivate = paper.Project.prototype.activate;
paper.Project.prototype.activate = function () {
  oActivate.call(this);
  (this as any).changes$.next(['active', true]);
};

const oDeselectAll = paper.Project.prototype.deselectAll;
paper.Project.prototype.deselectAll = function () {
  oDeselectAll.call(this);
  (this as any).changes$.next(['selectedItems', this.selectedItems]);
};

const p = afterProto(paper.Project.prototype)('deselectAll')(() =>
  (this as any)?.changes$?.next(['selectedItems', (this as any).selectedItems])
);

/**
 * A list of paper.js classes to add changes$ emitters to
 */
const toIntercept = [
  paper.Item,
  paper.Path,
  paper.Layer,
  paper.Shape,
  paper.Shape.Circle,
  paper.Shape.Ellipse,
  paper.Shape.Rectangle,
  // paper.Style, // TODO: in case we need `change$` event emitter for Style, this has to be fixed in the --prod build
  paper.Group,
  paper.Gradient,
  paper.Color,
  paper.View,
  paper.Size,
  paper.Project,
];

// Add change emitters
toIntercept.forEach((cns) => addChangeListeners(cns));
