import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { GunChain } from '../classes/GunChain';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscribable, of, from } from 'rxjs';
import { switchMap, shareReplay, takeUntil } from 'rxjs/operators';
import { ChainDirective } from '../chain.directive';
@Pipe({
  name: 'open',
})
export class OpenPipe<T extends GunChain> implements PipeTransform {
  private asyncPipe = new AsyncPipe(this.ref);
  constructor(private ref: ChangeDetectorRef) {}

  transformChain(gunChain: T) {
    const open$ = gunChain.open();
    open$.subscribe((doc: any) => {
      this.asyncPipe.transform(of(doc));
    });
  }

  transform(gun$: T | Observable<T>, ...args: unknown[]) {
    if (gun$ instanceof GunChain) {
      return this.transformChain(gun$);
    }
    if (gun$ instanceof ChainDirective) {
      return this.transformChain(gun$.chain as T);
    }
    console.log('gun$', gun$);
    const open$ = gun$.pipe(
      switchMap((v) => {
        const vo$ = v.open();
        return vo$;
      })
    );
    open$.subscribe((v: any) => {
      // console.log('open', v);
      // this.asyncPipe.transform(of(v));
    });
    return open$;
    // return this.asyncPipe.transform(open$);
    // return of(args);
  }
}
