import { VectorTool } from '../paper-tool';
import { Path, Style } from 'paper';
export class PenTool extends VectorTool {
  path?: typeof Path | null;
  name = 'pen';
  style = new Style({});
  setup() {
    this.drag.subscribe((e) => {
      console.log(e);
    });
    this.up.subscribe((e) => (this.path = null));
  }
}
