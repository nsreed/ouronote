import { Directive, Input, OnInit, EventEmitter } from '@angular/core';
import { getNodeMeta } from '../common/metadata';
import { ReplaySubject } from 'rxjs';

@Directive({
  selector: '[appObject]',
})
export class ObjectDirective implements OnInit {
  object$ = new ReplaySubject();
  private _object: any;
  public get object(): any {
    return this._object;
  }
  @Input('appObject')
  public set object(value: any) {
    this._object = value;
    this.object$.next(value);
  }
  constructor() {}

  get metadata() {
    return getNodeMeta('meta:node', this.object || {});
  }

  ngOnInit(): void {}
}
