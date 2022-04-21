import { Directive } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { propertyChange$ } from '../user/vectors/functions/paper-chain';
import { EraserTool } from '../user/vectors/tools/eraser';
import { MoveTool } from '../user/vectors/tools/move';
import { PenTool } from '../user/vectors/tools/pen';
import {
  RectangleSelectTool,
  LassoSelectTool,
} from '../user/vectors/tools/select';
import { ShapeTool } from '../user/vectors/tools/shape';
import { PaperDirective } from './paper.directive';
import { EyedropperTool } from '../user/vectors/tools/eyedropper';
import { LineTool } from '../user/vectors/tools/line';
import { RotateTool } from '../user/vectors/tools/rotate';
import { ResizeTool } from '../user/vectors/tools/resize';

@Directive({
  selector: '[appPaperEdit]',
  exportAs: 'appPaperEdit',
})
export class PaperEditDirective extends PaperDirective {
  tool$ = propertyChange$(this.scope, 'tool').pipe(shareReplay(1));
  public areaSelect = new RectangleSelectTool(this.scope as any);
  public lassoSelect = new LassoSelectTool(this.scope as any);
  public pen = new PenTool(this.scope as any);
  public eraser = new EraserTool(this.scope as any);
  public shape = new ShapeTool(this.scope as any);
  public move = new MoveTool(this.scope as any);
  public eyedropper = new EyedropperTool(this.scope as any);
  public line = new LineTool(this.scope as any);
  public rotate = new RotateTool(this.scope as any);
  public resize = new ResizeTool(this.scope as any);
}
