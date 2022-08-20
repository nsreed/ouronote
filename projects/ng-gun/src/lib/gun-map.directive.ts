import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { GunChain } from './classes/GunChain';
import * as Gun from 'gun';

export class GunMapContext<T, U extends GunChain> {
  constructor(public $implicit: T, public key: string, public chain: U) {}
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[gunMapOf]',
})
export class GunMapDirective {
  soulViews = new Map<string, EmbeddedViewRef<any>>();
  @Input('gunMapOf') set gunMapOf(value: GunChain) {
    if (!value) {
      return;
    }
    value
      .map()
      .on({ includeKeys: true })
      .subscribe(([data, key]: any) => {
        if (data === undefined) {
          const embed = this.soulViews.get(key);
          if (embed) {
            embed.destroy();
            this.soulViews.delete(key);
          }
        } else if (!this.soulViews.get(key)) {
          const embed = this.viewContainer.createEmbeddedView(
            this.templateRef,
            new GunMapContext(data, key, value.get(key))
          );
          this.soulViews.set(key, embed);
        }
      });
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
