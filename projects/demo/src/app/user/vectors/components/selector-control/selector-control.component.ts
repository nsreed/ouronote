import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { ObjectPropertyDirective } from 'projects/demo/src/app/directives/object-property.directive';
import { MetaFormBuilder } from 'projects/demo/src/app/forms-ui/meta-form-builder';

@Component({
  selector: 'app-selector-control',
  templateUrl: './selector-control.component.html',
  styleUrls: ['./selector-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorControlComponent implements OnInit {
  @Input('appSelectorControl')
  formControl = this.mfb.control(null, {
    validators: [
      (ctrl: AbstractControl) =>
        Object.keys(this.options || {}).includes((ctrl as FormControl).value)
          ? {}
          : { error: true },
    ],
  });

  control!: FormControl;
  get meta() {
    return this.propertyDirective.meta;
  }

  @Output()
  valueChange = new EventEmitter<any>();

  @Input()
  value = null;

  @Input()
  options = {};

  constructor(
    private mfb: MetaFormBuilder,
    public propertyDirective: ObjectPropertyDirective
  ) {}

  ngOnInit(): void {
    this.control = this.mfb.fromProperty(
      this.propertyDirective.meta
    ) as FormControl;
  }
}
