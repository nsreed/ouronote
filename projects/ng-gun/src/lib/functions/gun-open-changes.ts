import * as Gun from 'gun';
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
    opt.to = setTimeout(function () {
      // but schedule the callback to fire soon!
      if (!opt.any) {
        return;
      }
      opt.any.call(opt.at.$, opt.doc, opt.key, opt, opt.eve); // call it.
      if (opt.off) {
        // check for unsubscribing.
        opt.eve.off();
        opt.any = null;
      }
    }, opt.wait || 9);
    opt.at = opt.at || ctx; // opt.at will always be the first context it finds.
    opt.key = opt.key || key;
    opt.eve.s[this._.id] = eve; // collect all the events together.

    if (true === (Gun as any).valid(data)) {
      // if primitive value...
      if (!at) {
        opt.doc = data;
      } else {
        at[key] = data;
      }
      return;
    }
    const tmp = this; // else if a sub-object, CPU schedule loop over properties to do recursion.
    // console.log(opt.doc);
    (setTimeout as any).each(Object.keys(data), function (dk: any, val: any) {
      if ('_' === dk && !opt.meta) {
        return;
      }
      val = data[dk];
      const doc = at || opt.doc;
      const id = (Gun as any).valid(val);
      // first pass this becomes the root of open, then at is passed below, and will be the parent for each sub-document/object.
      if (!doc) {
        return;
      } // if no "parent"

      if ('string' !== typeof id) {
        const primSoul = `${data._['#']}/${dk}`;
        // if primitive...
        // console.log('its primitive', primSoul);
        const newUp = data._['>'][dk] || 0;
        const oldUp = (opt.updateTimes || {})[primSoul] || newUp;
        const upDiff = newUp - oldUp;
        opt.updateTimes[primSoul] = newUp;
        if (upDiff) {
          // console.log(`${dk} diff ${upDiff}`);
          opt.diff(key, dk, data[dk]);
        }
        doc[dk] = val;
        return;
      }
      if (opt.ids[id]) {
        // if we've already seen this sub-object/document
        doc[dk] = opt.ids[id]; // link to itself, our already in-memory one, not a new copy.
        return;
      }

      if (opt.depth <= depth) {
        // stop recursive open at max depth.
        doc[dk] = doc[dk] || val; // show link so app can load it if need.
        return;
      } // now open up the recursion of sub-documents!
      // console.log(key, dk, data._['>'][dk]);
      tmp
        .get(dk)
        .openChanges(opt.any, opt, (opt.ids[id] = doc[dk] = {}), depth + 1); // 3rd param is now where we are "at".
    });
  });
};
