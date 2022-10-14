import { GunChain } from './../../../../ng-gun/src/lib/classes/GunChain';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export class AbstractGunControl extends AbstractControl {
  constructor(
    node: GunChain,
    validators?: ValidatorFn | ValidatorFn[] | null,
    asyncValidators?: any
  ) {
    super(validators || null, asyncValidators);
    const t = Reflect.getMetadataKeys(node); // Reflect.getMetadata('Gun:type', node);
    console.log({ t });
    node?.open({ ignoreLocal: true, clean: true }).subscribe((value) => {
      this.patchValue(value);
    });
  }

  private localValue: any;

  setValue(value: any, options?: Object | undefined): void {
    this.localValue = value;
  }
  patchValue(value: any, options?: Object | undefined): void {
    this.localValue = value;
  }
  reset(value?: any, options?: Object | undefined): void {
    throw new Error('Method not implemented.');
  }
}
