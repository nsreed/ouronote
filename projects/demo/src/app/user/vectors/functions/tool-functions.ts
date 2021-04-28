import { CAPABILITIES } from '../../../system.service';
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
