import * as paper from 'paper';
export class PenEvent {
  constructor(public event: PointerEvent, public point: paper.Point) {}
}
