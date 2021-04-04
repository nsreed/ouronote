import { VectorTool } from '../paper-tool';
import { Path, Style } from 'paper';
import * as paper from 'paper';
import { Property } from '../functions/decorators';
export class PenTool extends VectorTool {
  path!: paper.Path;
  name = 'pen';
  @Property()
  style = new Style({});
  color = new paper.Color(Math.random(), Math.random(), Math.random());
  setup() {
    this.down.subscribe((e) => {
      this.path = new paper.Path(e.point) as any;
      this.path.strokeWidth = 3;
      this.path.strokeColor = this.project.currentStyle.strokeColor;
    });
    this.drag.subscribe((e) => {
      this.path.add(e.point);
    });
    this.up.subscribe((e) => {
      this.path.strokeColor = this.project.currentStyle.strokeColor;
      (this.path as any).pair?.save();
    });
  }
}
