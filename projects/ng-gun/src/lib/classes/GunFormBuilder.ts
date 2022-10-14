import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class GunFormBuilder extends FormBuilder {
  group(controls: any, options?: any) {
    return super.group(controls, options);
  }
}
