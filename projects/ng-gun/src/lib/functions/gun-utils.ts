import * as Gun from 'gun';
export const gunUpdateTime = (value: any) => {
  const updates = Gun.node.is(value) ? (value as any)._['>'] : null;
  if (!updates) {
    return 0;
  }
  return Object.values(updates).reduce((latest: any, time: any) =>
    time > latest ? time : latest
  ) as number;
};
