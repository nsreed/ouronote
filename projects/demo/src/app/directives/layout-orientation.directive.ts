import { mergeMap, filter, take, map, tap } from 'rxjs/operators';
import { Directive, ElementRef, Inject, Input, Optional } from '@angular/core';
import {
  LayoutConfigOptions,
  LayoutDirective,
  LayoutStyleBuilder,
  LAYOUT_CONFIG,
  MediaMarshaller,
  MediaObserver,
  StyleUtils,
} from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: `
[fxLayout.print],
[fxLayout.tablet.landscape],
[fxLayout.tablet.portrait],
[fxLayout.landscape],
[fxLayout.portrait],
[fxHide.landscape],
[fxHide.portrait]
`,
})
export class LayoutOrientationDirective extends LayoutDirective {
  constructor(
    public monitor: MediaObserver,
    public elRef: ElementRef<any>,
    private styleUtils: StyleUtils,
    styleBuilder: LayoutStyleBuilder,
    public marshal: MediaMarshaller,
    @Optional()
    @Inject(LAYOUT_CONFIG)
    _config: LayoutConfigOptions
  ) {
    super(elRef, styleUtils, styleBuilder, marshal, _config);
  }

  @Input('fxLayout.print')
  set layoutPrint(val: any) {
    super.styleCache.set('layoutPrint', val);
  }

  @Input('fxLayout.tablet.landscape')
  set layoutHTab(val: any) {
    this.styleCache.set('layoutHTab', val);
  }

  @Input('fxLayout.tablet.portrait')
  set layoutVTab(val: any) {
    this.styleCache.set('layoutVTab', val);
  }

  hideListeners = new Map<string, Subscription>();

  @Input('fxHide.portrait')
  set hideWhenMqPortrait(v: any) {
    this.hideWhenMqAlias('portrait', v);
  }

  @Input('fxHide.landscape')
  set hideWhenMqLandscape(v: any) {
    this.hideWhenMqAlias('landscape', v);
  }

  change$ = this.monitor
    .asObservable()
    .pipe(map((changes) => changes.filter((c) => c.matches)));

  hideWhenMqAlias(mqAlias: string, val: any) {
    if (val) {
      if (this.hideListeners.has(mqAlias)) {
        return;
      }
      const mqListener = this.change$
        .pipe(
          map((changes) => changes.some((c) => c.mqAlias.includes(mqAlias)))
        )
        .subscribe((hasIt) => {
          if (this.elRef.nativeElement instanceof HTMLElement) {
            const classList = this.elRef.nativeElement.classList;
            const clsName = `fxhide-${mqAlias}`;
            if (hasIt) classList.add(clsName);
            else classList.remove(clsName);
          }
        });
      this.hideListeners.set(mqAlias, mqListener);
    } else {
      if (this.hideListeners.has(mqAlias)) {
        this.hideListeners.get(mqAlias)?.unsubscribe();
        this.hideListeners.delete(mqAlias);
      }
    }
  }
}
