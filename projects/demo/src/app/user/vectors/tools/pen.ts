import { VectorTool } from '../paper-tool';
import { Path, Style } from 'paper';
import * as paper from 'paper';
export class PenTool extends VectorTool {
  path!: paper.Path;
  name = 'pen';
  style = new Style({});
  color = new paper.Color(Math.random(), Math.random(), Math.random());
  setup() {
    this.down.subscribe((e) => {
      this.path = new paper.Path(e.point) as any;
      // TODO ignored items - working now but creates an ItemPair
      // this.path.data.ignored = true;
    });
    this.drag.subscribe((e) => {
      this.path.add(e.point);
      this.color.hue++;
      this.path.strokeColor = this.color as any;
      this.path.strokeWidth = 3 + Math.random() * 4;
    });
    this.up.subscribe((e) => {
      (this.path as any).pair.save();
    });
    // this.up.subscribe((e) => (this.path = null));
  }
}
