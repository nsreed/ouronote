import { Directive, Input, EventEmitter } from '@angular/core';
import { GunChain } from './classes/GunChain';
import { NgGunService } from './ng-gun.service';
import { shareReplay } from 'rxjs/operators';

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
      this._chain$.emit(value);
    }
  }

  private _chain$ = new EventEmitter<GunChain>();
  chain$ = this._chain$.pipe(shareReplay(1));

  constructor(private ngGun: NgGunService) {}
}
