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
        if (!this.soulViews.get(Gun.node.soul(data))) {
          const embed = this.viewContainer.createEmbeddedView(
            this.templateRef,
            new GunMapContext(data, key, value.get(key))
          );
          this.soulViews.set(Gun.node.soul(data), embed);
        }
      });
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
