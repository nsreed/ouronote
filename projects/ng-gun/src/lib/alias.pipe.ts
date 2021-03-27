import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { NgGunService } from './ng-gun.service';
import { map, take, shareReplay } from 'rxjs/operators';

@Pipe({
  name: 'alias',
})
export class AliasPipe extends AsyncPipe implements PipeTransform {
  constructor(private ngGun: NgGunService, _ref: ChangeDetectorRef) {
    super(_ref);
  }
  transform(value: any, ...args: any[]): any {
    return this.ngGun
      .get(`~${value.replace('~', '')}`)
      .on()
      .pipe(
        map((v: any) => v.alias),
        shareReplay(1)
      );
  }
}
