import {
  EXPECT_KEYED_ARRAY,
  EXPECT_PRIMITIVE_ARRAY,
  REQUIRES,
} from './constants';
import * as paper from 'paper';
export function unpack(
  value: any,
  soul: string | null = value.data?.soul
): any {
  // console.log('unpacking value');
  // console.dir(value);
  return Array.isArray(value)
    ? unpackArray(value)
    : 'object' === typeof value
    ? unpackObject(value)
    : value;
}

function unpackObject(
  item: any,
  soul: string | null = item.data?.soul || (item._ && item._['#'])
) {
  if (!item) {
    return null;
  }
  const scrubbed = { ...item } as any;
  const className = item.className;
  scrubbed.data = {
    soul,
  };
  delete scrubbed.className;
  if (scrubbed.children) {
    console.warn('  unpacking children (UNTESTED)');
    scrubbed.children = unpack(scrubbed.children);
  }
  delete scrubbed.selected;
  delete scrubbed.fullySelected;
  delete scrubbed.previousSibling;
  Object.keys(scrubbed)
    .filter((k) => EXPECT_PRIMITIVE_ARRAY.includes(k))
    .forEach((k) => (scrubbed[k] = JSON.parse(scrubbed[k])));
  const unpacked = [className, scrubbed];
  return unpacked;
}

function unpackArray(value: any) {
  const items = [];
  // tslint:disable-next-line: forin
  for (const key in value) {
    const item = value[key];
    if (item === null || !item.className) {
      continue;
    }
    // console.log(key, JSON.stringify(item));

    // console.log('would unpack', unpacked);
    const unpacked = unpackObject(item, key);
    if (!unpacked) {
      continue;
    }
    items.push(unpacked);
  }
  return items;
}

/** Serializes a paper gun formatted JSON to ...something else. */
export function serializeValue(value: any): any {
  if (value === null) {
    return null;
  }
  if (Array.isArray(value)) {
    return value.map((e) => serializeValue(e));
  }
  if (typeof value === 'object' && value.className === 'Point') {
    return [value.x, value.y];
  }
  const serialized =
    typeof value === 'object' && value._serialize
      ? value._serialize.call(value)
      : value;
  if (Array.isArray(serialized) && serialized[0] === 'Point') {
    serialized.shift();
  }

  return serialized;
}

export function getDeepFromJSON(item: any, createKeys = false) {
  const deep = EXPECT_KEYED_ARRAY.reduce((deepObj, keyedPropName) => {
    if (item[keyedPropName]) {
      deepObj[keyedPropName] = item[keyedPropName].reduce(
        (keyedPropValues: any, descendant: paper.Item) => {
          let key = descendant.data?.soul;
          if (descendant.data?.ignored) {
            return keyedPropValues;
          } else {
            if (!key) {
              if (!createKeys) {
                return keyedPropValues;
              }
              // TODO CREATE KEYS
              key = new Date().getTime().toString() + Math.random().toString();
            }
          }
          keyedPropValues[key] = getDeep(descendant);
          return keyedPropValues;
        },
        {}
      );
    }
    return deepObj;
  }, {} as any);
  return deep;
}

/**
 * Returns a deep copy of the item for persistence to gun
 * @param item the item to get a deep object representation from
 * @returns a deep representation of the item
 */
export function getDeep(
  item: paper.Item | paper.Project | any,
  createKeys = false
): any {
  const deep = getDeepFromJSON(item as any);
  const shallow = item instanceof paper.Project ? {} : getShallow(item);
  return { ...deep, ...shallow };
}

export function getShallowFromData(item: any) {
  const obj = item[1] as any;

  const shallow = {
    ...obj,
    className: item[0],
  };

  // remove complex sub-objects
  delete shallow.data;
  delete shallow.children;
  delete shallow.selected;

  // stringify arrays
  Object.keys(shallow).forEach((k) => {
    const value = shallow[k];
    if (Array.isArray(value)) {
      if (!EXPECT_PRIMITIVE_ARRAY.includes(k)) {
        console.warn('UNEXPECTED ARRAY %s, NOT SERIALIZING!!!', k);
        console.warn('  value', value);
        // continue;
        delete shallow[k];
      } else {
        shallow[k] = JSON.stringify(value);
      }
    }
  });
  return shallow;
}

/**
 * Returns a shallow copy of the item for persistence to gun
 * @param item the item to get a shallow object representation from
 * @returns a shallow representation of the item
 */
export function getShallow(item: paper.Item): any {
  const raw = item.exportJSON({ asString: false }) as any;
  if (Object.keys(REQUIRES).includes(item.className)) {
    // make sure things are serialized that should be
    const forcedSerial = [
      ...REQUIRES[item.className],
      'fillColor',
      'strokeColor',
    ]
      // .filter((k) => Object.getOwnPropertyNames(item).includes(k))
      .reduce((p: any, c: any) => {
        const v = item[c as keyof paper.Item];
        if (v !== undefined) {
          if (v === null) {
            p[c] = null;
          } else if (v instanceof paper.Color) {
            const colorJSON = JSON.parse(JSON.stringify(v));
            colorJSON.shift();
            p[c] = JSON.stringify(colorJSON);
          } else {
            p[c] = 'object' === typeof v ? JSON.stringify(v) : v;
          }
        }

        return p;
      }, {} as any);

    raw[1] = { ...raw[1], ...forcedSerial };
  }

  return getShallowFromData(raw);
}
