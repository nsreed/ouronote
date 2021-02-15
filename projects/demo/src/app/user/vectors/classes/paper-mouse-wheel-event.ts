import * as paper from 'paper';
export class PaperMouseWheelEvent extends paper.MouseEvent {
  constructor(public readonly domEvent: WheelEvent) {
    super();
  }
}
export class PaperToolWheelEvent extends paper.ToolEvent {
  constructor(
    public readonly event: WheelEvent,
    public readonly target = event.target,
    public readonly type = 'mousewheel'
  ) {
    super();
  }
}
