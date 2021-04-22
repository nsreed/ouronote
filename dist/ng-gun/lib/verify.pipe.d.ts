import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, PipeTransform } from '@angular/core';
import { NgSeaService } from './ng-sea.service';
import { ChainDirective } from './chain.directive';
import { NgGunService } from './ng-gun.service';
import * as i0 from "@angular/core";
export declare class VerifyPipe extends AsyncPipe implements PipeTransform {
    private ngGun;
    private sea;
    private ref;
    private chain;
    constructor(ngGun: NgGunService, sea: NgSeaService, ref: ChangeDetectorRef, chain: ChainDirective);
    transform(value: any, ...args: any[]): any;
    static ɵfac: i0.ɵɵFactoryDef<VerifyPipe, [null, null, null, { optional: true; }]>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<VerifyPipe, "verify">;
}
//# sourceMappingURL=verify.pipe.d.ts.map