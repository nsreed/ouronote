import { MetaFormBuilder } from './meta-form-builder';
import { GunChain } from 'ng-gun';
import { GunControl } from './gun-control';
import {
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormControlOptions,
  FormControlState,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { getNodeMeta, NodeMetadata, PropMetadata } from '../common/metadata';

export interface GunControlOptions extends FormControlOptions {
  node?: GunChain<any>;
}

@Injectable({ providedIn: 'root' })
export class GunFormBuilder extends MetaFormBuilder {
  constructor() {
    super();
  }

  fromChain(schema: any, gun: GunChain<any>) {
    const meta = getNodeMeta('node:meta', schema);
    const ctrl = this.fromNodeMeta(meta, gun);
    return ctrl;
    // Hook them up
  }

  fromNodeMeta(nodeMeta: NodeMetadata, cursor: GunChain<any>): FormGroup<any> {
    console.log(`fromNodeMeta ${nodeMeta.type} ${cursor.path.join('.')}`);
    return super.fromNodeMeta(nodeMeta, cursor);
  }

  fromProperty(
    propertyMeta: PropMetadata,
    cursor: GunChain<any>
  ): FormGroup<any> | FormControl<any> {
    const s = cursor.get(propertyMeta.key);
    console.log(`fromProperty ${propertyMeta.type} ${s.path.join('.')}`);
    const p = super.fromProperty(propertyMeta, s);
    s.on({ ignoreLocal: true }).subscribe((value) => {
      console.log('should update form', { value });
      p.patchValue(value, { onlySelf: false, emitEvent: true });
    });

    return p;
  }
}
