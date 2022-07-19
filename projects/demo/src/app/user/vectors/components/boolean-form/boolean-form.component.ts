import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ObjectPropertyDirective } from '../../../../directives/object-property.directive';

@Component({
  selector: 'app-boolean-form',
  templateUrl: './boolean-form.component.html',
  styleUrls: ['./boolean-form.component.scss'],
})
export class BooleanFormComponent implements OnInit {
  boolCtl = this.fb.control(false);

  constructor(private fb: UntypedFormBuilder, public prop: ObjectPropertyDirective) {
    this.boolCtl.valueChanges.subscribe((v) => (prop.value = v));
  }

  ngOnInit(): void {
    this.boolCtl.patchValue(this.prop.value);
  }
}
