import { NgModule } from '@angular/core';
import { AliasPipe } from './alias.pipe';
import { ChainDirective } from './chain.directive';
import { NgGunComponent } from './ng-gun.component';
import { SoulPipe } from './soul.pipe';
import { UpdatedPipe } from './updated.pipe';
import { VerifyPipe } from './verify.pipe';
import * as i0 from "@angular/core";
export class NgGunModule {
}
NgGunModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgGunModule });
NgGunModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgGunModule_Factory(t) { return new (t || NgGunModule)(); } });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgGunModule, { declarations: [NgGunComponent,
        SoulPipe,
        UpdatedPipe,
        ChainDirective,
        AliasPipe,
        VerifyPipe], exports: [NgGunComponent,
        SoulPipe,
        UpdatedPipe,
        ChainDirective,
        AliasPipe,
        VerifyPipe] }); })();
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
                ],
                exports: [
                    NgGunComponent,
                    SoulPipe,
                    UpdatedPipe,
                    ChainDirective,
                    AliasPipe,
                    VerifyPipe,
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VuLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWd1bi9zcmMvbGliL25nLWd1bi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFvQjNDLE1BQU0sT0FBTyxXQUFXOzsrQ0FBWCxXQUFXO3FHQUFYLFdBQVc7d0ZBQVgsV0FBVyxtQkFoQnBCLGNBQWM7UUFDZCxRQUFRO1FBQ1IsV0FBVztRQUNYLGNBQWM7UUFDZCxTQUFTO1FBQ1QsVUFBVSxhQUdWLGNBQWM7UUFDZCxRQUFRO1FBQ1IsV0FBVztRQUNYLGNBQWM7UUFDZCxTQUFTO1FBQ1QsVUFBVTt1RkFHRCxXQUFXO2NBbEJ2QixRQUFRO2VBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLGNBQWM7b0JBQ2QsUUFBUTtvQkFDUixXQUFXO29CQUNYLGNBQWM7b0JBQ2QsU0FBUztvQkFDVCxVQUFVO2lCQUNYO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxjQUFjO29CQUNkLFFBQVE7b0JBQ1IsV0FBVztvQkFDWCxjQUFjO29CQUNkLFNBQVM7b0JBQ1QsVUFBVTtpQkFDWDthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFsaWFzUGlwZSB9IGZyb20gJy4vYWxpYXMucGlwZSc7XG5pbXBvcnQgeyBDaGFpbkRpcmVjdGl2ZSB9IGZyb20gJy4vY2hhaW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IE5nR3VuQ29tcG9uZW50IH0gZnJvbSAnLi9uZy1ndW4uY29tcG9uZW50JztcbmltcG9ydCB7IFNvdWxQaXBlIH0gZnJvbSAnLi9zb3VsLnBpcGUnO1xuaW1wb3J0IHsgVXBkYXRlZFBpcGUgfSBmcm9tICcuL3VwZGF0ZWQucGlwZSc7XG5pbXBvcnQgeyBWZXJpZnlQaXBlIH0gZnJvbSAnLi92ZXJpZnkucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5nR3VuQ29tcG9uZW50LFxuICAgIFNvdWxQaXBlLFxuICAgIFVwZGF0ZWRQaXBlLFxuICAgIENoYWluRGlyZWN0aXZlLFxuICAgIEFsaWFzUGlwZSxcbiAgICBWZXJpZnlQaXBlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmdHdW5Db21wb25lbnQsXG4gICAgU291bFBpcGUsXG4gICAgVXBkYXRlZFBpcGUsXG4gICAgQ2hhaW5EaXJlY3RpdmUsXG4gICAgQWxpYXNQaXBlLFxuICAgIFZlcmlmeVBpcGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nR3VuTW9kdWxlIHt9XG4iXX0=