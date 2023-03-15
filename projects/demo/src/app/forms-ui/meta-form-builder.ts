import { Injectable, Optional } from '@angular/core';
import {
  FormBuilder,
  AbstractControl,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { LogService } from 'log';
import { NodeMetadata, PropMetadata, RefMetadata } from '../common/metadata';

// schema => schematic => instance
//        -> ui -> form ->

@Injectable()
export class MetaFormBuilder extends FormBuilder {
  constructor(
    @Optional()
    private logger: LogService = new LogService('selector-control.component')
  ) {
    super();
  }

  fromClass(target: Function | any, ...args: any[]): FormGroup {
    const metadata = Reflect.getMetadata('meta:node', target);
    if (!metadata?.properties) {
      return this.group({});
    }
    return this.fromNodeMeta(metadata, ...args);
  }

  fromNodeMeta(nodeMeta: NodeMetadata, ...args: any[]): FormGroup {
    return this.group(
      Object.entries(nodeMeta.properties)
        .sort((a, b) => (a[1].order || 0) - (b[1].order || 0))
        .reduce(
          (acc, current) => ({
            ...acc,
            [current[0]]: this.fromProperty(current[1], ...args),
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
        this.logger.log('Creating a ... resolving control?');
        return this.fromNodeMeta(
          (propertyMeta as RefMetadata).resolvesTo,
          ...args
        );
      default:
        this.logger.log('Defaulting to control');
        const ctrl = this.control(propertyMeta.defaultValue, propertyMeta);

        return ctrl;
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
