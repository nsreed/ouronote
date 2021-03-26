import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { NgGunService } from './ng-gun.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'alias',
})
export class AliasPipe extends AsyncPipe implements PipeTransform {
  constructor(private ngGun: NgGunService, _ref: ChangeDetectorRef) {
    super(_ref);
  }
  transform(value: any, ...args: any[]): any {
    // FIXME this is not getting aliases of users other than the current user
    return super.transform(
      this.ngGun
        .get(`~${value.replace('~', '')}`)
        .once()
        .pipe(map((v: any) => v.alias))
    );
  }
}
