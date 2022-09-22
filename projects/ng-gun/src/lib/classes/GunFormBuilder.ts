import { FormBuilder } from '@angular/forms';

export class GunFormBuilder extends FormBuilder {
  group(controls: any, options?: any) {
    return super.group(controls, options);
  }
}
