import { CAPABILITIES } from '../../../system.service';
import * as paper from 'paper';
export const byEventType = (type: string) => (event: any) =>
  event.event.pointerType === type;
export const isMouse = (event: any) => event.event.type.startsWith('mouse');
export const isPen = CAPABILITIES.POINTER
  ? (e: any) =>
      e instanceof window.PointerEvent ||
      e.event.pointerType === 'pen' ||
      e.event.type.startsWith('pen')
  : () => false;
export const isTouch = CAPABILITIES.TOUCH
  ? (e: any) =>
      e instanceof window.TouchEvent ||
      e.event.pointerType === 'touch' ||
      e.event.type.startsWith('touch')
  : () => false;

export const buildToolEvent = (source: PointerEvent, view: paper.View) =>
  ({
    point: view.viewToProject(new paper.Point(source.offsetX, source.offsetY)),
  } as paper.ToolEvent);
