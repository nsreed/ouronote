import { getMatFormFieldMissingControlError } from '@angular/material/form-field';
import * as paper from 'paper';
export const PAPER_STYLE_PROPS = [
  'dashArray',
  'dashOffset',
  'fillColor',
  'fillRule',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'justification',
  'leading',
  'miterLimit',
  'shadowBlur',
  'shadowColor',
  'shadowOffset',
  'strokeCap',
  'strokeColor',
  'strokeJoin',
  'strokeScaling',
  'strokeWidth',
];
export const PAPER_STYLE_EMPTY = {
  strokeWidth: null,
  strokeColor: null,
  strokeCap: null,
  strokeJoin: null,
  strokeScaling: true,
  dashOffset: null,
  dashArray: null,
  fillColor: null,
  // fillRule: null,
  shadowColor: null,
  shadowBlur: null,
  shadowOffset: null,
  fontFamily: null,
  fontWeight: null,
  fontSize: null,
  leading: null,
  justification: null,
  miterLimit: null,
};
export const PAPER_STYLE_DEFAULTS: {
  [key: string]: any;
} = {
  PointText: {
    fontSize: 12,
    fontFamily: 'sans-serif',
    content: '',
    justification: 'left',
  },
};
export const EXPECT_PRIMITIVE_ARRAY = [
  'matrix',
  'size',
  'strokeColor',
  'fillColor',
  'shadowColor',
  'shadowOffset',
  'radius',
  'segments',
  'position',
];
export const EXPECT_KEYED_ARRAY = ['children', 'layers'];
export const REQUIRED_BY = {
  size: ['Shape'],
};

export const REQUIRES = {
  Shape: ['size'],
  PointText: ['content', 'fontFamily', 'fontSize'],
} as any;

export function hasRequired(json: any) {
  if (!json) {
    // console.warn('hasRequired() NULL VALUE');
    return false;
  }
  if (!json.className) {
    return false;
  }
  const required = (REQUIRES[json.className] as string[]) || [];
  const missing = required.filter((r) => !Object.keys(json).includes(r));
  if (missing.length > 0) {
    // console.warn('item lacks required fields', missing);
    return false;
  }
  return true;
}

export function getMissing(json: any) {
  if (!json) {
    return [];
  }
  const required = (REQUIRES[json.className] as string[]) || [];
  const missing = required.filter((r) => !Object.keys(json).includes(r));
  return missing;
}

export const MUTATION_METHODS = [
  'add',
  'lineTo',
  'lineBy',
  'curveTo',
  'curveBy',
  'translate',
];

export const MUTATIONS = {
  Path: MUTATION_METHODS,
  Item: ['translate'],
} as any;

export const MUTATION_PROPERTIES = {
  add: ['segments'],
  translate: ['position', 'segments'], // FIXME translate gets called by paper internally, causing unnecessary saves
} as any;

export const INCOMING_DEBOUNCE = 25;
export const SAVE_DEBOUNCE = 1000;

export const RE_VALID_HEX_COLOR =
  /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
