import { PAPER_STYLE_PROPS } from './constants';
export const isIgnored = (item: paper.Item) => !item.data?.ignore;
export const hasSoul = (item: paper.Item) =>
  item.data.soul !== null && item.data.soul !== undefined;
export const copyNulls = (source: any, dest: any) => {
  PAPER_STYLE_PROPS.forEach((p) => {
    if (!(source as any)[p]) {
      (dest as any)[p] = null;
    }
  });
};
