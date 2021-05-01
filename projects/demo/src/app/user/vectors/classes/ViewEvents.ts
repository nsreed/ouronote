import * as paper from 'paper';
import { map, mergeMap } from 'rxjs/operators';
import { from, fromEvent } from 'rxjs';
import { PenEvent } from './PenEvent';

export type Start = 'start';
export type Move = 'move';
export type End = 'end';
export type Up = 'up';
export type Down = 'down';
export type EventSuffix = Start | Move | End | Up | Down;

export type FirstEvent = Start | Down;
export type LastEvent = Up | End;

export const TOUCH_EVENTS: EventSuffix[] = ['start', 'move', 'end'];
export const POINTER_EVENTS: EventSuffix[] = ['down', 'move', 'up'];
export const MOUSE_EVENTS: EventSuffix[] = ['down', 'move', 'up'];

export const EVENT_SOURCES = ['mouse', 'touch', 'pen'];
export const EVENT_SOURCE_SUFFIXES = {
  mouse: MOUSE_EVENTS,
  pointer: POINTER_EVENTS,
  touch: TOUCH_EVENTS,
};

export const FIRST_EVENTS: EventSuffix[] = ['start', 'down'];
export const LAST_EVENTS: EventSuffix[] = ['end', 'up'];

/**
 * Manages mouse, touch, and pen events for a paper.js view
 */
export class ViewEventSource<
  T extends MouseEvent | TouchEvent | PointerEvent = MouseEvent
> {
  last?: T;

  subs = from(this.events).pipe(
    map((n) => `${this.sourceType}${n}`),
    mergeMap((n) =>
      fromEvent(this.view.element, n).pipe(
        map((e: any) => new PenEvent(e, new paper.Point(0, 0)))
      )
    )
  );

  constructor(
    private scope: paper.PaperScope,
    private view: paper.View,
    private sourceType: string,
    private events: string[]
  ) {}
}
