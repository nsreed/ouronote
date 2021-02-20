export const isIgnored = (item: paper.Item) => !item.data.ignored;
export const hasSoul = (item: paper.Item) =>
  item.data.soul !== null && item.data.soul !== undefined;
