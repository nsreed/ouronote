import { NgModule } from '@angular/core';
import { AliasPipe } from './alias.pipe';
import { ChainDirective } from './chain.directive';
import { NgGunComponent } from './ng-gun.component';
import { SoulPipe } from './soul.pipe';
import { UpdatedPipe } from './updated.pipe';
import { VerifyPipe } from './verify.pipe';
import { RouteChainDirective } from './route-chain.directive';
import * as i0 from "@angular/core";
export class NgGunModule {
}
NgGunModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgGunModule });
NgGunModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgGunModule_Factory(t) { return new (t || NgGunModule)(); }, providers: [{ provide: 'gun-route-data-key', useValue: 'chain' }] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgGunModule, { declarations: [NgGunComponent,
        SoulPipe,
        UpdatedPipe,
        ChainDirective,
        AliasPipe,
        VerifyPipe,
        RouteChainDirective], exports: [NgGunComponent,
        SoulPipe,
        UpdatedPipe,
        ChainDirective,
        AliasPipe,
        VerifyPipe,
        RouteChainDirective] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgGunModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    NgGunComponent,
                    SoulPipe,
                    UpdatedPipe,
                    ChainDirective,
                    AliasPipe,
                    VerifyPipe,
                    RouteChainDirective,
                ],
                exports: [
                    NgGunComponent,
                    SoulPipe,
                    UpdatedPipe,
                    ChainDirective,
                    AliasPipe,
                    VerifyPipe,
                    RouteChainDirective,
                ],
                providers: [{ provide: 'gun-route-data-key', useValue: 'chain' }],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VuLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWd1bi9zcmMvbGliL25nLWd1bi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUF1QjlELE1BQU0sT0FBTyxXQUFXOzsrQ0FBWCxXQUFXO3FHQUFYLFdBQVcsbUJBRlgsQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUM7d0ZBRXRELFdBQVcsbUJBbkJwQixjQUFjO1FBQ2QsUUFBUTtRQUNSLFdBQVc7UUFDWCxjQUFjO1FBQ2QsU0FBUztRQUNULFVBQVU7UUFDVixtQkFBbUIsYUFHbkIsY0FBYztRQUNkLFFBQVE7UUFDUixXQUFXO1FBQ1gsY0FBYztRQUNkLFNBQVM7UUFDVCxVQUFVO1FBQ1YsbUJBQW1CO3VGQUlWLFdBQVc7Y0FyQnZCLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osY0FBYztvQkFDZCxRQUFRO29CQUNSLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxTQUFTO29CQUNULFVBQVU7b0JBQ1YsbUJBQW1CO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsY0FBYztvQkFDZCxRQUFRO29CQUNSLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxTQUFTO29CQUNULFVBQVU7b0JBQ1YsbUJBQW1CO2lCQUNwQjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDbEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWxpYXNQaXBlIH0gZnJvbSAnLi9hbGlhcy5waXBlJztcbmltcG9ydCB7IENoYWluRGlyZWN0aXZlIH0gZnJvbSAnLi9jaGFpbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmdHdW5Db21wb25lbnQgfSBmcm9tICcuL25nLWd1bi5jb21wb25lbnQnO1xuaW1wb3J0IHsgU291bFBpcGUgfSBmcm9tICcuL3NvdWwucGlwZSc7XG5pbXBvcnQgeyBVcGRhdGVkUGlwZSB9IGZyb20gJy4vdXBkYXRlZC5waXBlJztcbmltcG9ydCB7IFZlcmlmeVBpcGUgfSBmcm9tICcuL3ZlcmlmeS5waXBlJztcbmltcG9ydCB7IFJvdXRlQ2hhaW5EaXJlY3RpdmUgfSBmcm9tICcuL3JvdXRlLWNoYWluLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5nR3VuQ29tcG9uZW50LFxuICAgIFNvdWxQaXBlLFxuICAgIFVwZGF0ZWRQaXBlLFxuICAgIENoYWluRGlyZWN0aXZlLFxuICAgIEFsaWFzUGlwZSxcbiAgICBWZXJpZnlQaXBlLFxuICAgIFJvdXRlQ2hhaW5EaXJlY3RpdmUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOZ0d1bkNvbXBvbmVudCxcbiAgICBTb3VsUGlwZSxcbiAgICBVcGRhdGVkUGlwZSxcbiAgICBDaGFpbkRpcmVjdGl2ZSxcbiAgICBBbGlhc1BpcGUsXG4gICAgVmVyaWZ5UGlwZSxcbiAgICBSb3V0ZUNoYWluRGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6ICdndW4tcm91dGUtZGF0YS1rZXknLCB1c2VWYWx1ZTogJ2NoYWluJyB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTmdHdW5Nb2R1bGUge31cbiJdfQ==