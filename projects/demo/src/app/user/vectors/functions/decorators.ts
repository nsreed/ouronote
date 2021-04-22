export const Property: any = (config?: any) => (
  target: any,
  name?: string,
  ...args: any[]
) => {
  // console.log('PROPERTY', target, name, config, args);
  target.___PROPERTIES = target.___PROPERTIES || [];
  target.___PROPERTIES.push([name, config]);
};
