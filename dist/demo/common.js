(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "ZwLl":
/*!*********************************************************!*\
  !*** ./projects/ng-gun/src/lib/gun-resolver.service.ts ***!
  \*********************************************************/
/*! exports provided: GunResolverService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunResolverService", function() { return GunResolverService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ng-gun.service */ "bluq");


class GunResolverService {
    constructor(ngGun) {
        this.ngGun = ngGun;
    }
    resolve(route, state) {
        const soul = route.params.soul;
        return this.ngGun.auth().root.get(soul).once();
    }
}
GunResolverService.ɵfac = function GunResolverService_Factory(t) { return new (t || GunResolverService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ng_gun_service__WEBPACK_IMPORTED_MODULE_1__["NgGunService"])); };
GunResolverService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GunResolverService, factory: GunResolverService.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=common.js.map