import { Inject, Injectable } from '@angular/core';
const POINTER = window.PointerEvent && navigator.maxTouchPoints > 0;
const TOUCH =
  window.TouchEvent &&
  window.ontouchstart !== undefined &&
  document.ontouchend !== undefined;
export const CAPABILITIES = {
  POINTER,
  TOUCH,
};

@Injectable({
  providedIn: 'root',
})
export class SystemService {}
