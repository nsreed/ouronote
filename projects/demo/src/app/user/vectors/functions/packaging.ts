import { EXPECT_ARRAY } from './constants';
import * as paper from 'paper';
export function unpack(
  value: any,
  soul: string | null = value.data?.soul
): any {
  // console.log('unpacking value');
  // console.dir(value);
  return value.className ? unpackObject(value) : unpackArray(value);
}

function unpackObject(item: any, soul: string | null = item.data?.soul) {
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
  Object.keys(scrubbed)
    .filter((k) => EXPECT_ARRAY.includes(k))
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

export function serializeValue(value: any): any {
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
