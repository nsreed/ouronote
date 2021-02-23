import { Directive, Input } from '@angular/core';
import { VectorTool } from '../paper-tool';

@Directive({
  selector: '[appTool]',
})
export class ToolDirective {
  @Input('appTool')
  tool!: VectorTool;

  constructor() {}
}
