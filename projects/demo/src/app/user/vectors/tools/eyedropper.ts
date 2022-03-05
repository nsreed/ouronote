import { VectorTool } from './paper-tool';
import * as paper from 'paper';

export class EyedropperTool extends VectorTool {
  name = 'Eyedropper';
  icon = 'eye-dropper';
  downSub = this.down.subscribe((e: paper.ToolEvent) => {
    // this will sample a point from a raster. it fails when layers are too big. Use canvas sampling?
    // const raster = this.project.activeLayer.rasterize({ insert: false });
    // const color = raster.getAverageColor(e.point);
    // this.project.currentStyle.strokeColor = color;

    this.project.currentStyle = e.item?.style;
    const styleProps = [
      'strokeWidth',
      'strokeColor',
      'strokeCap',
      'strokeJoin',
      'strokeScaling',
      'dashOffset',
      'dashArray',
      'fillColor',
      'fillRule',
      'shadowColor',
      'shadowBlur',
      'shadowOffset',
      'fontFamily',
      'fontWeight',
      'fontSize',
      'leading',
      'justification',
      'miterLimit',
    ];
    styleProps.forEach((p) => {
      if (!(e.item?.style as any)[p]) {
        (this.project.currentStyle as any)[p] = null;
      }
    });
  });

  upSub = this.up.subscribe((e: paper.ToolEvent) => {
    VectorTool.lastActive?.activate();
  });
}
