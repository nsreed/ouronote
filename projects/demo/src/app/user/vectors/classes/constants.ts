export const EXPECT_ARRAY = [
  'matrix',
  'size',
  'strokeColor',
  'radius',
  'segments',
];
export const REQUIRED_BY = {
  size: ['Shape'],
};

export const REQUIRES = {
  Shape: ['size'],
} as any;

export function hasRequired(json: any) {
  if (!json) {
    console.warn('hasRequired() NULL VALUE');
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
];

export const MUTATIONS = {
  Path: MUTATION_METHODS,
} as any;

export const MUTATION_PROPERTIES = {
  add: ['segments'],
} as any;
