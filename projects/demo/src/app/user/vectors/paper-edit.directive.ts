import { Directive } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { propertyChange$ } from './functions/paper-chain';
import { PaperDirective } from './paper.directive';
import { EraserTool } from './tools/eraser';
import { MoveTool } from './tools/move';
import { PanTool } from './tools/pan';
import { PenTool } from './tools/pen';
import { RectangleSelectTool } from './tools/select';
import { ShapeTool } from './tools/shape';

@Directive({
  selector: '[appPaperEdit]',
  exportAs: 'appPaperEdit',
})
export class PaperEditDirective extends PaperDirective {
  tool$ = propertyChange$(this.scope, 'tool').pipe(shareReplay(1));

  public pen = new PenTool(this.scope as any);
  public shape = new ShapeTool(this.scope as any);
  public eraser = new EraserTool(this.scope as any);
  // public select = new LassoSelectTool(this.scope as any); // FIXME fix lasso select
  public areaSelect = new RectangleSelectTool(this.scope as any);
  public move = new MoveTool(this.scope as any);
  // public eyedropper = new EyedropperTool(this.scope as any);
}
