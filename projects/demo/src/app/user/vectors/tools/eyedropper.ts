import { VectorTool } from './paper-tool';
import * as paper from 'paper';

export class EyedropperTool extends VectorTool {
  name = 'Eyedropper';
  icon = 'eye-dropper';
  downSub = this.down.subscribe((e: paper.ToolEvent) => {
    // console.log('click', e);
    // const hits = this.scope.project.getItems({
    //   match: (item: paper.Item) => {
    //     return item.className !== 'Layer' && item.hitTest(e.point);
    //   },
    // });
    // console.log('hit', hits);
    // Find "best" item to pull styling from (this should be topmost item);
    // Apply style to... currently active tool? Current project style? Depends on how tool property sharing turns out.

    const raster = this.project.activeLayer.rasterize({ insert: false });
    const color = raster.getAverageColor(e.point);
    this.project.currentStyle.strokeColor = color;
  });

  upSub = this.up.subscribe((e: paper.ToolEvent) => {
    VectorTool.lastActive?.activate();
  });
}
