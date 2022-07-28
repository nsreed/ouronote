import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { GunChain } from '../classes/GunChain';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscribable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Pipe({
  name: 'on',
})
export class OnPipe<T extends GunChain> implements PipeTransform {
  private asyncPipe = new AsyncPipe(this.ref);
  constructor(private ref: ChangeDetectorRef) {}
  transform(value: Observable<T>, ...args: unknown[]) {
    return this.asyncPipe.transform(
      value.pipe(switchMap((v) => v.on({ clean: true })))
    );
    // return of(args);
  }
}
