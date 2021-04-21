import { Component } from '@angular/core';
import * as i0 from "@angular/core";
export class LogComponent {
    constructor() { }
    ngOnInit() {
    }
}
LogComponent.ɵfac = function LogComponent_Factory(t) { return new (t || LogComponent)(); };
LogComponent.ɵcmp = i0.ɵɵdefineComponent({ type: LogComponent, selectors: [["lib-log"]], decls: 2, vars: 0, template: function LogComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "p");
        i0.ɵɵtext(1, " log works! ");
        i0.ɵɵelementEnd();
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LogComponent, [{
        type: Component,
        args: [{
                selector: 'lib-log',
                template: `
    <p>
      log works!
    </p>
  `,
                styles: []
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2xvZy9zcmMvbGliL2xvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQzs7QUFZbEQsTUFBTSxPQUFPLFlBQVk7SUFFdkIsZ0JBQWdCLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7O3dFQUxVLFlBQVk7aURBQVosWUFBWTtRQVByQix5QkFBRztRQUNELDRCQUNGO1FBQUEsaUJBQUk7O3VGQUtLLFlBQVk7Y0FWeEIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQixRQUFRLEVBQUU7Ozs7R0FJVDtnQkFDRCxNQUFNLEVBQUUsRUFDUDthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWxvZycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBsb2cgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxufVxuIl19