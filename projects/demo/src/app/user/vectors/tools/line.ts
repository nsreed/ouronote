import { VectorTool } from './paper-tool';
import * as paper from 'paper';
import { Style } from 'paper/dist/paper-core';
import { Property } from '../functions/decorators';
export class LineTool extends VectorTool {
  path!: paper.Path;

  icon = 'bezier-curve';
  name = 'line';

  @Property()
  style = new Style({
    strokeCap: 'round',
    strokeJoin: 'round',
    strokeWidth: 3,
  } as paper.Style);

  @Property({
    label: 'Scale',
  })
  scale = false;

  propertyNames = ['style', 'scale'];
  downSub = this.down.subscribe();

  dragSub = this.drag.subscribe((e: paper.ToolEvent) => {
    if (!this.path) {
      this.path = new paper.Path(e.point) as any;

      (this.path as any).pair.editing = true;
      this.path.style = this.style;
      this.path.style = this.project.currentStyle;
      const width = this.scale
        ? (1 / this.project.view.zoom) * this.style.strokeWidth
        : this.style.strokeWidth;
      this.path.strokeWidth = width;
      this.path.strokeColor = this.project.currentStyle.strokeColor;
      this.path.fillColor = this.project.currentStyle.fillColor;
    }
    this.path.removeSegments();
    this.path.add(e.downPoint);
    this.path.add(e.point);
  });

  upSub = this.up.subscribe((e) => {
    if (this.path) {
      if (this.path.length === 0) {
        this.path.remove();
        return;
      } else {
        const p = this.path;
        this.scope.actions = this.scope.actions || [];
        this.scope.actions.push({
          undoFn: () => {
            console.log('should remove', p);
            p.remove();
          },
        });
      }

      (this.path as any).pair.doSave();
      (this.path as any).pair.editing = false;
      // TODO add this path to the undo stack
      this.path = null as any;
    }
  });

  filterEvent(event: any) {
    // Respond to pen if pointerType is present, if it isn't assume we're mouse-only
    return true; // ['pen', undefined].includes(event.event.pointerType); // TODO re-enable me when ready to tackle digitizer support
  }
}
