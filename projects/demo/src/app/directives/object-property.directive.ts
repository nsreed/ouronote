import { Directive, Input, OnInit } from '@angular/core';
import { ObjectDirective } from './object.directive';

@Directive({
  selector: '[appObjectProperty]',
})
export class ObjectPropertyDirective implements OnInit {
  @Input('appObjectProperty')
  public propertyName!: string;

  constructor(private objectDirective: ObjectDirective) {}

  ngOnInit(): void {
    console.log(
      this.objectDirective.object[this.propertyName],
      this.propertyName
    );
  }

  get value() {
    return this.objectDirective.object[this.propertyName];
  }

  set value(value: any) {
    this.objectDirective.object[this.propertyName] = value;
  }
}
