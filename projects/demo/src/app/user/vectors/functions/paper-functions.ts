import { PAPER_STYLE_PROPS } from './constants';
import stringify from 'safe-stable-stringify';
import * as paper from 'paper';
export const isIgnored = (item: paper.Item) => !item.data?.ignore;
export const hasSoul = (item: paper.Item) =>
  item.data.soul !== null && item.data.soul !== undefined;
export const copyNulls = (source: any, dest: any) => {
  if (!source) {
    return;
  }
  PAPER_STYLE_PROPS.forEach((p) => {
    if (!(source as any)[p]) {
      (dest as any)[p] = null;
    }
  });
};
export const copyStyleToItem = (
  style: paper.Style | any,
  item: paper.Item | any
) => {
  PAPER_STYLE_PROPS.forEach((p) => (item[p] = style[p]));
};

export const layoutVertical = (
  items: paper.Item[],
  start: paper.Point = new paper.Point(0, 0)
) => {
  items = items ? [...items] : [];
  start = start ?? new paper.Point(0, 0);
  const current = items.pop();
  if (!current) {
    return;
  }

  const delta = start.subtract(current.bounds.topLeft);
  current.translate(delta);
  const currentHeight = current.bounds.topLeft
    .subtract(current.bounds.bottomLeft)
    .abs();
  console.log(
    `Current Height: ${JSON.stringify(currentHeight)} Laying out ${
      items.length
    } more items. Start: ${JSON.stringify(start)} Delta: ${JSON.stringify(
      delta
    )}`
  );
  layoutVertical(items, start.add(currentHeight));
};
