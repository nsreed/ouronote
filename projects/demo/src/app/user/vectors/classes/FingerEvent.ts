import * as paper from 'paper';

export class FingerEvent {
  constructor(public event: TouchEvent, public point: paper.Point) {}
}
