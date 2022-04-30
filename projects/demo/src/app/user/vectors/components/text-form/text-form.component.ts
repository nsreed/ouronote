import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ObjectPropertyDirective } from 'projects/demo/src/app/directives/object-property.directive';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss'],
})
export class TextFormComponent implements OnInit {
  textCtl = this.fb.control(null);

  constructor(private fb: FormBuilder, public prop: ObjectPropertyDirective) {
    this.textCtl.valueChanges.subscribe((v) => (prop.value = v));
  }

  ngOnInit(): void {
    this.textCtl.patchValue(this.prop.value);
  }
}
