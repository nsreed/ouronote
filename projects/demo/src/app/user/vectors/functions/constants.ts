export const EXPECT_PRIMITIVE_ARRAY = [
  'matrix',
  'size',
  'strokeColor',
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
    console.warn('item lacks required fields', missing);
    return false;
  }
  return true;
}

export const MUTATION_METHODS = [
  'add',
  'lineTo',
  'lineBy',
  'curveTo',
  'curveBy',
  // 'translate',
];

export const MUTATIONS = {
  Path: MUTATION_METHODS,
  // Item: ['translate'],
} as any;

export const MUTATION_PROPERTIES = {
  add: ['segments'],
  // translate: ['position', 'segments'], // FIXME translate gets called by paper internally, causing unnecessary saves
} as any;

export const INCOMING_DEBOUNCE = 25;
export const SAVE_DEBOUNCE = 1000;
