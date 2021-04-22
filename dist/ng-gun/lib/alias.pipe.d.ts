import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, PipeTransform } from '@angular/core';
import { NgGunService } from './ng-gun.service';
import * as i0 from "@angular/core";
export declare class AliasPipe extends AsyncPipe implements PipeTransform {
    private ngGun;
    constructor(ngGun: NgGunService, _ref: ChangeDetectorRef);
    transform(value: any, ...args: any[]): any;
    static ɵfac: i0.ɵɵFactoryDef<AliasPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AliasPipe, "alias">;
}
//# sourceMappingURL=alias.pipe.d.ts.map