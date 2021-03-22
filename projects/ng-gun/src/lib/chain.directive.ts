import { Directive, Input, EventEmitter } from '@angular/core';
import { GunChain } from './classes/GunChain';
import { NgGunService } from './ng-gun.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[gunChain]',
  exportAs: 'gunChain',
})
export class ChainDirective {
  private _chain?: GunChain | undefined;
  public get chain(): GunChain | undefined {
    return this._chain;
  }
  @Input('gunChain')
  public set chain(value: GunChain | undefined) {
    if (value !== this._chain) {
      this._chain = value;
      this.chain$.emit(value);
    }
  }

  chain$ = new EventEmitter<GunChain>();

  constructor(private ngGun: NgGunService) {}
}
