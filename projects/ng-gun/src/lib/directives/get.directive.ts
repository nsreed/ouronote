import {
  Directive,
  Optional,
  SkipSelf,
  OnInit,
  EventEmitter,
  Input,
} from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ChainDirective } from '../chain.directive';
import { GunChain } from '../classes/GunChain';
import { NgGunService } from '../ng-gun.service';
import { switchMap, map } from 'rxjs/operators';

@Directive({
  selector: '[gunGet]',
  exportAs: 'gunGet',
  providers: [{ provide: ChainDirective, useExisting: GetDirective }],
})
export class GetDirective extends ChainDirective implements OnInit {
  get$ = new ReplaySubject(1);
  _get!: string;
  @Input('gunGet')
  set get(value: string) {
    this._get = value;
    this.get$.next(value);
  }
  get get() {
    return this._get;
  }

  constructor(
    @SkipSelf()
    private readonly back: ChainDirective,
    ngGun: NgGunService
  ) {
    super(ngGun);
  }
  ngOnInit(): void {
    const path = this.get.split(/(\.|\/)/).filter((k) => !/(\.|\/)/.test(k));
    let c = this.back.chain as GunChain<any>;
    while (path.length) {
      const nextKey = path.shift();
      // console.log({ nextKey });
      c = c.get(nextKey);
    }
    this.chain = c;
  }
}
