export const EXPECT_ARRAY = ['matrix', 'size', 'strokeColor', 'radius'];
export const REQUIRED_BY = {
  size: ['Shape'],
};

export const REQUIRES = {
  Shape: ['size'],
} as any;

export function hasRequired(json: any) {
  if (!json.className) {
    return true;
  }
  const required = REQUIRES[json.className] as string[];
  const missing = required.filter((r) => !Object.keys(json).includes(r));
  if (missing.length > 0) {
    console.warn('item lacks required fields', missing);
    return false;
  }
  return true;
}
