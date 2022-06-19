import * as Gun from 'gun';
import { isSubSoul, gunDiff } from './gun-utils';
// tslint:disable: object-literal-shorthand
// tslint:disable: only-arrow-functions
// tslint:disable: no-conditional-assignment
(Gun as any).valid = function (v: any) {
  // "deletes", nulling out keys.
  return (
    v === null ||
    'string' === typeof v ||
    'boolean' === typeof v ||
    // we want +/- Infinity to be, but JSON does not support it, sad face.
    // can you guess what v === v checks for? ;)
    ('number' === typeof v && v !== Infinity && v !== -Infinity && v === v) ||
    (!!v && 'string' === typeof v['#'] && Object.keys(v).length === 1 && v['#'])
  );
};

(Gun.chain as any).openChanges = function (
  this: any,
  cb: any,
  opt: any,
  at: any,
  depth: number
) {
  // console.log(opt, at, depth);
  depth = depth || 1;
  opt = opt || {}; // init top level options.
  opt.doc = opt.doc || {};
  opt.ids = opt.ids || {};
  opt.updateTimes = opt.updateTimes || {};
  opt.any = opt.any || cb;
  opt.meta = opt.meta || false;
  opt.eve = opt.eve || {
    off: function () {
      // collect all recursive events to unsubscribe to if needed.
      Object.keys(opt.eve.s).forEach(function (i: any, e: any) {
        // switch to CPU scheduled setTimeout.each?
        if ((e = opt.eve.s[i])) {
          e.off();
        }
      });
      opt.eve.s = {};
    },
    s: {},
  };

  return this.on(function (this: any, data: any, key: any, ctx: any, eve: any) {
    // opt.updateTimes = opt.updateTimes || updateTimes;
    // subscribe to 1 deeper of data!
    clearTimeout(opt.to); // do not trigger callback if bunch of changes...
    const WAIT = 1000 / 30; // 9;
    opt.to = setTimeout(function () {
      // but schedule the callback to fire soon!
      if (!opt.any) {
        return;
      }
      // console.log('flushing', opt.eve);
      opt.any.call(opt.at.$, opt.doc, opt.key, opt, opt.eve); // call it.
      if (opt.off) {
        // check for unsubscribing.
        opt.eve.off();
        opt.any = null;
      }
    }, opt.wait || WAIT);
    opt.at = opt.at || ctx; // opt.at will always be the first context it finds.
    opt.key = opt.key || key;
    opt.eve.s[this._.id] = eve; // collect all the events together.
    opt.priorities = opt.priorities || ['className'];

    if (true === (Gun as any).valid(data)) {
      // if primitive value...
      console.log('primitive top', data);
      if (!at) {
        opt.doc = data;
      } else {
        at[key] = data;
      }
      return;
    }
    const soul = data._['#'];
    const tmp = this; // else if a sub-object, CPU schedule loop over properties to do recursion.
    // console.log(opt.doc);
    const subKeys = Object.keys(data).sort((a, b) => {
      const ap = opt.priorities.includes(a);
      const bp = opt.priorities.includes(b);
      return ap && !bp ? 1 : bp && !ap ? -1 : 0;
    });
    if (at && data.className) {
      // We aren't dealing with a map
      if (data._['#'].endsWith(key)) {
        opt.create(data, key, soul);
      }
      subKeys.forEach(mapKey); // FIXME sort fields by criticality
    } else {
      (setTimeout as any).each(Object.keys(data), mapKey);
    }
    function mapKey(dk: any, val: any): void {
      if ('_' === dk && !opt.meta) {
        return;
      }
      val = data[dk];
      const doc = at || opt.doc;
      const oldVal = doc[dk];
      const id = (Gun as any).valid(val);

      // first pass this becomes the root of open, then at is passed below, and will be the parent for each sub-document/object.
      if (!doc) {
        return;
      } // if no "parent"

      const primSoul = `${soul}/${dk}`;
      const docOrVal = doc[dk] || val;
      if (!val && oldVal) {
        // console.log('delete', primSoul);
        opt.delete(primSoul);
      }

      if ('string' !== typeof id) {
        // if primitive...
        // console.log('its primitive', primSoul);
        const newUp = data._['>'][dk];
        const oldUp = (opt.updateTimes || {})[primSoul];
        const upDiff = newUp - oldUp;
        opt.updateTimes[primSoul] = newUp;
        doc[dk] = val;
        if (upDiff) {
          // console.log(`${dk} diff ${upDiff}`);
          if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
            opt.diff(data[dk], dk, soul);
          }
        } else if (!oldVal) {
          // opt.diff(docOrVal, dk, soul);
        }
        return;
      }

      if (opt.ids[id]) {
        // if we've already seen this sub-object/document
        doc[dk] = opt.ids[id]; // link to itself, our already in-memory one, not a new copy.
        return;
      }

      if (oldVal === undefined && docOrVal) {
        const iss = isSubSoul(primSoul, data[dk]['#']);
        if (iss) {
          // opt.create(data[dk], primSoul); // FIXME this isn't quite right
        }
      }

      if (opt.depth <= depth) {
        // stop recursive open at max depth.
        doc[dk] = doc[dk] || val; // show link so app can load it if need.
        return;
      } // now open up the recursion of sub-documents!

      // console.log(key, dk, data._['>'][dk]);
      tmp
        .get(dk)
        .openChanges(opt.any, opt, (opt.ids[id] = doc[dk] = {}), depth + 1);
    }
  });
};
