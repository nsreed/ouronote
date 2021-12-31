// FIXME @Property() applies the property to the super class of the property
export const Property: any =
  (config?: any) =>
  (target: any, name?: string, ...args: any[]) => {
    // console.log('PROPERTY', target, name, config, args);
    target.___PROPERTIES = target.___PROPERTIES || [];
    target.___PROPERTIES.push([target, name, config, ...args]);
  };
