import { Directive, Input, OnInit, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appObject]',
})
export class ObjectDirective implements OnInit {
  object$ = new EventEmitter();
  private _object: any;
  public get object(): any {
    return this._object;
  }
  @Input('appObject')
  public set object(value: any) {
    this._object = value;
    this.object$.emit(value);
  }
  constructor() {}

  ngOnInit(): void {}
}
