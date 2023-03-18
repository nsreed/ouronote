import { Directive, OnInit } from '@angular/core';
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
import { TextTool } from '../user/vectors/tools/text';
import { PanTool } from '../user/vectors/tools/pan';
import { VectorTool } from '../user/vectors/tools/paper-tool';
import { Observable } from 'rxjs';
import { PointerTool } from '../user/vectors/tools/pointer';

@Directive({
  selector: '[appPaperEdit]',
  exportAs: 'appPaperEdit',
})
export class PaperEditDirective extends PaperDirective implements OnInit {
  tool$: Observable<VectorTool> = propertyChange$(this.scope, 'tool').pipe(
    shareReplay(1) as any
  );
  public pointer = new PointerTool(this.scope as any);
  public pen = new PenTool(this.scope as any);
  public eraser = new EraserTool(this.scope as any);
  public shape = new ShapeTool(this.scope as any);
  public line = new LineTool(this.scope as any);
  public text = new TextTool(this.scope as any);
  public eyedropper = new EyedropperTool(this.scope as any);
  public pan = new PanTool(this.scope as any);
  public areaSelect = new RectangleSelectTool(this.scope as any);
  public lassoSelect = new LassoSelectTool(this.scope as any);
  public move = new MoveTool(this.scope as any);
  public rotate = new RotateTool(this.scope as any);
  public resize = new ResizeTool(this.scope as any);

  ngOnInit(): void {
    super.ngOnInit();

    this.project.currentStyle = new this.scope.Style({}) as any;
    this.project.currentStyle.strokeColor = new this.scope.Color(
      0,
      0,
      0
    ) as any;

    // this.tool$.subscribe(console.log);

    // (this.project as any).on('change', (e: any) => {
    //   // TODO use this
    //   console.log(`${e.path} = ${JSON.stringify(e.value)}`);
    // });
  }
}
