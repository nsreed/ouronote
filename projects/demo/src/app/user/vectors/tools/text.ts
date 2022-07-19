import { VectorTool } from './paper-tool';
import * as paper from 'paper';
import { Style } from 'paper';
import { Property } from '../functions/decorators';
import { PairedItem } from '../classes/paper-pair';
import { DrawTool } from './draw-tool';
import { getShallow } from '../functions/packaging';
export class TextTool extends DrawTool {
  name = 'text';
  matIconName = 'text_fields';
  shape?: paper.Shape;
  text?: PairedItem<paper.PointText>;

  @Property()
  style = new Style({
    strokeCap: 'round',
    strokeJoin: 'round',
    strokeWidth: 3,
    fontSize: 20,
    fillColor: new paper.Color(0, 0, 0),
  } as paper.Style);

  @Property({
    label: 'Scale',
  })
  scale = false;

  @Property({
    label: 'Content',
  })
  content = '';

  propertyNames: string[] = ['content', 'style'];

  downSub = this.down.subscribe((e: any) => {
    this.activateDrawLayer();
    this.project.deselectAll();
    // Look for text (to select)
    const selected = this.project.getItem({
      match: (item: paper.Item) => {
        if (item.className === 'PointText') {
          return item.hitTest(e.point);
        }
        return false;
      },
    });
    if (selected) {
      selected.selected = true;
      return;
    }

    // If no selectable text, create a new text
    this.text = new paper.PointText(e.point);
    this.text.content = `${this.content}`;
    this.text.style = this.project.currentStyle;
    this.text.style = this.style;
    this.text.fontFamily = 'sans-serif';
    this.text.fontWeight = 'normal';
    this.text.fontSize = this.style.fontSize || 20;
    this.text.justification = 'left';
    this.text.strokeWidth = this.style.strokeWidth;
    this.text.strokeColor = this.style.strokeColor;
    this.text.fillColor = this.style.fillColor;
    this.text.applyMatrix = true;

    this.text.pair?.save([
      'content',
      'strokeWidth',
      'fillColor',
      'strokeColor',
      'fontFamily',
      'fontWeight',
      'fontSize',
      'justification',
      'position',
    ]);
    this.text.pair?.doSave();
    this.project.activeLayer.insertChild(
      this.project.activeLayer.children.length,
      this.text
    );
    this.text.selected = true;
  });

  dragSub = this.drag.subscribe((e: any) => {
    // const prev = (this.scope.settings as any).insertItems;
    // (this.scope.settings as any).insertItems = false;
    // this.shape?.remove();
    // this.shape = new paper.Shape.Rectangle(e.downPoint, e.point);
    // this.shape.data.ignore = true;
    // this.shape.style = this.style;
    // this.shape.style = this.project.currentStyle;
    // const width = this.scale
    //   ? (1 / this.project.view.zoom) * this.style.strokeWidth
    //   : this.style.strokeWidth;
    // this.shape.strokeWidth = width;
    // (this.scope.settings as any).insertItems = prev;
    // this.project.activeLayer.insertChild(
    //   this.project.activeLayer.children.length,
    //   this.shape
    // );
  });

  upSub = this.up.subscribe((e: any) => {
    // if (this.shape) {
    //   this.shape.data.ignore = undefined;
    //   this.project.activeLayer.insertChild(
    //     this.project.activeLayer.children.length,
    //     this.shape
    //   );
    //   (this.shape as any).pair?.doSave(); // this is to get around weirdness in 'smart' saves when starting with an ignored item
    //   delete this.shape;
    // }
  });
}
