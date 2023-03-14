import { Observable } from 'rxjs';
function getOrDefine(target: any, metadataKey: string, value: any = {}) {
  if (!Reflect.hasMetadata(metadataKey, target)) {
    Reflect.defineMetadata(metadataKey, value, target);
  }
  return Reflect.getMetadata(metadataKey, target);
}

export function Prop(options: PropertyOptions = {}) {
  options = options || {};
  options.decorator = options.decorator || Prop;
  return (target: any, key: string) => {
    // console.log(`prop ${key}`);
    const nodeMeta = getOrDefine(target.constructor, 'meta:properties');
    const order = Object.keys(nodeMeta).length;
    const propMeta = { target, key, order, ...options };
    nodeMeta[key] = propMeta;
    Reflect.defineMetadata(
      `meta:property:${key}`,
      propMeta,
      target.constructor
    );
    return Reflect.defineMetadata(
      `meta:property`,
      propMeta,
      target.constructor,
      key
    );
  };
}

type RefOptions = PropertyOptions & {
  resolve: Function | string;
  decorator: typeof Ref | Function;
};

export function Ref(options?: RefOptions | Function | Record<string, any>) {
  let refOptions: RefOptions = {} as any;
  refOptions.decorator = refOptions.decorator || Ref;
  if (typeof options === 'function') {
    refOptions.resolve = options as Function;
  } else if (typeof options === 'object') {
    refOptions = { ...refOptions, ...options };
  }
  return (target: any, key: any) => {
    const resolve = refOptions.resolve;
    options = {
      type: 'reference',
      resolvesTo: null,
      validate: ([value, property]) => value !== undefined && value !== null,
      ...options,
    };
    Reflect.defineProperty(options, 'resolvesTo', {
      get() {
        return Reflect.getMetadata('meta:node', refOptions.resolve);
      },
    });
    // Reflect.defineMetadata('meta:referencedBy', options, options.resolve);
    return Prop(options)(target, key);
  };
}

export function Bool(options?: PropertyOptions) {
  return Prop({
    ...(options || {}),
    type: 'boolean',
  });
}

export type EnumOptions = PropertyOptions & {
  options: Record<string | number, any>;
};
export function Enum(options?: EnumOptions) {
  return Prop({
    validate: ([value, property]: [any, any]) =>
      Object.keys(property.options).includes(value),
    ...(options || {}),
    type: 'enum',
  });
}

export type NumberOptions = PropertyOptions & {
  min?: number;
  max?: number;
};
export function Num(options?: PropertyOptions) {
  return Prop({
    ...(options || {}),
    type: 'number',
  });
}

export type StringOptions = PropertyOptions & {
  minLength?: number;
  maxLength?: number;
};
export function Str(options?: PropertyOptions) {
  return Prop({
    minLength: 0,
    // TODO test validate at some point
    validate: ([value, property]: [string, any]) =>
      value.length >= property.minLength &&
      (property.maxLength >= value || property.maxLength < property.minLength),
    ...(options || {}),
    type: 'string',
  });
}

export function Node(options?: any) {
  options = typeof options === 'object' ? options : { options };
  return (target: any) => {
    // console.log(`node ${target.name}`);
    const propsMeta = Reflect.getMetadata('meta:properties', target) || {};
    const refsMeta = Reflect.getMetadata('meta:referencedBy', target) || {};
    // getOrDefine(target, 'meta:node');
    getOrDefine(target, 'meta:properties', propsMeta);
    getOrDefine(target, 'meta:referencedBy', refsMeta);

    return Reflect.defineMetadata(
      'meta:node',
      {
        type: 'node',
        properties: propsMeta,
        referencedBy: refsMeta,
        ...options,
      },
      target
    );
  };
}

export type RefMetadata = {
  type: 'reference';
  resolvesTo: NodeMetadata;
};
export type StringMetadata = {
  type: 'string';
};
export type BooleanMetadata = {
  type: 'boolean';
};

export type PropertyOptions =
  | {
      defaultValue?: any;
      decorator?: any;
      description?: string;
      label?: string;
      summary?: string;
      type: string;
      validate?: PropertyValidatorFn;
    }
  | Record<string, any>;

type PropertyValidatorFn = (
  ...args: any[]
) => boolean | Promise<boolean> | Observable<boolean>;

export type PropMetadata = (StringMetadata | BooleanMetadata | RefMetadata) & {
  key: string;
  order?: number;
  description?: string;
  label?: string;
  defaultValue?: any;
  nullable: boolean;
  validate?: PropertyValidatorFn;
};

export type NodeMetadata = {
  type: 'node';
  properties: Record<string, PropMetadata>;
};

export function makeMetaGetter(metadataKey: string = 'meta:node') {
  return (o: any) => getNodeMeta(metadataKey, o);
}

export function getNodeMeta(
  metadataKey: string = 'meta:node',
  node: any
): NodeMetadata {
  if (typeof node === 'function') {
    return (
      Reflect.getMetadata('meta:node', node) ||
      Reflect.getMetadata('meta:node', node.constructor)
    );
  } else if (typeof node === 'object') {
    return Reflect.getMetadata(
      'meta:node',
      Object.getPrototypeOf(node).constructor
    );
  }
  return { type: 'node', properties: {} };
}

export function getNodeProps(node: any) {
  const nodeMeta = getNodeMeta('meta:node', node);
  return nodeMeta.properties;
}
