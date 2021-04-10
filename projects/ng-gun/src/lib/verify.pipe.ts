import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Optional,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { map, take, pluck, tap } from 'rxjs/operators';
import { NgSeaService } from './ng-sea.service';
import { ChainDirective } from './chain.directive';
import { SEA } from 'gun';
import { of, from } from 'rxjs';
import { NgGunService } from './ng-gun.service';

@Pipe({
  name: 'verify',
})
export class VerifyPipe extends AsyncPipe implements PipeTransform {
  constructor(
    private ngGun: NgGunService,
    private sea: NgSeaService,
    private ref: ChangeDetectorRef,
    @Optional()
    private chain: ChainDirective
  ) {
    super(ref);
  }
  transform(value: any, ...args: any[]) {
    if (!this.chain.chain) {
      return null;
    }
    return from(
      SEA.verify(value, this.chain.chain?.recordPub.replace('~', ''))
    ).pipe(
      // tap((v) => console.log('verified', v)),
      tap((v) => this.ref.detectChanges())
    ) as any;
    // ) as any;
  }
}
