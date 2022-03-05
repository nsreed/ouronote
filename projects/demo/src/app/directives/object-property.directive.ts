import { Directive, Input, OnInit } from '@angular/core';
import { ObjectDirective } from './object.directive';

@Directive({
  selector: '[appObjectProperty]',
})
export class ObjectPropertyDirective implements OnInit {
  @Input('appObjectProperty')
  public propertyName!: string;

  @Input()
  label?: string;

  get object() {
    return this.objectDirective.object;
  }

  get propertyDesc() {
    return Object.getPrototypeOf(this.object).__PROPERTIES[this.propertyName];
  }

  constructor(private objectDirective: ObjectDirective) {}

  ngOnInit(): void {
    console.log(this.propertyDesc);
  }

  get value() {
    return this.objectDirective.object[this.propertyName];
  }

  set value(value: any) {
    this.objectDirective.object[this.propertyName] = value;
  }
}
