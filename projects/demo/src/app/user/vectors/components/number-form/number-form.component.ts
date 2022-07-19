import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ObjectPropertyDirective } from 'projects/demo/src/app/directives/object-property.directive';
import { ObjectDirective } from 'projects/demo/src/app/directives/object.directive';

@Component({
  selector: 'app-number-form',
  templateUrl: './number-form.component.html',
  styleUrls: ['./number-form.component.scss'],
})
export class NumberFormComponent implements OnInit {
  numCtl = this.fb.control(null);

  @Input()
  label = '';

  constructor(
    private fb: UntypedFormBuilder,
    public prop: ObjectPropertyDirective,
    public obj: ObjectDirective
  ) {
    this.numCtl.valueChanges.subscribe((v) => (prop.value = v));
    obj.object$.subscribe((o) => {
      this.numCtl.patchValue(prop.value, { onlySelf: true, emitEvent: false });
    });
  }

  ngOnInit(): void {}
}
