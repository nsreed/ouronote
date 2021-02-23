import { EXPECT_ARRAY } from './constants';
export function unpack(value: any, soul: string | null = value.data?.soul) {
  // console.log('unpacking value');
  // console.dir(value);

  return value.className ? unpackObject(value) : unpackArray(value);
}
function unpackObject(item: any, soul: string | null = item.data?.soul) {
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
    // console.log(key, JSON.stringify(item));

    // console.log('would unpack', unpacked);
    const unpacked = unpackObject(item, key);
    items.push(unpacked);
  }
  return items;
}
