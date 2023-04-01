import { Directive, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { getNodeMeta, getNodeProps } from '../common/metadata';
import { ObjectDirective } from './object.directive';
import { ReplaySubject } from 'rxjs';

@Directive({
  selector: '[appObjectProperty]',
})
export class ObjectPropertyDirective implements OnInit {
  get object() {
    return this.objectDirective.object;
  }

  @Input('appObjectProperty')
  public propertyName!: string;

  private _label?: string | undefined;
  public get label(): string | undefined {
    return this._label || this.meta?.description || this.propertyName;
  }
  @Input()
  public set label(value: string | undefined) {
    this._label = value;
  }

  @Output()
  propertyValueChange = new ReplaySubject();

  get meta() {
    const props = getNodeProps(this.object.schematic);
    if (props && this.propertyName in props) {
      return (props as any)[this.propertyName];
    }

    const p = Object.getPrototypeOf(this.object);
    if (!p.___PROPERTIES) {
      return null;
    }
    return (p.___PROPERTIES[this.propertyName] || { config: {} }).config;
  }

  constructor(private objectDirective: ObjectDirective) {}

  ngOnInit(): void {}

  object$ = this.objectDirective.object$;

  get value() {
    return this.objectDirective.object[this.propertyName];
  }

  set value(value: any) {
    this.objectDirective.object[this.propertyName] = value;
    this.propertyValueChange.next(value);
  }
}
