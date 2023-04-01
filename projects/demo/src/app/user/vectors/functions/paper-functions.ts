import {
  PAPER_STYLE_PROPS,
  PAPER_STYLE_DEFAULTS,
  EXPECT_PRIMITIVE_ARRAY,
} from './constants';
import stringify from 'safe-stable-stringify';
import * as paper from 'paper';
import { PAPER_STYLE_EMPTY } from './constants';
const p2 = paper;
export const isIgnored = (item: paper.Item) =>
  item ? item.data?.ignore || item.layer?.data.ignore : true;
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
  item: paper.Item | paper.Style | any,
  overwrite = false
) => {
  // console.log(`copying style to Item`);
  PAPER_STYLE_PROPS.forEach((p) => {
    let value = overwrite ? style[p] : item[p] || style[p];
    if (Array.isArray(value)) {
      if (value.length >= 4 && value[0] === 'Color') {
        const [red, green, blue, alpha] = value.slice(1);
        const color = new paper.Color({ red, green, blue, alpha });
        value = overwrite ? color : item[p] || color;
      }
    }
    Object.assign(item, { [p]: value });
  });
};

export const saveStyle = (
  project: paper.Project,
  paper: paper.PaperScope = p2
) => {
  const value = JSON.stringify({ ...(project.currentStyle as any)._values });
  return () => {
    const saved = JSON.parse(value);
    const style = new paper.Style(PAPER_STYLE_EMPTY);
    // console.log(style.strokeColor);
    copyStyleToItem(saved, style, true);
    // console.log(`restoring ${JSON.stringify(style, null, 2)}`);
    project.currentStyle = style;
  };
};

export const defaultsFor = (item: paper.Item, json: any) => {
  const n = { ...json };
  const defaults = PAPER_STYLE_DEFAULTS[item.className] || {};
  PAPER_STYLE_PROPS.forEach((k) => {
    n[k] = n[k] || (item as any)[k] || defaults[k];
    if (n[k] === undefined) {
      delete n[k];
    } else if (EXPECT_PRIMITIVE_ARRAY.includes(k)) {
      if (typeof n[k] !== 'string') {
        n[k] = JSON.stringify(n[k]);
      }
    }
  });
  return n;
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

export const toCSSAlpha = (color?: paper.Color) => {
  if (color instanceof paper.Color) {
    let hex = color.toCSS(true);
    hex +=
      color.hasAlpha() && color.alpha < 1
        ? Math.round(color.alpha * 255).toString(16)
        : '';
    return hex;
  }
  return null;
};
