import * as paper from 'paper';
import { Observable } from 'rxjs';
import { CAPABILITIES } from '../../../system.service';
import { PenEvent } from '../classes/PenEvent';
import { Property } from '../functions/decorators';
import { VectorTool } from './paper-tool';
import { copyNulls } from '../functions/paper-functions';
import { ItemPair } from '../classes/ItemPair';
import { DrawTool } from './draw-tool';
export class PenTool extends DrawTool {
  path!: paper.Path;
  icon = 'marker';
  name = 'pen';

  constructor(scope: any) {
    super(scope);
    this.logger.monitor(this, 'handleDrag');
  }

  @Property()
  style = new paper.Style({
    strokeCap: 'round',
    strokeJoin: 'round',
    strokeWidth: 3,
  } as paper.Style);

  @Property({
    label: 'Smooth',
  })
  simplify = true;

  @Property({
    label: 'Strength',
    min: -1,
    max: 10,
    default: 2,
  })
  smoothingStrength = 2;

  @Property({
    label: 'Scale',
  })
  scale = false;

  // @Reflect.metadata('design:enumerables', {})
  propertyNames = ['style', 'simplify', 'smoothingStrength', 'scale'];

  penDown: Observable<PenEvent | paper.ToolEvent> = CAPABILITIES.POINTER
    ? this.pointerDown
    : this.down;
  penDrag: Observable<PenEvent | paper.ToolEvent> = CAPABILITIES.POINTER
    ? this.pointerDrag
    : this.drag;
  penUp: Observable<PenEvent | paper.ToolEvent> = CAPABILITIES.POINTER
    ? this.pointerUp
    : this.up;
  downSub = this.down.subscribe((e: any) => {
    if (this.path) {
      this.logger.warn('pre-existing path on pointer down!');
      this.path = null as any;
    }
    this.activateDrawLayer();
  });
  handleDrag = (e: any) => {
    if (!this.path) {
      this.path = new paper.Path(e.point) as any;
      const pair = (this.path as any).pair;
      if (pair) {
        pair.editing = true;
      }
      this.path.style = this.style;
      this.path.style = this.project.currentStyle;
      const width = this.scale
        ? (1 / this.project.view.zoom) * this.style.strokeWidth
        : this.style.strokeWidth;
      this.path.strokeWidth = width;
      this.path.strokeColor = this.project.currentStyle.strokeColor;
      this.path.fillColor = this.project.currentStyle.fillColor;
    }
    this.path.add(e.point);
  };
  dragSub = this.drag.subscribe((e) => this.handleDrag(e));

  upSub = this.up.subscribe((e: any) => {
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

      if (this.simplify) {
        const segmentCount = this.path.segments.length;
        /* the more zoomed in we are, the smaller a tolerance ("error") we should be using when smoothing
          inversely, as we zoom out, we can tolerate a lot more smoothing.
          this is because simplificaiton is calculated by distance in paper.js units,
          but the input point density is relative to the zoom level.

                       zoom  scaling
          zoomed out+  0.25  16
          zoomed out   0.5   4
          normal       1.0   1
          zoomed in    2.0   0.25
          zoomed in+   4.0   0.0625
        */
        const defaultSmoothingTolerance = 2.5; // this is what paper.js uses by default
        const zoom = this.project.view.zoom; // this is how many pixels on screen represent a paper.js unit
        const scalingFactor = 1 / (zoom * zoom); // this is used to scale the tolerance with respect to pixel density
        const actualTolerance = // calculate the actual applied tolerance
          defaultSmoothingTolerance * scalingFactor * this.smoothingStrength;
        // This value can be modified by the user to impact the smoothing strength
        // TODO move the smothing options into discrete features
        // this.path.smooth({ type: 'continuous', factor: 0.1 });
        //const sizeBefore = JSON.stringify(this.path).length;
        this.path.simplify(actualTolerance);
        //const sizeAfter = JSON.stringify(this.path).length;

        // Gloating
        //const difference = segmentCount - this.path.segments.length;
        //const percentage =
        //  100 - Math.round((this.path.segments.length / segmentCount) * 100);
        //
        // console.log(
        //   `Smoothing: removed ${difference} of the ${segmentCount} segments, or (${percentage}%) segments... `,
        //   `went from ${sizeBefore} to ${sizeAfter} bytes, or ${Math.round(
        //     (sizeAfter / sizeBefore) * 100
        //   )}% original`
        // );
      }

      const pair = (this.path as any).pair as ItemPair;
      if (pair) {
        pair.doSave();
        pair.editing = false;
      }
      // TODO add this path to the undo stack
      this.path = null as any;
    }
  });

  filterEvent(event: any) {
    // Respond to pen if pointerType is present, if it isn't assume we're mouse-only
    return true; // ['pen', undefined].includes(event.event.pointerType); // TODO re-enable me when ready to tackle digitizer support
  }

  activate(): void {
    super.activate();
    if (this.scope) {
      this.scope.actions = [];
    }
    if (this.project) {
      this.style.strokeWidth = this.project.currentStyle.strokeWidth;
    }
  }
}
