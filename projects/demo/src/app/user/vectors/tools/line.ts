import * as paper from 'paper';
import { Style } from 'paper/dist/paper-core';
import { Property } from '../functions/decorators';
import { DrawTool } from './draw-tool';
export class LineTool extends DrawTool {
  path!: paper.Path;
  pathNew!: paper.Path;

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
  downSub = this.down.subscribe((e: paper.ToolEvent) => {
    // paper.Key.modifiers.control;
    if (!e.modifiers.shift) {
      this.path = null as any;
      this.pathNew = null as any;
    }
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
  });

  moveSub = this.move.subscribe((e: paper.ToolEvent) => {
    if (e.modifiers.shift) {
      this.pathNew = this.path.clone();
      this.pathNew.removeOnMove();

      // this.path.removeSegments();
      // this.path.add();
      this.pathNew.add(e.point);
    }
  });
  dragSub = this.drag.subscribe((e: paper.ToolEvent) => {});

  upSub = this.up.subscribe((e: any) => {
    if (this.pathNew) {
      if (this.pathNew.length === 0) {
        this.pathNew.remove();
        return;
      } else {
        const p = this.path;
        p.copyContent(this.pathNew);
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
      // this.path = null as any;
    }
  });

  filterEvent(event: any) {
    // Respond to pen if pointerType is present, if it isn't assume we're mouse-only
    return true; // ['pen', undefined].includes(event.event.pointerType); // TODO re-enable me when ready to tackle digitizer support
  }
}
