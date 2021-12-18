import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NgGunService } from './ng-gun.service';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Pipe({
  name: 'owner',
})
export class OwnerPipe extends AsyncPipe implements PipeTransform {
  constructor(private ngGun: NgGunService, _ref: ChangeDetectorRef) {
    super(_ref);
  }

  transform(value: any, ...args: unknown[]): any {
    // value is a GunChain

    const ownerKVP$ = this.ngGun.get(value.owner['#']).on();
    const ownerAlias$ = ownerKVP$.pipe(
      switchMap((ok) => {
        const ownerKeys = Object.keys(ok).filter((k) => k !== '_');
        // TODO allow for multiple owners
        if (ownerKeys.length > 0) {
          const key = `~${ownerKeys[0]}`;
          return this.ngGun
            .get(key)
            .on()
            .pipe(map((v) => v.alias || value));
        } else {
          return of(null);
        }
      }),
      shareReplay(1)
    );
    return ownerAlias$;
  }
}
