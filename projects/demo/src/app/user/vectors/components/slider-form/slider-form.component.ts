import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ObjectPropertyDirective } from '../../../../directives/object-property.directive';

@Component({
  selector: 'app-slider-form',
  templateUrl: './slider-form.component.html',
  styleUrls: ['./slider-form.component.scss'],
})
export class SliderFormComponent implements OnInit {
  slideCtl = this.fb.control(0);

  constructor(private fb: FormBuilder, public prop: ObjectPropertyDirective) {
    this.slideCtl.valueChanges.subscribe((v) => (prop.value = v));
  }

  ngOnInit(): void {
    this.slideCtl.patchValue(this.prop.value);
  }

  formatLabel(value: number) {
    return `${value + 2}`;
  }
}
