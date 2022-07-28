import { Directive, Input, EventEmitter } from '@angular/core';
import { GunChain } from './classes/GunChain';
import { NgGunService } from './ng-gun.service';
import { shareReplay } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[gunChain]',
  exportAs: 'gunChain',
})
export class ChainDirective<T = any> {
  private _chain?: GunChain<T> | undefined;
  public get chain(): GunChain<T> | undefined {
    return this._chain;
  }
  @Input('gunChain')
  public set chain(value: GunChain<T> | undefined) {
    if (value !== this._chain) {
      this._chain = value;
      this.chain$.next(value as any);
    }
  }

  chain$ = new ReplaySubject<GunChain<T>>(1);

  constructor(protected ngGun: NgGunService) {}
}
