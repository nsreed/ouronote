import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { NgGunService } from './ng-gun.service';
import { map, take, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogService } from '../../../log/src/lib/log.service';

@Pipe({
  name: 'alias',
})
export class AliasPipe extends AsyncPipe implements PipeTransform {
  constructor(
    private ngGun: NgGunService,
    _ref: ChangeDetectorRef,
    private logger: LogService
  ) {
    super(_ref);
    logger.name = 'alias.pipe';
  }
  transform(value: any, ...args: any[]): any {
    if (value === '*') {
      return of(value);
    }
    if (typeof value !== 'string') {
      this.logger.error('alias pipe got non-string input: %o', value);
      return of('UNKNOWN USER');
    }
    return this.ngGun
      .get(`~${value.replace('~', '')}`)
      .on()
      .pipe(
        map((v: any) => {
          if (typeof v.alias === 'string') {
            return v.alias;
          } else {
            this.logger.warn(
              'could not find string alias. Found %o for %s',
              v.alias,
              value
            );
            return value;
          }
        }),
        shareReplay(1)
      );
  }
}
