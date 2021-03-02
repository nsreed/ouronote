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
 * IE11 requires the following for NgClass support on SVG elements
 */
// import 'classlist.js';  // Run `npm install --save classlist.js`.

/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.

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
import 'zone.js/dist/zone'; // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/* GUN IMPORT */
import 'gun';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';
import 'gun/sea';

import 'gun/lib/load';
import 'gun/lib/open';
import 'gun/lib/then';
import 'gun/lib/not';
import 'gun/lib/unset';

/* PAPER.JS OVERRIDES */

import * as paper from 'paper';
import { EventEmitter } from '@angular/core';

const IGNORED_PROPS = ['selected', 'fullySelected', 'selection'];
const prototypeProperties = {} as any;
const prototypeOwnProperties = {} as any;

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

function getProtoSettable(prototype: any) {
  if (!(prototype.constructor.name in prototypeProperties)) {
    console.log('prototype', prototype);

    let proto = prototype;
    let properties: any[] = [];
    while (proto) {
      const props = getOwnSettable(proto);
      properties = [...properties, ...props];
      proto = Object.getPrototypeOf(proto);
    }
    prototypeProperties[prototype.constructor.name] = properties;
  }
  return prototypeProperties[prototype.constructor.name];
}

function interceptAll(prototype: any) {
  // console.log('intercepting', prototype.constructor.name);
  addChangeEmitter(prototype);
  getOwnSettable(prototype).forEach((prop: any[]) => {
    const original = prop[0];
    const name = prop[1];
    console.log('%s.%s', prototype.constructor.name, name);
    Object.defineProperty(prototype, name, {
      get(...args) {
        return original.get.call(this, ...args);
      },
      set(...args) {
        original.set.call(this, ...args);
        this.changes$.emit([name, ...args]);
      },
    });
  });
}

function addChangeEmitter(prototype: any) {
  if (!Object.getOwnPropertyDescriptor(prototype, 'changes$')) {
    Object.defineProperty(prototype, 'changes$', {
      get() {
        if (!this._changes$) {
          this._changes$ = new EventEmitter();
        }
        return this._changes$;
      },
    });
  }
}

const toIntercept = [
  paper.Item,
  paper.Path,
  paper.Layer,
  paper.Shape,
  paper.Shape.Circle,
  paper.Shape.Ellipse,
  paper.Shape.Rectangle,
  paper.Style,
  paper.Group,
  paper.Gradient,
].map((con) => con.prototype);

toIntercept.forEach((proto) => interceptAll(proto));
