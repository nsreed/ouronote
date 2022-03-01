import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appObject]',
})
export class ObjectDirective implements OnInit {
  @Input('appObject')
  public object: any;
  constructor() {}

  ngOnInit(): void {}
}
