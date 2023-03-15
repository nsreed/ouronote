import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { LogService } from 'log';
import { ObjectPropertyDirective } from 'projects/demo/src/app/directives/object-property.directive';
import { MetaFormBuilder } from 'projects/demo/src/app/forms-ui/meta-form-builder';

@Component({
  selector: 'app-selector-control',
  templateUrl: './selector-control.component.html',
  styleUrls: ['./selector-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorControlComponent implements OnInit {
  control!: FormControl;
  get object() {
    return this.propertyDirective.object;
  }
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
    public propertyDirective: ObjectPropertyDirective,
    private logger: LogService
  ) {}

  ngOnInit(): void {
    const cfp = this.mfb.fromProperty(this.propertyDirective.meta);
    // Technically we shouldn't even know what this property is, so we're kind of cheating relying on the UI.
    this.control = cfp as FormControl;
    this.control.valueChanges.subscribe((v) => {
      console.log(`new value for ${this.propertyDirective.label}: ${v}`);
      this.propertyDirective.value = v;
    });
  }
}
