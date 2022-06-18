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
// import { GunSharedWorkerPlugin } from 'projects/ng-gun/src/lib/classes/GunSharedWorkerPlugin';
import { take } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
// GunSharedWorkerPlugin.register((window as any).Gun);

const IGNORED_PROPS: string[] = ['fullySelected', 'selected', 'selection'];
const BUBBLE_PROPS: string[] = ['fullySelected', 'selected', 'selection'];
const prototypeOwnProperties = {} as any;

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
  prototype: any,
  properties = getOwnSettable(prototype)
) {
  // console.log('monkeypatching prototype', prototype);
  addChangeEmitter(prototype);
  // console.log(properties.map((p: any) => p[1]).join(', '));
  properties.forEach((prop: any[]) => {
    const property = prop[0];
    const propertyName = prop[1];
    // console.log('%s.%s', prototype.constructor.name, propertyName);
    Object.defineProperty(prototype, propertyName, {
      get: property.get,
      set(...args) {
        // console.log('set %s to', propertyName, ...args);
        if (propertyName === 'selected') {
          console.log('selected');
        }
        property.set.call(this, ...args);
        this.changes$.next([propertyName, ...args]);
        if (BUBBLE_PROPS.includes(propertyName)) {
          console.log('bubbling %s', propertyName);
          const e = {} as paper.Event;
          const i = {} as paper.Item;
          if (this.emit) {
            this.emit(`${propertyName}Change`, {});
          }
        }
      },
    });
  });
}

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
].map((con) => con.prototype);

// Add change emitters
toIntercept.forEach((proto) => addChangeListeners(proto));

const afterProto =
  (proto: any) => (name: string) => (cb: (...args: any[]) => any) => {
    const o = proto[name];
    if (typeof o === 'function') {
      console.log('after proto', proto.constructor.name, name);
      proto[name] = function (...args: any[]) {
        const r = o.call(this, ...args);
        cb(r);
        return r;
      };
    }
  };

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
