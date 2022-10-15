import { Injectable } from '@angular/core';
import {
  FormBuilder,
  AbstractControl,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { NodeMetadata, PropMetadata, RefMetadata } from '../common/metadata';

@Injectable()
export class MetaFormBuilder extends FormBuilder {
  fromClass(target: Function | any, ...args: any[]): FormGroup {
    const metadata = Reflect.getMetadata('meta:node', target);
    if (!metadata?.properties) {
      return this.group({});
    }
    return this.fromNodeMeta(metadata, ...args);
  }

  fromNodeMeta(nodeMeta: NodeMetadata, ...args: any[]): FormGroup {
    const propKeys = Object.entries(nodeMeta.properties).sort(
      (a, b) => (a[1].order || 0) - (b[1].order || 0)
    );
    return this.group(
      propKeys.reduce(
        (p, c) => ({
          ...p,
          [c[0]]: this.fromProperty(c[1], ...args),
        }),
        {}
      )
    );
  }

  fromProperty(
    propertyMeta: PropMetadata,
    ...args: any[]
  ): FormControl | FormGroup {
    switch (propertyMeta.type) {
      case 'reference':
        return this.fromNodeMeta(
          (propertyMeta as RefMetadata).resolvesTo,
          ...args
        );
      default:
        return this.control(null, propertyMeta);
    }
  }

  control(config: any, meta?: any, ...args: any[]) {
    const ctrl = super.control(config, ...args);
    (ctrl as any).meta = meta;
    return ctrl;
  }

  group(config: any, ...args: any[]) {
    return super.group(config, ...args);
  }
}
