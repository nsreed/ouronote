import { Tool, ToolEvent } from 'paper';
import { fromEvent } from 'rxjs';
import { after$ } from '../../functions/aspect-rx';
import * as paper from 'paper';
import { filter, switchMapTo, takeUntil, tap } from 'rxjs/operators';

export class VectorTool extends Tool {
  drag = fromEvent<paper.ToolEvent>(this, 'mousedrag');
  down = fromEvent<paper.ToolEvent>(this, 'mousedown').pipe(
    tap((e) => this.activateDrawLayer())
  );
  up = fromEvent<paper.ToolEvent>(this, 'mouseup');
  move = fromEvent<paper.ToolEvent>(this, 'mousemove');

  wheel = fromEvent<{ event: WheelEvent; point: paper.Point }>(
    this,
    'mousewheel'
  );

  keydown = fromEvent<paper.KeyEvent>(this, 'keydown');
  keyup = fromEvent<paper.KeyEvent>(this, 'keyup');

  // click = this.down.pipe(switchMapTo(this.up.pipe(takeUntil(this.move))));

  name = 'unnamed tool';

  touchDown = this.down.pipe(filter((e: any) => e.event instanceof TouchEvent));

  get project() {
    return this.scope.project as paper.Project;
  }

  constructor(public readonly scope: paper.PaperScope) {
    super();
    this.touchDown.subscribe((e) => {
      console.log('touch down', e);
    });

    this.wheel.subscribe((e) => {
      const zoomDelta = e.event.deltaY;
      const centerDelta = (this.scope.view.bounds.center as any).subtract(
        e.point
      );
      console.log('wheel', zoomDelta, centerDelta);
    });
    this.setup();
    // this.click.subscribe((e) => console.log('click', e));
    // TODO touch events should be filterable/reduce()ed in such a way as to allow gesture integration
  }
  protected setup() {}

  activate() {
    super.activate();
  }

  activateDrawLayer() {
    if (this.scope.project.activeLayer.data.ignore) {
      const drawLayer = this.project.getItem({
        className: 'Layer',
        data: {
          ignore: undefined,
        },
      }) as paper.Layer;
      if (drawLayer) {
        drawLayer.activate();
      } else {
        const newDrawLayer = new paper.Layer();
      }
    }
  }
}
