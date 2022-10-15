import { Injectable } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup } from '@angular/forms';
import { GunChain } from 'ng-gun';
import { getNodeMeta, NodeMetadata, PropMetadata } from '../common/metadata';
import { MetaFormBuilder } from './meta-form-builder';

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
    // console.log(`fromNodeMeta ${nodeMeta.type} ${cursor.path.join('.')}`);
    return super.fromNodeMeta(nodeMeta, cursor);
  }

  fromProperty(
    propertyMeta: PropMetadata,
    cursor: GunChain<any>
  ): FormGroup<any> | FormControl<any> {
    const s = cursor.get(propertyMeta.key);
    // console.log(`fromProperty ${propertyMeta.type} ${s.path.join('.')}`);
    const p = super.fromProperty(propertyMeta, s);
    s.on({ ignoreLocal: true }).subscribe((value) => {
      // console.log('should update form', value);
      p.patchValue(value, { onlySelf: true, emitEvent: false });
    });
    p.valueChanges.subscribe((formValue) => {
      if (!(p instanceof FormGroup)) {
        // console.log('got form value', formValue);
        s.put(formValue as never);
      }
    });

    return p;
  }
}
