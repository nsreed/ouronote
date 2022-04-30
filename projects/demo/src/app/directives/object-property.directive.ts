import { Directive, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ObjectDirective } from './object.directive';

@Directive({
  selector: '[appObjectProperty]',
})
export class ObjectPropertyDirective implements OnInit {
  @Input('appObjectProperty')
  public propertyName!: string;

  private _label?: string | undefined;
  public get label(): string | undefined {
    return this._label || this.meta?.label || this.propertyName;
  }
  @Input()
  public set label(value: string | undefined) {
    this._label = value;
  }

  @Output()
  propertyValueChange = new EventEmitter();

  get object() {
    return this.objectDirective.object;
  }

  get meta() {
    const p = Object.getPrototypeOf(this.object);
    if (!p.___PROPERTIES) {
      return null;
    }
    return p.___PROPERTIES[this.propertyName].config;
  }

  constructor(private objectDirective: ObjectDirective) {}

  ngOnInit(): void {}

  get value() {
    return this.objectDirective.object[this.propertyName];
  }

  set value(value: any) {
    this.objectDirective.object[this.propertyName] = value;
    this.propertyValueChange.emit(value);
  }
}
