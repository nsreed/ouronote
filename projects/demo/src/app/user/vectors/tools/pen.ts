import { VectorTool } from '../paper-tool';
import { Path, Style } from 'paper';
import * as paper from 'paper';
import { Property } from '../functions/decorators';
export class PenTool extends VectorTool {
  path!: paper.Path;
  name = 'pen';
  @Property()
  style = new Style({
    strokeCap: 'round',
    strokeJoin: 'round',
    strokeWidth: 3,
  } as paper.Style);
  @Property()
  smoothing = true;
  setup() {
    // this.style.strokeJoin
    this.down.subscribe((e) => {
      this.logger.log('pen down', e.point);
      this.path = new paper.Path(e.point) as any;
      (this.path as any).pair.editing = true;
      this.path.style = this.style;
    });
    this.drag.subscribe((e) => {
      this.path.add(e.point);
    });
    this.up.subscribe((e) => {
      this.path.strokeColor = this.project.currentStyle.strokeColor;
      this.path.fillColor = this.project.currentStyle.fillColor;
      // (this.path as any).pair?.save('segments');
      // (this.path as any).pair?.save();
      if (this.smoothing) {
        this.path.smooth();
      }
      (this.path as any).pair?.doSave();
      (this.path as any).pair.editing = false;
    });
  }
}
