import { Injectable } from '@angular/core';
import {
  BreakPointRegistry,
  MediaMarshaller,
  MediaObserver,
  PrintHook,
} from '@angular/flex-layout';
import { MatchMedia } from '@angular/flex-layout/core/match-media';

@Injectable({
  providedIn: 'root',
})
export class MediaLayoutService extends MediaObserver {
  constructor(
    breakpoints: BreakPointRegistry,
    matchMedia: MatchMedia,
    hook: PrintHook
  ) {
    super(breakpoints, matchMedia, hook);
  }
}
