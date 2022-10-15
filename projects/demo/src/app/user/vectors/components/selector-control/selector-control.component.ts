import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ValidationError } from 'webpack';

@Component({
  selector: 'app-selector-control',
  templateUrl: './selector-control.component.html',
  styleUrls: ['./selector-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorControlComponent implements OnInit {
  @Input('appSelectorControl')
  formControl = this.fb.control(null, {
    validators: [
      (ctrl) =>
        Object.keys(this.options).includes((ctrl as FormControl).value)
          ? null
          : new ValidationError([], null as any, null as any),
    ],
  });

  @Output()
  valueChange = new EventEmitter();

  @Input()
  value = null;

  @Input()
  options = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
