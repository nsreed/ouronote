import { Directive, Input } from '@angular/core';
import { VectorTool } from '../tools/paper-tool';

@Directive({
  selector: '[appTool]',
})
export class ToolDirective {
  @Input('appTool')
  tool!: VectorTool;

  constructor() {}
}
