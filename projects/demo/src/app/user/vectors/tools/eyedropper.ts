import { VectorTool } from './paper-tool';
import * as paper from 'paper';
import { copyNulls, copyStyleToItem } from '../functions/paper-functions';

export class EyedropperTool extends VectorTool {
  name = 'Eyedropper';
  icon = 'eye-dropper';
  downSub = this.down.subscribe((e: paper.ToolEvent) => {
    // this will sample a point from a raster. it fails when layers are too big. Use canvas sampling?
    // const raster = this.project.activeLayer.rasterize({ insert: false });
    // const color = raster.getAverageColor(e.point);
    // this.project.currentStyle.strokeColor = color;

    this.project.currentStyle = e.item?.style;

    copyStyleToItem(e.item, this.project.currentStyle);
    copyNulls(e.item, this.project.currentStyle);
  });

  upSub = this.up.subscribe((e: paper.ToolEvent) => {
    this.scope.lastActiveTool?.activate();
  });
}
