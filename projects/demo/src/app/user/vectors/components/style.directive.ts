import { Input } from '@angular/core';
import { Directive } from '@angular/core';
import { Style } from 'paper';
import { Property } from '../functions/decorators';

@Directive({
  selector: '[appStyle]',
})
export class StyleDirective {
  @Input()
  style = new Style({
    strokeCap: 'round',
    strokeJoin: 'round',
    strokeWidth: 3,
  } as paper.Style);
  constructor() {}
}
