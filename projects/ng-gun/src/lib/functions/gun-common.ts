export function cleanGun(node: any) {
  return Object.keys(node || {})
    .filter((k) => !['_', '#'].includes(k))
    .reduce((acc, val) => {
      acc[val] = node[val];
      return acc;
    }, {});
}
