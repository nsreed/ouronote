const bind = Function.bind;
const unbind = bind.bind(bind);

export function PropConst(...args: any[]) {}

function instantiate(constructor: any, args?: any) {
  return new (unbind(constructor, null).apply(null, args) as any)();
}

export const makeConstructor =
  (oc: any) =>
  (...args: any[]) => {
    return instantiate(oc, args);
  };

export const PropertiedObject = () => (target: any) => {
  // console.log('PROPERTIED OBJECT', target);
  if (!target.___DECORATORS) {
    target.___DECORATORS = {};
  }
  const cn = target.constructor.name;
  if (!target.___DECORATORS[target.constructor.name]) {
    // console.log('PROPCONST', target.constructor.name);
    target.constructor = makeConstructor(target.constructor);
    target.___DECORATORS[cn] = true;
  }
};

// FIXME @Property() applies the property to the super class of the property
export const Property: any =
  (config?: any) =>
  (target: any, name: string, ...args: any[]) => {
    PropertiedObject()(target);
    // console.log('PROPERTY', target, name, config, args);
    const p = {
      target,
      name,
      config,
      args,
    };
    target.___PROPERTIES = target.___PROPERTIES || {};
    target.___PROPERTIES[name] = p;
  };
