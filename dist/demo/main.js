(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+9ow":
/*!*************************************************!*\
  !*** ./projects/demo/src/app/system.service.ts ***!
  \*************************************************/
/*! exports provided: CAPABILITIES, SystemService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAPABILITIES", function() { return CAPABILITIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemService", function() { return SystemService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

const POINTER = window.PointerEvent && navigator.maxTouchPoints > 0;
const TOUCH = window.TouchEvent &&
    window.ontouchstart !== undefined &&
    document.ontouchend !== undefined;
const CAPABILITIES = {
    POINTER,
    TOUCH,
};
class SystemService {
    constructor() { }
}
SystemService.ɵfac = function SystemService_Factory(t) { return new (t || SystemService)(); };
SystemService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SystemService, factory: SystemService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi ./projects/demo/src/main.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/nsreed/repos/libs/ng-gun/projects/demo/src/main.ts */"rzic");


/***/ }),

/***/ "1frH":
/*!*******************************************************************!*\
  !*** ./projects/demo/src/app/components/about/about.component.ts ***!
  \*******************************************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var _system_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../system.service */ "+9ow");
/* harmony import */ var _environments_version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/version */ "g9vf");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout/flex */ "XiUz");




class AboutComponent {
    constructor() {
        this.version = _environments_version__WEBPACK_IMPORTED_MODULE_1__["VERSION"];
        this.capabilities = _system_service__WEBPACK_IMPORTED_MODULE_0__["CAPABILITIES"];
    }
    ngOnInit() { }
}
AboutComponent.ɵfac = function AboutComponent_Factory(t) { return new (t || AboutComponent)(); };
AboutComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AboutComponent, selectors: [["app-about"]], decls: 9, vars: 1, consts: [["fxLayout", "column"], ["href", "https://www.github.com/nsreed/ouronote"], ["href", "https://www.github.com/nsreed/ouronote/issues"]], template: function AboutComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Ouronote");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "blockquote");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "github");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "issues");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("version ", ctx.version.version, "");
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_3__["DefaultLayoutDirective"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhYm91dC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "3u7+":
/*!********************************************************!*\
  !*** ./projects/demo/src/app/login/login.component.ts ***!
  \********************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ng-gun/src/lib/ng-gun.service */ "bluq");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");








class LoginComponent {
    constructor(fb, ngGun, router) {
        this.fb = fb;
        this.ngGun = ngGun;
        this.form = this.fb.group({
            alias: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required],
            password: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required],
        });
        ngGun.auth().auth$.subscribe((data) => {
            // console.log('auth data', data);
            router.navigateByUrl('/user');
        });
    }
    ngOnInit() {
        this.form.updateValueAndValidity();
    }
    create() {
        if (this.form.invalid) {
            return;
        }
        // console.log('create', this.form.value);
        this.ngGun
            .auth()
            .create(this.form.value.alias, this.form.value.password)
            .subscribe((data) => {
            // console.log('create result', data)
        });
    }
    login() {
        if (!this.form.valid) {
            return;
        }
        // console.log('login', this.form.value);
        this.ngGun
            .auth()
            .login(this.form.value.alias, this.form.value.password)
            .subscribe((data) => {
            // console.log('login result', data);
        });
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_2__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["ng-component"]], decls: 13, vars: 3, consts: [[3, "formGroup"], ["matInput", "", "formControlName", "alias"], ["type", "password", "matInput", "", "formControlName", "password"], ["mat-button", "", "color", "primary", 3, "disabled", "click"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "alias");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "password");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_9_listener() { return ctx.login(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Log In");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_11_listener() { return ctx.create(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Create");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.form.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.form.invalid);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatLabel"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "47RE":
/*!***************************************************************!*\
  !*** ./projects/demo/src/app/components/components.module.ts ***!
  \***************************************************************/
/*! exports provided: ComponentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentsModule", function() { return ComponentsModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/stepper */ "xHqg");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _ng_gun_src_lib_ng_gun_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../ng-gun/src/lib/ng-gun.module */ "xcn7");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _bug_report_bug_report_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./bug-report/bug-report.component */ "SnFU");
/* harmony import */ var _gun_peers_gun_peers_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./gun-peers/gun-peers.component */ "b0/7");
/* harmony import */ var _alias_autocomplete_alias_autocomplete_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./alias-autocomplete/alias-autocomplete.component */ "dtVT");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./about/about.component */ "1frH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ "fXoL");





















class ComponentsModule {
}
ComponentsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineNgModule"]({ type: ComponentsModule });
ComponentsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineInjector"]({ factory: function ComponentsModule_Factory(t) { return new (t || ComponentsModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_1__["FlexLayoutModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_13__["MatAutocompleteModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__["MatCheckboxModule"],
            _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__["MatDatepickerModule"],
            _angular_material_expansion__WEBPACK_IMPORTED_MODULE_18__["MatExpansionModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__["MatFormFieldModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_11__["MatListModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_11__["MatListModule"],
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_8__["MatRadioModule"],
            _angular_material_stepper__WEBPACK_IMPORTED_MODULE_10__["MatStepperModule"],
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__["MatTooltipModule"],
            _ng_gun_src_lib_ng_gun_module__WEBPACK_IMPORTED_MODULE_12__["NgGunModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵsetNgModuleScope"](ComponentsModule, { declarations: [_bug_report_bug_report_component__WEBPACK_IMPORTED_MODULE_14__["BugReportComponent"],
        _gun_peers_gun_peers_component__WEBPACK_IMPORTED_MODULE_15__["GunPeersComponent"],
        _alias_autocomplete_alias_autocomplete_component__WEBPACK_IMPORTED_MODULE_16__["AliasAutocompleteComponent"],
        _about_about_component__WEBPACK_IMPORTED_MODULE_19__["AboutComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_1__["FlexLayoutModule"],
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_13__["MatAutocompleteModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__["MatCheckboxModule"],
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_9__["MatDatepickerModule"],
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_18__["MatExpansionModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__["MatFormFieldModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_11__["MatListModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_11__["MatListModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_8__["MatRadioModule"],
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_10__["MatStepperModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__["MatTooltipModule"],
        _ng_gun_src_lib_ng_gun_module__WEBPACK_IMPORTED_MODULE_12__["NgGunModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"]], exports: [_bug_report_bug_report_component__WEBPACK_IMPORTED_MODULE_14__["BugReportComponent"], _gun_peers_gun_peers_component__WEBPACK_IMPORTED_MODULE_15__["GunPeersComponent"], _alias_autocomplete_alias_autocomplete_component__WEBPACK_IMPORTED_MODULE_16__["AliasAutocompleteComponent"]] }); })();


/***/ }),

/***/ "6AHW":
/*!******************************************************!*\
  !*** ./projects/ng-gun/src/lib/gun-map.directive.ts ***!
  \******************************************************/
/*! exports provided: GunMapContext, GunMapDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunMapContext", function() { return GunMapContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunMapDirective", function() { return GunMapDirective; });
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gun */ "fJS/");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class GunMapContext {
    constructor($implicit, chain) {
        this.$implicit = $implicit;
        this.chain = chain;
    }
}
class GunMapDirective {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.soulViews = new Map();
    }
    set gunMapOf(value) {
        value
            .map()
            .on()
            .subscribe((data) => {
            if (!this.soulViews.get(gun__WEBPACK_IMPORTED_MODULE_0__["node"].soul(data))) {
                const embed = this.viewContainer.createEmbeddedView(this.templateRef, new GunMapContext(data, value));
                this.soulViews.set(gun__WEBPACK_IMPORTED_MODULE_0__["node"].soul(data), embed);
            }
        });
    }
}
GunMapDirective.ɵfac = function GunMapDirective_Factory(t) { return new (t || GunMapDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"])); };
GunMapDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: GunMapDirective, selectors: [["", "gunMap", "", "gunMapOf", ""]], inputs: { gunMapOf: "gunMapOf" } });


/***/ }),

/***/ "7JE1":
/*!*******************************!*\
  !*** ./node_modules/gun sync ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "7JE1";

/***/ }),

/***/ "8VfK":
/*!*****************************************************************************************!*\
  !*** ./projects/demo/src/app/components/certificate-form/certificate-form.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: CertificateFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CertificateFormComponent", function() { return CertificateFormComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");









class CertificateFormComponent {
    constructor(fb) {
        this.fb = fb;
        this.form = this.fb.group({
            multi: false,
            people: this.fb.array([]),
            policies: this.fb.array([]),
            expires: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].min(new Date().getTime())],
        });
    }
    ngOnInit() { }
}
CertificateFormComponent.ɵfac = function CertificateFormComponent_Factory(t) { return new (t || CertificateFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"])); };
CertificateFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CertificateFormComponent, selectors: [["app-certificate-form"]], decls: 35, vars: 5, consts: [["mat-dialog-title", ""], ["mat-dialog-content", "", 3, "formGroup"], ["formControlName", "multi"], [3, "value"], ["matInput", ""], ["matInput", "", 3, "matDatepicker"], ["expire", ""], ["matSuffix", "", 3, "for"]], template: function CertificateFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Certificate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-radio-group", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-radio-button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Everyone");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-radio-button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Specific People:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Search");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Policies");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Path");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "mat-checkbox");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Require Public Key in path");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Expires");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](23, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "Select an expiration date");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](26, "mat-datepicker", null, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](28, "mat-datepicker-toggle", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Blacklist");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](32, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "Specify a blacklist path");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](27);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matDatepicker", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("for", _r0);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogTitle"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogContent"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_3__["MatRadioGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_3__["MatRadioButton"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInput"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatLabel"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__["MatCheckbox"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_7__["MatDatepickerInput"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_7__["MatDatepicker"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_7__["MatDatepickerToggle"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatSuffix"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjZXJ0aWZpY2F0ZS1mb3JtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "Ctu4":
/*!************************************************************!*\
  !*** ./projects/demo/src/app/welcome/welcome.component.ts ***!
  \************************************************************/
/*! exports provided: WelcomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeComponent", function() { return WelcomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



class WelcomeComponent {
    constructor() { }
    ngOnInit() {
    }
}
WelcomeComponent.ɵfac = function WelcomeComponent_Factory(t) { return new (t || WelcomeComponent)(); };
WelcomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WelcomeComponent, selectors: [["ng-component"]], decls: 2, vars: 0, consts: [["mat-button", "", "routerLink", "/login"]], template: function WelcomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Log In");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatAnchor"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ3ZWxjb21lLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "DlYp":
/*!****************************************************!*\
  !*** ./projects/demo/src/app/user/user.service.ts ***!
  \****************************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ng-gun/src/lib/ng-gun.service */ "bluq");




// import { User } from ;
class UserService {
    constructor(ngGun) {
        this.ngGun = ngGun;
        this.user = this.ngGun.auth();
        this.alias$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])([
            Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(this.user.alias),
            this.user.auth$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((a) => this.user.alias)),
        ]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["mergeAll"])());
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_3__["NgGunService"])); };
UserService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "FlTl":
/*!**********************************************!*\
  !*** ./projects/ng-gun/src/lib/soul.pipe.ts ***!
  \**********************************************/
/*! exports provided: SoulPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoulPipe", function() { return SoulPipe; });
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gun */ "fJS/");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class SoulPipe {
    transform(value, ...args) {
        return gun__WEBPACK_IMPORTED_MODULE_0__["node"].is(value) ? gun__WEBPACK_IMPORTED_MODULE_0__["node"].soul(value) : undefined;
    }
}
SoulPipe.ɵfac = function SoulPipe_Factory(t) { return new (t || SoulPipe)(); };
SoulPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "soul", type: SoulPipe, pure: true });


/***/ }),

/***/ "GT5q":
/*!********************************************************!*\
  !*** ./projects/ng-gun/src/lib/functions/gun-utils.ts ***!
  \********************************************************/
/*! exports provided: gunUpdateTime, gunChainArray, gunCertificateChain, gunPath, parseCertificate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gunUpdateTime", function() { return gunUpdateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gunChainArray", function() { return gunChainArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gunCertificateChain", function() { return gunCertificateChain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gunPath", function() { return gunPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseCertificate", function() { return parseCertificate; });
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gun */ "fJS/");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_0__);

const gunUpdateTime = (value) => {
    const updates = gun__WEBPACK_IMPORTED_MODULE_0__["node"].is(value) ? value._['>'] : null;
    if (!updates) {
        return 0;
    }
    return Object.values(updates).reduce((latest, time) => time > latest ? time : latest);
};
const gunChainArray = (value) => {
    let c = value;
    const path = [];
    do {
        if (c._.get) {
            path.push(c);
        }
        else {
            break;
        }
        c = c.back();
    } while (c.back() !== c);
    while (c.back) {
        const back = c.back();
        if (back !== c && c._.get) {
            const key = c._.get;
            path.push(key);
            c = c.back();
        }
        else {
            break;
        }
    }
    return path;
};
const gunCertificateChain = (value) => gunChainArray(value).map((c) => c.get('certs'));
/**
 * Returns an array of keys representing the path of the given chain
 * @param value the chain to pathify
 */
const gunPath = (value) => {
    let c = value;
    const path = [];
    while (c.back) {
        const back = c.back();
        if (back !== c && c._.get) {
            const key = c._.get;
            path.push(key);
            c = c.back();
        }
        else {
            break;
        }
    }
    return path;
};
function parseCertificate(cert) {
    const RE_SEA_CERT = /^SEA/;
    if (!RE_SEA_CERT.test(cert)) {
        throw new Error('could not parse certificate, incorrect prefix');
    }
    const scrubbed = cert.replace(RE_SEA_CERT, '');
    return JSON.parse(scrubbed);
}


/***/ }),

/***/ "H5HQ":
/*!*********************************************!*\
  !*** ./projects/demo/src/app/app.module.ts ***!
  \*********************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/scrolling */ "vxfF");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/badge */ "TU8p");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/chips */ "A5z7");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/grid-list */ "zkoq");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/stepper */ "xHqg");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _log_src_lib_log_module__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../log/src/lib/log.module */ "fZIX");
/* harmony import */ var _log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../log/src/lib/log.service */ "Naon");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./app-routing.module */ "Z/5Z");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./app.component */ "NO+I");
/* harmony import */ var _certificates_certificates_module__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./certificates/certificates.module */ "Rc43");
/* harmony import */ var _components_certificate_form_certificate_form_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/certificate-form/certificate-form.component */ "8VfK");
/* harmony import */ var _components_certificates_certificates_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components/certificates/certificates.component */ "zzai");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./components/components.module */ "47RE");
/* harmony import */ var _components_confirm_confirm_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./components/confirm/confirm.component */ "XXKo");
/* harmony import */ var _forms_ui_forms_ui_module__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./forms-ui/forms-ui.module */ "xRfH");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./login/login.component */ "3u7+");
/* harmony import */ var _session_info_session_info_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./session-info/session-info.component */ "na8u");
/* harmony import */ var _welcome_welcome_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./welcome/welcome.component */ "Ctu4");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/core */ "fXoL");










































class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_41__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_31__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_41__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        {
            provide: 'gun-options',
            useValue: {
                localStorage: false,
                peers: [
                    location.origin.match(/localhost/)
                        ? 'http://localhost:8765/gun'
                        : location.origin + '/gun',
                ],
            },
        },
        {
            provide: _log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_29__["LogService"],
            useClass: _log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_29__["LogService"],
        },
    ], imports: [[
            _app_routing_module__WEBPACK_IMPORTED_MODULE_30__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_27__["BrowserAnimationsModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__["BrowserModule"],
            _certificates_certificates_module__WEBPACK_IMPORTED_MODULE_32__["CertificatesModule"],
            _components_components_module__WEBPACK_IMPORTED_MODULE_35__["ComponentsModule"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_1__["FlexLayoutModule"],
            _forms_ui_forms_ui_module__WEBPACK_IMPORTED_MODULE_37__["FormsUiModule"],
            _log_src_lib_log_module__WEBPACK_IMPORTED_MODULE_28__["LogModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_3__["MatAutocompleteModule"],
            _angular_material_badge__WEBPACK_IMPORTED_MODULE_4__["MatBadgeModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_6__["MatButtonToggleModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__["MatCheckboxModule"],
            _angular_material_chips__WEBPACK_IMPORTED_MODULE_9__["MatChipsModule"],
            _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_11__["MatDatepickerModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__["MatDialogModule"],
            _angular_material_divider__WEBPACK_IMPORTED_MODULE_13__["MatDividerModule"],
            _angular_material_expansion__WEBPACK_IMPORTED_MODULE_14__["MatExpansionModule"],
            _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__["MatGridListModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__["MatIconModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_17__["MatInputModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_18__["MatListModule"],
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_19__["MatMenuModule"],
            _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MatNativeDateModule"],
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_20__["MatRadioModule"],
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_21__["MatSidenavModule"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_22__["MatSnackBarModule"],
            _angular_material_stepper__WEBPACK_IMPORTED_MODULE_23__["MatStepperModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_24__["MatToolbarModule"],
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_25__["MatTooltipModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_0__["ScrollingModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_41__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_31__["AppComponent"],
        _login_login_component__WEBPACK_IMPORTED_MODULE_38__["LoginComponent"],
        _session_info_session_info_component__WEBPACK_IMPORTED_MODULE_39__["SessionInfoComponent"],
        _components_confirm_confirm_component__WEBPACK_IMPORTED_MODULE_36__["ConfirmComponent"],
        _components_certificates_certificates_component__WEBPACK_IMPORTED_MODULE_34__["CertificatesComponent"],
        _components_certificate_form_certificate_form_component__WEBPACK_IMPORTED_MODULE_33__["CertificateFormComponent"],
        _welcome_welcome_component__WEBPACK_IMPORTED_MODULE_40__["WelcomeComponent"]], imports: [_app_routing_module__WEBPACK_IMPORTED_MODULE_30__["AppRoutingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_27__["BrowserAnimationsModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__["BrowserModule"],
        _certificates_certificates_module__WEBPACK_IMPORTED_MODULE_32__["CertificatesModule"],
        _components_components_module__WEBPACK_IMPORTED_MODULE_35__["ComponentsModule"],
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_1__["FlexLayoutModule"],
        _forms_ui_forms_ui_module__WEBPACK_IMPORTED_MODULE_37__["FormsUiModule"],
        _log_src_lib_log_module__WEBPACK_IMPORTED_MODULE_28__["LogModule"],
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_3__["MatAutocompleteModule"],
        _angular_material_badge__WEBPACK_IMPORTED_MODULE_4__["MatBadgeModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_6__["MatButtonToggleModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__["MatCheckboxModule"],
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_9__["MatChipsModule"],
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_11__["MatDatepickerModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__["MatDialogModule"],
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_13__["MatDividerModule"],
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_14__["MatExpansionModule"],
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__["MatGridListModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__["MatIconModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_17__["MatInputModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_18__["MatListModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_19__["MatMenuModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MatNativeDateModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_20__["MatRadioModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_21__["MatSidenavModule"],
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_22__["MatSnackBarModule"],
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_23__["MatStepperModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_24__["MatToolbarModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_25__["MatTooltipModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
        _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_0__["ScrollingModule"]], exports: [_components_certificates_certificates_component__WEBPACK_IMPORTED_MODULE_34__["CertificatesComponent"]] }); })();


/***/ }),

/***/ "MzpB":
/*!***********************************************************************************!*\
  !*** ./projects/demo/src/app/certificates/certificates/certificates.component.ts ***!
  \***********************************************************************************/
/*! exports provided: CertificatesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CertificatesComponent", function() { return CertificatesComponent; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_src_lib_chain_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/chain.directive */ "R39e");
/* harmony import */ var _user_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../user/user.service */ "DlYp");
/* harmony import */ var _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/ng-gun.service */ "bluq");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout/grid */ "zpSk");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _create_certificate_create_certificate_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../create-certificate/create-certificate.component */ "WYxy");
/* harmony import */ var _ng_gun_src_lib_alias_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/alias.pipe */ "foKA");
/* harmony import */ var _ng_gun_src_lib_verify_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/verify.pipe */ "VUWm");












function CertificatesComponent_ng_container_15_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-checkbox");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "code");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](6, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "alias");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "code");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](10, "json");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](12, "verify");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const certUser_r4 = ctx.$implicit;
    const certPath_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    let tmp_2_0 = null;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](certPath_r2.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](6, 3, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](7, 5, certUser_r4.key)));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](10, 7, (tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](11, 9, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](12, 11, certUser_r4.value))) == null ? null : tmp_2_0.w));
} }
function CertificatesComponent_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CertificatesComponent_ng_container_15_ng_container_1_Template, 13, 13, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const certPath_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, certPath_r2.value));
} }
function CertificatesComponent_app_create_certificate_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-create-certificate");
} }
class CertificatesComponent {
    constructor(chainDirective, userService, ngGun) {
        this.chainDirective = chainDirective;
        this.userService = userService;
        this.ngGun = ngGun;
        this.pub$ = this.chainDirective.chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((chain) => chain.recordPub.replace('~', '')));
        this.certs$ = this.chainDirective.chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["switchMap"])((chain) => chain.get('certs').open()));
        this.owners$ = this.chainDirective.chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["switchMap"])((chain) => chain.get('owner').open()));
        this.owner$ = this.chainDirective.chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["mergeMap"])((node) => node.get('owner').map({ includeKeys: true }).on({ includeKeys: true })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["filter"])((ownerTuple) => ownerTuple[0] &&
            ownerTuple[1] === this.userService.user.is.pub.replace('~', '')), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((ownerTuple) => ownerTuple[0]));
        this.certs$.subscribe((c) => { });
        this.owners$.subscribe();
        // this.ngGun
        //   .findAlias(userService.user.is.pub)
        //   .subscribe((v) => console.log('alias', v));
    }
    ngOnInit() { }
}
CertificatesComponent.ɵfac = function CertificatesComponent_Factory(t) { return new (t || CertificatesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_gun_src_lib_chain_directive__WEBPACK_IMPORTED_MODULE_2__["ChainDirective"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_user_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_4__["NgGunService"])); };
CertificatesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CertificatesComponent, selectors: [["app-certificates"]], decls: 20, vars: 11, consts: [["gdColumns", "max-content repeat(3, max-content)", "gdGap", "1em"], [4, "ngFor", "ngForOf"], [4, "ngIf"]], template: function CertificatesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "security");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " Certificates\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](6, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Path");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "User");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Permissions");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, CertificatesComponent_ng_container_15_Template, 3, 3, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](16, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](17, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, CertificatesComponent_app_create_certificate_18_Template, 1, 0, "app-create-certificate", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](19, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Showing certificates for ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](6, 3, ctx.pub$), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](16, 5, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](17, 7, ctx.certs$)));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](19, 9, ctx.owner$));
    } }, directives: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIcon"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_6__["ɵgrid_privatex"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_6__["ɵgrid_privateba"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__["MatCheckbox"], _create_certificate_create_certificate_component__WEBPACK_IMPORTED_MODULE_9__["CreateCertificateComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["KeyValuePipe"], _ng_gun_src_lib_alias_pipe__WEBPACK_IMPORTED_MODULE_10__["AliasPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["JsonPipe"], _ng_gun_src_lib_verify_pipe__WEBPACK_IMPORTED_MODULE_11__["VerifyPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjZXJ0aWZpY2F0ZXMuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "NO+I":
/*!************************************************!*\
  !*** ./projects/demo/src/app/app.component.ts ***!
  \************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _environments_version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../environments/version */ "g9vf");
/* harmony import */ var _components_gun_peers_gun_peers_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/gun-peers/gun-peers.component */ "b0/7");
/* harmony import */ var _components_about_about_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/about/about.component */ "1frH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../ng-gun/src/lib/ng-gun.service */ "bluq");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-clipboard */ "Dvla");
/* harmony import */ var _log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../log/src/lib/log.service */ "Naon");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _diagnostics_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./diagnostics.service */ "rP0p");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/flex-layout/flex */ "XiUz");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/badge */ "TU8p");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ "ofXK");





















class AppComponent {
    constructor(ngGun, router, route, cb, logger, dialog, diagnosticsService) {
        this.ngGun = ngGun;
        this.router = router;
        this.route = route;
        this.cb = cb;
        this.logger = logger;
        this.dialog = dialog;
        this.diagnosticsService = diagnosticsService;
        this.messages = [];
        // logger.out$.subscribe(console.log);
        logger.log('app started');
        this.user = this.ngGun.auth();
        window.document.title = `ouronote version ${_environments_version__WEBPACK_IMPORTED_MODULE_2__["VERSION"].version}`;
        let lastActivated;
        router.events
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])((e) => e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_0__["ChildActivationEnd"]))
            .subscribe((e) => (lastActivated = e));
        router.events
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])((e) => e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_0__["NavigationEnd"]))
            .subscribe((e) => {
            // console.log('last activated at navigation end', lastActivated);
            // this.logger.log(
            //   'last activated',
            //   // tslint:disable-next-line: only-arrow-functions
            //   JSON.stringify(lastActivated.snapshot, ['children', 'data'])
            // );
        });
    }
    logout() {
        this.ngGun.auth().logout();
        this.router.navigateByUrl('/login');
    }
    peers() {
        this.dialog.open(_components_gun_peers_gun_peers_component__WEBPACK_IMPORTED_MODULE_3__["GunPeersComponent"], {
            data: {
                ngGun: this.ngGun,
            },
            width: '80%',
            height: '80%',
        });
    }
    bugReport() {
        this.logger.log('generating bug report...');
        this.diagnosticsService.bugReport();
    }
    about() {
        this.dialog.open(_components_about_about_component__WEBPACK_IMPORTED_MODULE_4__["AboutComponent"]);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_6__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ngx_clipboard__WEBPACK_IMPORTED_MODULE_7__["ClipboardService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_8__["LogService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_diagnostics_service__WEBPACK_IMPORTED_MODULE_10__["DiagnosticsService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 32, vars: 7, consts: [["fxFlexFill", ""], [3, "mode", "opened"], ["nav", ""], ["routerLinkActive", "active", "routerLink", "/user/vectors", "matTooltip", "Vectors"], ["mat-list-icon", ""], ["routerLinkActive", "active", "routerLink", "/user/messages", "matTooltip", "Messages"], ["matTooltip", "Open bug report dialog", 3, "click"], ["matTooltip", "Open peer statistics", 3, "click"], ["mat-list-icon", "", "matBadgeColor", "warn", "matBadgeSize", "small", 3, "matBadge"], [3, "matMenuTriggerFor", "matTooltip"], ["mat-list-icon", "", "color", "primary"], ["sessionMenu", ""], ["mat-menu-item", "", 3, "click"], ["mat-menu-item", "", "routerLink", "/user/settings"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-sidenav-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-sidenav", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "mat-action-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "mat-list-item", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "note");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "mat-list-item", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "message");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "mat-list-item", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_mat_list_item_click_11_listener() { return ctx.bugReport(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, "bug_report");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "mat-list-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_mat_list_item_click_14_listener() { return ctx.peers(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "mat-icon", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](16, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, " signal_wifi_4_bar ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](18, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "mat-list-item", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "mat-icon", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, "account_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "mat-menu", null, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_button_click_24_listener() { return ctx.about(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](25, "About Ouronote");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](27, "Settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_Template_button_click_28_listener() { return ctx.logout(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](29, "Log Out");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "mat-sidenav-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](31, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](23);
        let tmp_2_0 = null;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("mode", "side")("opened", ctx.user.is);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matBadge", ((tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](16, 5, ctx.diagnosticsService.disconnectedPeers$)) == null ? null : tmp_2_0.length) || null);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matMenuTriggerFor", _r1)("matTooltip", "@" + ctx.ngGun.auth().alias);
    } }, directives: [_angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatSidenavContainer"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_12__["FlexFillDirective"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatSidenav"], _angular_material_list__WEBPACK_IMPORTED_MODULE_13__["MatList"], _angular_material_list__WEBPACK_IMPORTED_MODULE_13__["MatListItem"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterLinkActive"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterLink"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__["MatTooltip"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__["MatIcon"], _angular_material_list__WEBPACK_IMPORTED_MODULE_13__["MatListIconCssMatStyler"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_16__["MatDivider"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_17__["MatBadge"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_18__["MatMenuTrigger"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_18__["MatMenu"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_18__["MatMenuItem"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatSidenavContent"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterOutlet"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_19__["AsyncPipe"]], styles: ["mat-sidenav-content[_ngcontent-%COMP%] {\n  align-items: stretch;\n  flex-grow: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVFLG9CQUFBO0VBQ0EsWUFBQTtBQUFGIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1zaWRlbmF2LWNvbnRlbnQge1xuICAvLyBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgZmxleC1ncm93OiAxO1xufVxuIl19 */"] });


/***/ }),

/***/ "Naon":
/*!*********************************************!*\
  !*** ./projects/log/src/lib/log.service.ts ***!
  \*********************************************/
/*! exports provided: LogLevel, LogService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return LogLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogService", function() { return LogService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");



var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["VERBOSE"] = 0] = "VERBOSE";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel || (LogLevel = {}));
class LogService {
    constructor(name = 'app', parent) {
        this.name = name;
        this.parent = parent;
        this._out$ = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.out$ = this._out$;
        this.outSub = this.out$.subscribe((m) => {
            if (this.parent) {
                this.parent._out$.emit(m);
            }
            else {
                console.log(`%s %s ${m.message}`, m.name, new Date(m.timestamp).toISOString(), ...m.args);
            }
        });
        this.level = LogLevel.INFO;
        this.supplementals = new Map();
        this.name = this.name || 'app';
        if (this.name !== 'root' && !parent) {
            this.parent = LogService.root;
        }
    }
    static getLogger(name) {
        return new LogService(name, LogService.root);
    }
    verbose(message, ...args) {
        const packed = this.buildMessage(LogLevel.VERBOSE, message, args);
        this._out$.emit(packed);
    }
    log(message, ...args) {
        const packed = this.buildMessage(LogLevel.INFO, message, args);
        this._out$.emit(packed);
    }
    warn(message, ...args) {
        const packed = this.buildMessage(LogLevel.WARN, message, args);
        this._out$.emit(packed);
    }
    error(message, ...args) {
        const packed = this.buildMessage(LogLevel.ERROR, message, args);
        this._out$.emit(packed);
    }
    supplemental(name) {
        if (!this.supplementals.has(name)) {
            const supplementalLog = new LogService(name, this);
            // supplementalLog.out$.subscribe((msg) => {
            //   console.log('supplemental message', msg);
            //   this._out$.emit(msg);
            // });
            this.supplementals.set(name, supplementalLog);
        }
        return this.supplementals.get(name);
    }
    buildMessage(level, message, args) {
        return {
            level,
            message,
            args,
            timestamp: Date.now(),
            name: this.name,
        };
    }
}
LogService.root = new LogService('root');
LogService.buffer$ = LogService.root.out$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["scan"])((acc, val) => {
    acc.push(val);
    if (acc.length > 1000) {
        acc.shift();
    }
    return acc;
}, []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])(1));
LogService.ɵfac = function LogService_Factory(t) { return new (t || LogService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"]('log-name', 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](LogService, 12)); };
LogService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LogService, factory: LogService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "R39e":
/*!****************************************************!*\
  !*** ./projects/ng-gun/src/lib/chain.directive.ts ***!
  \****************************************************/
/*! exports provided: ChainDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainDirective", function() { return ChainDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _ng_gun_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ng-gun.service */ "bluq");




class ChainDirective {
    constructor(ngGun) {
        this.ngGun = ngGun;
        this._chain$ = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chain$ = this._chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])(1));
    }
    get chain() {
        return this._chain;
    }
    set chain(value) {
        if (value !== this._chain) {
            this._chain = value;
            this._chain$.emit(value);
        }
    }
}
ChainDirective.ɵfac = function ChainDirective_Factory(t) { return new (t || ChainDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_gun_service__WEBPACK_IMPORTED_MODULE_2__["NgGunService"])); };
ChainDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: ChainDirective, selectors: [["", "gunChain", ""]], inputs: { chain: ["gunChain", "chain"] }, exportAs: ["gunChain"] });


/***/ }),

/***/ "Rc43":
/*!*******************************************************************!*\
  !*** ./projects/demo/src/app/certificates/certificates.module.ts ***!
  \*******************************************************************/
/*! exports provided: CertificatesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CertificatesModule", function() { return CertificatesModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _certificates_certificates_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./certificates/certificates.component */ "MzpB");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/stepper */ "xHqg");
/* harmony import */ var _create_certificate_create_certificate_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./create-certificate/create-certificate.component */ "WYxy");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _ng_gun_src_lib_ng_gun_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../ng-gun/src/lib/ng-gun.module */ "xcn7");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ "fXoL");

















class CertificatesModule {
}
CertificatesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineNgModule"]({ type: CertificatesModule });
CertificatesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineInjector"]({ factory: function CertificatesModule_Factory(t) { return new (t || CertificatesModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_15__["MatAutocompleteModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__["MatTooltipModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__["MatCheckboxModule"],
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_9__["MatRadioModule"],
            _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__["MatDatepickerModule"],
            _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__["MatStepperModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_13__["MatListModule"],
            _ng_gun_src_lib_ng_gun_module__WEBPACK_IMPORTED_MODULE_14__["NgGunModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵsetNgModuleScope"](CertificatesModule, { declarations: [_certificates_certificates_component__WEBPACK_IMPORTED_MODULE_1__["CertificatesComponent"], _create_certificate_create_certificate_component__WEBPACK_IMPORTED_MODULE_12__["CreateCertificateComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_15__["MatAutocompleteModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__["MatTooltipModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_8__["MatCheckboxModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_9__["MatRadioModule"],
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__["MatDatepickerModule"],
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__["MatStepperModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_13__["MatListModule"],
        _ng_gun_src_lib_ng_gun_module__WEBPACK_IMPORTED_MODULE_14__["NgGunModule"]], exports: [_certificates_certificates_component__WEBPACK_IMPORTED_MODULE_1__["CertificatesComponent"]] }); })();


/***/ }),

/***/ "SnFU":
/*!*****************************************************************************!*\
  !*** ./projects/demo/src/app/components/bug-report/bug-report.component.ts ***!
  \*****************************************************************************/
/*! exports provided: BugReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BugReportComponent", function() { return BugReportComponent; });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _jsdevtools_host_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsdevtools/host-environment */ "e2/j");
/* harmony import */ var projects_demo_src_environments_version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! projects/demo/src/environments/version */ "g9vf");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! file-saver */ "Iab2");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var projects_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! projects/ng-gun/src/lib/ng-gun.service */ "bluq");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-clipboard */ "Dvla");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/flex-layout/flex */ "XiUz");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");



















class BugReportComponent {
    constructor(ngGun, router, cb, dialogRef, data, toaster, fb) {
        this.ngGun = ngGun;
        this.router = router;
        this.cb = cb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.toaster = toaster;
        this.fb = fb;
        this.report = null;
        this.reportStr = '';
        this.descriptionCtl = this.fb.control(null);
        this.generate();
        this.descriptionCtl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(200)).subscribe(() => {
            // if (this.descriptionCtl.value?.length > 0) {
            this.report = Object.assign(Object.assign({}, this.report), { description: this.descriptionCtl.value });
            // }
            this.updatePreview();
        });
    }
    ngOnInit() { }
    generate() {
        var _a;
        // LogService.buffer$.pipe(take(1)).subscribe((messages) => {
        //   console.table(messages);
        const graph = this.data.gun._.graph;
        const gunConstructorOptions = this.ngGun.gunOptions;
        const report = {
            host: window.location.host,
            route: this.router.url,
            is: (_a = this.ngGun.auth().is) === null || _a === void 0 ? void 0 : _a.pub,
            gunConstructorOptions,
            peers: this.data.peers,
            graph,
            timestamp: Date.now(),
            version: projects_demo_src_environments_version__WEBPACK_IMPORTED_MODULE_2__["VERSION"],
            system: _jsdevtools_host_environment__WEBPACK_IMPORTED_MODULE_1__["default"].browser,
        };
        this.report = report;
        // });
        this.updatePreview();
    }
    updatePreview() {
        // FIXME crashing with circular references in messages
        this.reportStr = JSON.stringify(this.report, null, 2);
    }
    copy() {
        this.cb.copy(this.reportStr);
        this.toaster.open('copied to clipboard!');
    }
    download() {
        const reportStr = JSON.stringify(this.report, null, 2);
        const graphBlob = new Blob([reportStr], {
            type: 'text/plain;charset=utf-8',
        });
        Object(file_saver__WEBPACK_IMPORTED_MODULE_4__["saveAs"])(graphBlob, `ouronote-bugreport-${Date.now()}.json`);
    }
}
BugReportComponent.ɵfac = function BugReportComponent_Factory(t) { return new (t || BugReportComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](projects_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_6__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ngx_clipboard__WEBPACK_IMPORTED_MODULE_8__["ClipboardService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MAT_DIALOG_DATA"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__["MatSnackBar"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormBuilder"])); };
BugReportComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: BugReportComponent, selectors: [["app-bug-report"]], decls: 23, vars: 4, consts: [["matDialogTitle", ""], ["matDialogContent", ""], [3, "multi"], [3, "expanded"], ["fxFlexFill", ""], ["matInput", "", "placeholder", "Please provide a description of the problem and what you were doing/what you expected when you encountered it.", 3, "formControl"], ["matDialogActions", ""], ["mat-icon-button", "", "matTooltip", "Copy to clipboard", 3, "click"], ["mat-icon-button", "", "matTooltip", "Download .json", 3, "click"], ["mat-button", "", "target", "_blank", "href", "https://www.github.com/nsreed/ouronote/issues"]], template: function BugReportComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Bug Report");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "mat-accordion", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "mat-expansion-panel", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Description");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "mat-form-field", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "textarea", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "Preview");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function BugReportComponent_Template_button_click_15_listener() { return ctx.copy(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, "content_copy");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function BugReportComponent_Template_button_click_18_listener() { return ctx.download(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](20, "file_download");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](22, "Create a github issue");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("multi", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("expanded", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formControl", ctx.descriptionCtl);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.reportStr);
    } }, directives: [_angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatAccordion"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatExpansionPanelHeader"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__["MatFormField"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_13__["FlexFillDirective"], _angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormControlDirective"], _angular_material_button__WEBPACK_IMPORTED_MODULE_15__["MatButton"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__["MatTooltip"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__["MatIcon"], _angular_material_button__WEBPACK_IMPORTED_MODULE_15__["MatAnchor"]], styles: ["[_nghost-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n[_nghost-%COMP%]   [matDialogContent][_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  flex: 1 1 auto;\n  flex-direction: column;\n  overflow: auto;\n  overflow-y: scroll;\n}\n[_nghost-%COMP%]   [matDialogContent][_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n          user-select: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2J1Zy1yZXBvcnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7QUFDRjtBQUFFO0VBSUUsYUFBQTtFQUNBLG9CQUFBO0VBQ0EsY0FBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FBREo7QUFQSTtFQUNFLHlCQUFBO1VBQUEsaUJBQUE7QUFTTiIsImZpbGUiOiJidWctcmVwb3J0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIFttYXREaWFsb2dDb250ZW50XSB7XG4gICAgaDIge1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gICAgZmxleDogMSAxIGF1dG87XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIH1cbn1cbiJdfQ== */"] });


/***/ }),

/***/ "VUWm":
/*!************************************************!*\
  !*** ./projects/ng-gun/src/lib/verify.pipe.ts ***!
  \************************************************/
/*! exports provided: VerifyPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifyPipe", function() { return VerifyPipe; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gun */ "fJS/");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ng-gun.service */ "bluq");
/* harmony import */ var _ng_sea_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ng-sea.service */ "mWLu");
/* harmony import */ var _chain_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chain.directive */ "R39e");








class VerifyPipe extends _angular_common__WEBPACK_IMPORTED_MODULE_0__["AsyncPipe"] {
    constructor(ngGun, sea, ref, chain) {
        super(ref);
        this.ngGun = ngGun;
        this.sea = sea;
        this.ref = ref;
        this.chain = chain;
    }
    transform(value, ...args) {
        var _a;
        if (!this.chain.chain) {
            return null;
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(gun__WEBPACK_IMPORTED_MODULE_2__["SEA"].verify(value, (_a = this.chain.chain) === null || _a === void 0 ? void 0 : _a.recordPub.replace('~', ''))).pipe(
        // tap((v) => console.log('verified', v)),
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((v) => this.ref.detectChanges()));
        // ) as any;
    }
}
VerifyPipe.ɵfac = function VerifyPipe_Factory(t) { return new (t || VerifyPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ng_gun_service__WEBPACK_IMPORTED_MODULE_5__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ng_sea_service__WEBPACK_IMPORTED_MODULE_6__["NgSeaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinjectPipeChangeDetectorRef"](), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_chain_directive__WEBPACK_IMPORTED_MODULE_7__["ChainDirective"], 8)); };
VerifyPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefinePipe"]({ name: "verify", type: VerifyPipe, pure: true });


/***/ }),

/***/ "WAbZ":
/*!************************************************!*\
  !*** ./projects/ng-gun/src/lib/dam.service.ts ***!
  \************************************************/
/*! exports provided: DamService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DamService", function() { return DamService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ng-gun.service */ "bluq");


class DamService {
    constructor(ngGun) {
        this.ngGun = ngGun;
        this.mesh = this.ngGun.gun.back('opt.mesh');
    }
    disconnect(id) {
        this.mesh.bye(id);
    }
    connect(endpoint) {
        this.mesh.say({ dam: 'opt', opt: { peers: endpoint } });
    }
}
DamService.ɵfac = function DamService_Factory(t) { return new (t || DamService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ng_gun_service__WEBPACK_IMPORTED_MODULE_1__["NgGunService"])); };
DamService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: DamService, factory: DamService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "WYxy":
/*!***********************************************************************************************!*\
  !*** ./projects/demo/src/app/certificates/create-certificate/create-certificate.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: CreateCertificateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateCertificateComponent", function() { return CreateCertificateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/ng-gun.service */ "bluq");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gun */ "fJS/");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_src_lib_ng_sea_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/ng-sea.service */ "mWLu");
/* harmony import */ var _ng_gun_src_lib_chain_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/chain.directive */ "R39e");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/stepper */ "xHqg");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _ng_gun_src_lib_alias_pipe__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/alias.pipe */ "foKA");
























function CreateCertificateComponent_mat_list_item_3_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "code");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CreateCertificateComponent_mat_list_item_3_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r6); const path_r4 = ctx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r5.removePath(path_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "remove");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const path_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](path_r4);
} }
function CreateCertificateComponent_ng_container_19_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "alias");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CreateCertificateComponent_ng_container_19_mat_list_item_2_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r12); const pub_r10 = ctx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r11.removeUser(pub_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "remove");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const pub_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 3, pub_r10)), " ");
} }
function CreateCertificateComponent_ng_container_19_mat_option_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const result_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", result_r13.pub);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"](" Add ", result_r13.alias, " (", result_r13.pub, ") ");
} }
function CreateCertificateComponent_ng_container_19_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, CreateCertificateComponent_ng_container_19_mat_list_item_2_Template, 7, 5, "mat-list-item", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "User");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "mat-autocomplete", 23, 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("optionSelected", function CreateCertificateComponent_ng_container_19_Template_mat_autocomplete_optionSelected_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r14.onSelectUser($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, CreateCertificateComponent_ng_container_19_mat_option_10_Template, 2, 3, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CreateCertificateComponent_ng_container_19_Template_button_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r15); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r16.addUser(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, "add");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](9);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r2.form.controls.people.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formControl", ctx_r2.userCtl)("matAutocomplete", _r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r2.userResults);
} }
class CreateCertificateComponent {
    constructor(fb, ngGun, sea, chain, ngZone, gunOpts) {
        this.fb = fb;
        this.ngGun = ngGun;
        this.sea = sea;
        this.chain = chain;
        this.ngZone = ngZone;
        this.gunOpts = gunOpts;
        this.form = this.fb.group({
            paths: this.fb.array(['layers']),
            public: true,
            people: this.fb.array([]),
            protected: false,
            options: this.fb.group({
                blacklist: ['blacklist', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                expires: null,
            }),
        });
        this.userCtl = this.fb.control(null);
        this.userResults = [];
        this.pathCtl = this.fb.control(null);
        console.log(this.form.value);
        this.form.statusChanges.subscribe((sc) => console.log('status', sc));
        this.userCtl.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])((alias) => alias !== null))
            .subscribe((alias) => {
            if (alias.startsWith('~')) {
                return;
            }
            console.log('searching', alias);
            this.ngGun.findAlias(alias).subscribe((found) => {
                console.log('found', found);
                if (found === undefined || found === null) {
                    this.userResults = [];
                    return;
                }
                // FIXME aliases are not guaranteed to be unique, and this may give a false match to the user
                // FIXME warn the user that they should verify that the public key matches the expected public key for whomever they're inviting
                const foundPub = Object.keys(found).find((k) => k !== '_');
                this.userResults = [
                    {
                        alias,
                        pub: foundPub,
                    },
                ];
            });
        });
    }
    ngOnInit() { }
    addPath(path) {
        const n = this.form.controls.paths.value;
        n.push(path);
        this.pathCtl.patchValue(null);
    }
    removePath(path) {
        const p = this.form.controls.paths.value;
        const idx = p.indexOf(path);
        if (idx >= 0) {
            p.splice(idx, 1);
        }
    }
    onSelectUser(event) {
        const selectedValue = event.option.value;
        console.log('selected', selectedValue);
        this.userCtl.reset();
        this.form.controls.people.value.push(selectedValue.replace('~', ''));
    }
    addUser() { }
    removeUser(user) {
        const p = this.form.controls.people.value;
        const idx = p.indexOf(user);
        if (idx >= 0) {
            p.splice(idx, 1);
        }
    }
    create() {
        console.log('creating certificate store');
        const value = this.form.value;
        const certificants = value.public ? ['*'] : value.people;
        const isProtected = value.protected;
        const blacklist = value.options.blacklist;
        const expires = value.options.expires;
        const opts = {
            blacklist,
            expires,
        };
        const r = this.chain.chain;
        if (!r) {
            return;
        }
        // FIXME if we aren't the owner, fail gracefully
        r.get('owner')
            .get(this.ngGun.auth().is.pub)
            .once()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mergeMap"])((encPair) => Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(gun__WEBPACK_IMPORTED_MODULE_5__["SEA"].decrypt(encPair, this.ngGun.auth().is))))
            .subscribe((recordPair) => {
            console.log('owns', recordPair.pub);
            Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(
            // FIXME options not accounted for
            // TODO improve this process
            this.sea.getCertStore(certificants, value.paths, recordPair, isProtected, opts)).subscribe((certStores) => {
                const detachedGun = new _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_2__["NgGunService"](this.gunOpts, this.ngZone);
                detachedGun.gun.user().auth(recordPair, () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const v = detachedGun.gun.user();
                    const certs = v.get('certs');
                    certStores.forEach((store) => {
                        console.log('create store', store);
                        Object.keys(store).forEach((k) => {
                            const certPath = certs.get(k);
                            const certNew = store[k];
                            Object.keys(certNew).forEach((pub) => {
                                console.log('insert cert at', k, pub, certNew[pub]);
                                certPath.get(pub).put(certNew[pub]);
                            });
                            // console.log('create store key', k);
                            // certs.get(k).put(store[k] as never);
                        });
                        // certs.put(store as never);
                    });
                    // v.put(vector);
                    // this.vectorService.vectors.set(v as never);
                }));
            });
        });
    }
}
CreateCertificateComponent.ɵfac = function CreateCertificateComponent_Factory(t) { return new (t || CreateCertificateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_2__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ng_gun_src_lib_ng_sea_service__WEBPACK_IMPORTED_MODULE_7__["NgSeaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ng_gun_src_lib_chain_directive__WEBPACK_IMPORTED_MODULE_8__["ChainDirective"]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"]('gun-options')); };
CreateCertificateComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: CreateCertificateComponent, selectors: [["app-create-certificate"]], decls: 51, vars: 16, consts: [[3, "label", "stepControl"], [4, "ngFor", "ngForOf"], ["matInput", "", 3, "formControl"], ["pathName", ""], ["mat-icon-button", "", "matTooltip", "Add a path", 3, "click"], ["label", "People", 3, "stepControl", "formGroup"], [3, "formControl"], ["matTooltip", "Apply this certificate to everyone", 3, "value"], ["matTooltip", "Apply this certificate to specific people", 3, "value"], [4, "ngIf"], ["label", "Permissions"], ["matTooltip", "Users have full control over this path", 3, "value"], ["matTooltip", "Users may add/remove records containing their public key", 3, "value"], ["label", "Options", 3, "formGroup"], ["matInput", "", "formControlName", "expires", 3, "matDatepicker"], ["expire", ""], ["matSuffix", "", 3, "for"], ["matInput", "", "formControlName", "blacklist"], ["label", "Confirm"], [1, "mat-error"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["matInput", "", 3, "formControl", "matAutocomplete"], [3, "optionSelected"], ["userAutocomplete", ""], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]], template: function CreateCertificateComponent_Template(rf, ctx) { if (rf & 1) {
        const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-vertical-stepper");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-step", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, CreateCertificateComponent_mat_list_item_3_Template, 6, 1, "mat-list-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "input", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Path");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CreateCertificateComponent_Template_button_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r17); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](7); return ctx.addPath(_r1.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12, "add");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "mat-step", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "mat-radio-group", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "mat-radio-button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16, "Everyone");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "mat-radio-button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18, " Specific People ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](19, CreateCertificateComponent_ng_container_19_Template, 14, 4, "ng-container", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "mat-step", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "mat-radio-group", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "mat-radio-button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23, "Full");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "mat-radio-button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](25, "Protected ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "mat-step", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](27, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](28, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](30, "Certificate expires");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](31, "mat-datepicker", null, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](33, "mat-datepicker-toggle", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](34, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](35, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](36, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](37, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](38, "Blacklist path");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](39, "mat-step", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](40, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](41, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](42, "WARNING: Verify all choices before creating the certificate.");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](43, " While certificates may be ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](44, "i");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](45, "removed");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](46, " after creation, any user who has obtained a copy of the certificate may still use it to modify data.");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](47, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](48, " If this is a PUBLIC certificate this can be dangerous! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](49, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CreateCertificateComponent_Template_button_click_49_listener() { return ctx.create(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](50, "Create Certificate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](32);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("label", "Paths - " + ctx.form.controls.paths.value.join(", "))("stepControl", ctx.form.controls.paths);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.form.controls.paths.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formControl", ctx.pathCtl);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("stepControl", ctx.form)("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formControl", ctx.form.controls.public);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.form.controls.public.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formControl", ctx.form.controls.protected);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx.form.controls.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("matDatepicker", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("for", _r3);
    } }, directives: [_angular_material_stepper__WEBPACK_IMPORTED_MODULE_9__["MatVerticalStepper"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_9__["MatStep"], _angular_material_list__WEBPACK_IMPORTED_MODULE_10__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgForOf"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__["MatLabel"], _angular_material_button__WEBPACK_IMPORTED_MODULE_14__["MatButton"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__["MatTooltip"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__["MatIcon"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__["MatRadioGroup"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__["MatRadioButton"], _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__["MatDatepickerInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__["MatDatepicker"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__["MatDatepickerToggle"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__["MatSuffix"], _angular_material_list__WEBPACK_IMPORTED_MODULE_10__["MatListItem"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_19__["MatAutocompleteTrigger"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_19__["MatAutocomplete"], _angular_material_core__WEBPACK_IMPORTED_MODULE_20__["MatOption"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_11__["AsyncPipe"], _ng_gun_src_lib_alias_pipe__WEBPACK_IMPORTED_MODULE_21__["AliasPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjcmVhdGUtY2VydGlmaWNhdGUuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "XXKo":
/*!***********************************************************************!*\
  !*** ./projects/demo/src/app/components/confirm/confirm.component.ts ***!
  \***********************************************************************/
/*! exports provided: ConfirmComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmComponent", function() { return ConfirmComponent; });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");




class ConfirmComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() { }
    select(value) {
        this.dialogRef.close(value);
    }
}
ConfirmComponent.ɵfac = function ConfirmComponent_Factory(t) { return new (t || ConfirmComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MAT_DIALOG_DATA"])); };
ConfirmComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ConfirmComponent, selectors: [["app-confirm"]], decls: 9, vars: 0, consts: [["mat-dialog-title", ""], ["mat-dialog-content", ""], ["mat-dialog-actions", ""], ["mat-button", "", 3, "click"]], template: function ConfirmComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Confirm");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " Are you sure you want to?\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConfirmComponent_Template_button_click_5_listener() { return ctx.select(false); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "No");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConfirmComponent_Template_button_click_7_listener() { return ctx.select(true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Yes");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogContent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButton"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb25maXJtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "Z/5Z":
/*!*****************************************************!*\
  !*** ./projects/demo/src/app/app-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ng_gun_src_lib_gun_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../ng-gun/src/lib/gun-auth.guard */ "clOu");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "3u7+");
/* harmony import */ var _welcome_welcome_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./welcome/welcome.component */ "Ctu4");
/* harmony import */ var _components_about_about_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/about/about.component */ "1frH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    {
        path: 'user',
        loadChildren: () => __webpack_require__.e(/*! import() | user-user-module */ "user-user-module").then(__webpack_require__.bind(null, /*! ./user/user.module */ "i51W")).then((m) => m.UserModule),
        canActivateChild: [_ng_gun_src_lib_gun_auth_guard__WEBPACK_IMPORTED_MODULE_1__["GunAuthGuard"]],
    },
    {
        path: 'posts',
        loadChildren: () => __webpack_require__.e(/*! import() | user-posts-posts-module */ "posts-posts-module").then(__webpack_require__.bind(null, /*! ./user/posts/posts.module */ "pLqI")).then((m) => m.PostsModule),
    },
    {
        path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"],
    },
    {
        path: 'about',
        component: _components_about_about_component__WEBPACK_IMPORTED_MODULE_4__["AboutComponent"],
    },
    {
        path: '',
        component: _welcome_welcome_component__WEBPACK_IMPORTED_MODULE_3__["WelcomeComponent"],
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "b0/7":
/*!***************************************************************************!*\
  !*** ./projects/demo/src/app/components/gun-peers/gun-peers.component.ts ***!
  \***************************************************************************/
/*! exports provided: GunPeersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunPeersComponent", function() { return GunPeersComponent; });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/ng-gun.service */ "bluq");
/* harmony import */ var _ng_gun_src_lib_dam_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/dam.service */ "WAbZ");
/* harmony import */ var _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout/grid */ "zpSk");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");








function GunPeersComponent_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function GunPeersComponent_ng_container_15_Template_button_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const peer_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r2.disconnect(peer_r1.key); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "disconnect");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const peer_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](peer_r1.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](peer_r1.value.wire == null ? null : peer_r1.value.wire.readyState);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](peer_r1.value.last);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](peer_r1.value.queue == null ? null : peer_r1.value.queue.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](peer_r1.value.tail);
} }
class GunPeersComponent {
    constructor(ngGun, dialogRef, data, damService) {
        this.ngGun = ngGun;
        this.dialogRef = dialogRef;
        this.data = data;
        this.damService = damService;
        this.peers = this.data.ngGun.peers;
    }
    logGun() {
        console.log(this.data.ngGun);
    }
    disconnect(id) {
        this.damService.disconnect(id);
    }
}
GunPeersComponent.ɵfac = function GunPeersComponent_Factory(t) { return new (t || GunPeersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_2__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MAT_DIALOG_DATA"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_gun_src_lib_dam_service__WEBPACK_IMPORTED_MODULE_3__["DamService"])); };
GunPeersComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: GunPeersComponent, selectors: [["app-gun-peers"]], decls: 19, vars: 3, consts: [["gdColumns", "max-content max-content auto repeat(3, max-content)", "gdGap", "1em", "gdAlignRows", "stretch"], [4, "ngFor", "ngForOf"], ["mat-button", "", 3, "click"], [3, "click"]], template: function GunPeersComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Peers");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "id");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "state");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "last");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "queue");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "tail");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "disconnect");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, GunPeersComponent_ng_container_15_Template, 13, 5, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](16, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function GunPeersComponent_Template_button_click_17_listener() { return ctx.logGun(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "console.log gun");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](16, 1, ctx.peers));
    } }, directives: [_angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_4__["ɵgrid_privatex"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_4__["ɵgrid_privateba"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_4__["ɵgrid_privatei"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["KeyValuePipe"]], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2d1bi1wZWVycy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7QUFDRiIsImZpbGUiOiJndW4tcGVlcnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogMTAwJTtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ "bluq":
/*!***************************************************!*\
  !*** ./projects/ng-gun/src/lib/ng-gun.service.ts ***!
  \***************************************************/
/*! exports provided: GunOptions, NgGunService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunOptions", function() { return GunOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgGunService", function() { return NgGunService; });
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gun */ "fJS/");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_GunChain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/GunChain */ "tg88");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



const GunOptions = 'gun-options';
class NgGunService extends _classes_GunChain__WEBPACK_IMPORTED_MODULE_1__["GunChain"] {
    constructor(gunOptions, ngZone) {
        super(ngZone, new gun__WEBPACK_IMPORTED_MODULE_0__(JSON.parse(JSON.stringify(gunOptions))), null);
        this.gunOptions = gunOptions;
    }
    get peers() {
        return this.gun._.root.opt.peers;
    }
    findAlias(alias) {
        return this.get(`~@${alias}`).once();
    }
}
NgGunService.ɵfac = function NgGunService_Factory(t) { return new (t || NgGunService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](GunOptions), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"])); };
NgGunService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: NgGunService, factory: NgGunService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "clOu":
/*!***************************************************!*\
  !*** ./projects/ng-gun/src/lib/gun-auth.guard.ts ***!
  \***************************************************/
/*! exports provided: GunAuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunAuthGuard", function() { return GunAuthGuard; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ng-gun.service */ "bluq");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../log/src/lib/log.service */ "Naon");






class GunAuthGuard {
    constructor(ngGun, router, logger) {
        this.ngGun = ngGun;
        this.router = router;
        this.logger = logger;
    }
    sessionOrRedirect() { }
    canActivateChild(childRoute, state) {
        // console.log('gunAuthGuard checking...');
        if (this.ngGun.auth().is) {
            // console.log('OK: auth().is');
            // this.logger.log('gun-auth guard OK');
            return true;
        }
        // this.ngGun.auth().recall();
        return this.ngGun.auth().auth$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["timeout"])(5000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])((err, caught) => {
            this.router.navigateByUrl('/login');
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])({
                err: 'Session Recall Timeout',
            });
        }), 
        // tap((ack) => console.log('gunAuthGuard auth$', ack)),
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])((ack) => !ack.err), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1));
    }
}
GunAuthGuard.ɵfac = function GunAuthGuard_Factory(t) { return new (t || GunAuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_ng_gun_service__WEBPACK_IMPORTED_MODULE_3__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_5__["LogService"])); };
GunAuthGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: GunAuthGuard, factory: GunAuthGuard.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "dtVT":
/*!*********************************************************************************************!*\
  !*** ./projects/demo/src/app/components/alias-autocomplete/alias-autocomplete.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: AliasAutocompleteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AliasAutocompleteComponent", function() { return AliasAutocompleteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/ng-gun.service */ "bluq");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");











function AliasAutocompleteComponent_mat_option_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const result_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", result_r2.pub)("matTooltip", result_r2.pub);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", result_r2.alias, " (", result_r2.pub, ") ");
} }
class AliasAutocompleteComponent {
    constructor(fb, ngGun) {
        this.fb = fb;
        this.ngGun = ngGun;
        this.userResults = [];
        this.aliasCtl = this.fb.control(null);
        this.select$ = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.aliasCtl.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])((alias) => alias !== null))
            .subscribe((alias) => {
            if (alias.startsWith('~')) {
                return;
            }
            console.log('searching', alias);
            this.ngGun.findAlias(alias).subscribe((found) => {
                console.log('found', found);
                if (found === undefined || found === null) {
                    this.userResults = [];
                    return;
                }
                // FIXME aliases are not guaranteed to be unique, and this may give a false match to the user
                // FIXME warn the user that they should verify that the public key matches the expected public key for whomever they're inviting
                const foundPub = Object.keys(found).find((k) => k !== '_');
                this.userResults = [
                    {
                        alias,
                        pub: foundPub,
                    },
                ];
            });
        });
    }
    ngOnInit() { }
    onSelectUser(event) {
        const selectedValue = event.option.value;
        console.log('selected', selectedValue);
        // this.form.controls.people.value.push(selectedValue.replace('~', ''));
        this.select$.emit(selectedValue.replace(/~/g, ''));
        this.aliasCtl.reset();
        this.userResults = [];
    }
}
AliasAutocompleteComponent.ɵfac = function AliasAutocompleteComponent_Factory(t) { return new (t || AliasAutocompleteComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_3__["NgGunService"])); };
AliasAutocompleteComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AliasAutocompleteComponent, selectors: [["app-alias-autocomplete"]], outputs: { select$: "select$" }, decls: 7, vars: 3, consts: [["matInput", "", 3, "matAutocomplete", "formControl"], [3, "optionSelected"], ["userAutocomplete", ""], [3, "value", "matTooltip", 4, "ngFor", "ngForOf"], [3, "value", "matTooltip"]], template: function AliasAutocompleteComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Enter an alias:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-autocomplete", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("optionSelected", function AliasAutocompleteComponent_Template_mat_autocomplete_optionSelected_4_listener($event) { return ctx.onSelectUser($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, AliasAutocompleteComponent_mat_option_6_Template, 2, 4, "mat-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matAutocomplete", _r0)("formControl", ctx.aliasCtl);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.userResults);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInput"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_6__["MatAutocompleteTrigger"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatLabel"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_6__["MatAutocomplete"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _angular_material_core__WEBPACK_IMPORTED_MODULE_8__["MatOption"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__["MatTooltip"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhbGlhcy1hdXRvY29tcGxldGUuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "fZIX":
/*!********************************************!*\
  !*** ./projects/log/src/lib/log.module.ts ***!
  \********************************************/
/*! exports provided: LogModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogModule", function() { return LogModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class LogModule {
}
LogModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LogModule });
LogModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LogModule_Factory(t) { return new (t || LogModule)(); }, imports: [[]] });


/***/ }),

/***/ "foKA":
/*!***********************************************!*\
  !*** ./projects/ng-gun/src/lib/alias.pipe.ts ***!
  \***********************************************/
/*! exports provided: AliasPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AliasPipe", function() { return AliasPipe; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ng-gun.service */ "bluq");





class AliasPipe extends _angular_common__WEBPACK_IMPORTED_MODULE_0__["AsyncPipe"] {
    constructor(ngGun, _ref) {
        super(_ref);
        this.ngGun = ngGun;
    }
    transform(value, ...args) {
        if (value === '*') {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(value);
        }
        return this.ngGun
            .get(`~${value.replace('~', '')}`)
            .on()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((v) => v.alias || value), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])(1));
    }
}
AliasPipe.ɵfac = function AliasPipe_Factory(t) { return new (t || AliasPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ng_gun_service__WEBPACK_IMPORTED_MODULE_4__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinjectPipeChangeDetectorRef"]()); };
AliasPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefinePipe"]({ name: "alias", type: AliasPipe, pure: true });


/***/ }),

/***/ "g9vf":
/*!***************************************************!*\
  !*** ./projects/demo/src/environments/version.ts ***!
  \***************************************************/
/*! exports provided: VERSION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
const VERSION = {
    "version": "0.0.1"
};
/* tslint:enable */


/***/ }),

/***/ "kwtq":
/*!*****************************************************!*\
  !*** ./projects/ng-gun/src/lib/ng-gun.component.ts ***!
  \*****************************************************/
/*! exports provided: NgGunComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgGunComponent", function() { return NgGunComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class NgGunComponent {
    constructor() { }
    ngOnInit() {
    }
}
NgGunComponent.ɵfac = function NgGunComponent_Factory(t) { return new (t || NgGunComponent)(); };
NgGunComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NgGunComponent, selectors: [["lib-ng-gun"]], decls: 2, vars: 0, template: function NgGunComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " ng-gun works! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, encapsulation: 2 });


/***/ }),

/***/ "mWLu":
/*!***************************************************!*\
  !*** ./projects/ng-gun/src/lib/ng-sea.service.ts ***!
  \***************************************************/
/*! exports provided: NgSeaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgSeaService", function() { return NgSeaService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gun */ "fJS/");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class NgSeaService {
    constructor() {
        this.SEA = gun__WEBPACK_IMPORTED_MODULE_1__["SEA"];
    }
    certify(certificants, policies, authority, options) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.SEA.certify(certificants, policies, authority, null, options));
    }
    certifySelf(pair) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.SEA.certify(pair, '*', pair));
    }
    pair() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.SEA.pair(() => { }));
    }
    getCertStore(certificant, paths, auth, isProtected = false, opts = null) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('certifying', certificant);
            if (Array.isArray(certificant)) {
                const certificantsPromises = certificant.map((c) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () { return yield this.getCertStore(c, paths, auth, isProtected, opts); }));
                const certificants = yield Promise.all(certificantsPromises);
                console.log('certificants', certificants);
                return certificants;
            }
            if (typeof certificant !== 'string') {
                if (typeof certificant !== 'object') {
                    throw new Error('cannot certify provided certificant');
                }
                else if (!certificant.pub) {
                    throw new Error('cannot certify provided certificant');
                }
            }
            const store = {};
            const certPromises = paths.map((path) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                const policy = { '*': path };
                if (isProtected) {
                    policy['+'] = '*';
                }
                const cert = yield this.certify(certificant, policy, auth, opts).toPromise();
                store[path] = {};
                store[path][certificant.pub || certificant] = cert;
            }));
            yield Promise.all(certPromises);
            // console.log('certified', store);
            return store;
        });
    }
}
NgSeaService.ɵfac = function NgSeaService_Factory(t) { return new (t || NgSeaService)(); };
NgSeaService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: NgSeaService, factory: NgSeaService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "na8u":
/*!**********************************************************************!*\
  !*** ./projects/demo/src/app/session-info/session-info.component.ts ***!
  \**********************************************************************/
/*! exports provided: SessionInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionInfoComponent", function() { return SessionInfoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../ng-gun/src/lib/ng-gun.service */ "bluq");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");





function SessionInfoComponent_a_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Log In");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function SessionInfoComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SessionInfoComponent_ng_container_1_Template_a_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.user.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Log Out");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.data == null ? null : ctx_r1.data.alias, " ");
} }
class SessionInfoComponent {
    constructor(ngGun) {
        this.ngGun = ngGun;
        this.user = this.ngGun.auth();
        this.user.once().subscribe((u) => {
            console.log('user', u);
            this.data = u;
        });
        this.user.auth$.subscribe((event) => this.onAuthEvent(event));
        // this.user
        //   .get('alias' as never)
        //   .once()
        //   .subscribe((alias) => console.log('alias', alias));
    }
    ngOnInit() { }
    onAuthEvent(event) {
        console.log('auth event', event);
        this.data = event.put;
    }
}
SessionInfoComponent.ɵfac = function SessionInfoComponent_Factory(t) { return new (t || SessionInfoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_1__["NgGunService"])); };
SessionInfoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SessionInfoComponent, selectors: [["app-session-info"]], decls: 2, vars: 2, consts: [["routerLink", "/login", 4, "ngIf"], [4, "ngIf"], ["routerLink", "/login"], ["mat-button", "", 3, "click"]], template: function SessionInfoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, SessionInfoComponent_a_0_Template, 2, 0, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, SessionInfoComponent_ng_container_1_Template, 4, 1, "ng-container", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.user.is);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.user.is);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatAnchor"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXNzaW9uLWluZm8uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "rP0p":
/*!******************************************************!*\
  !*** ./projects/demo/src/app/diagnostics.service.ts ***!
  \******************************************************/
/*! exports provided: DiagnosticsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagnosticsService", function() { return DiagnosticsService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _components_bug_report_bug_report_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/bug-report/bug-report.component */ "SnFU");
/* harmony import */ var _log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../log/src/lib/log.service */ "Naon");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _system_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./system.service */ "+9ow");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../ng-gun/src/lib/ng-gun.service */ "bluq");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _ng_gun_src_lib_dam_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../ng-gun/src/lib/dam.service */ "WAbZ");










class DiagnosticsService {
    constructor(ngGun, dialog, logger, dam) {
        this.ngGun = ngGun;
        this.dialog = dialog;
        this.logger = logger;
        this.dam = dam;
        this.messages = [];
        this.configuredPeers = Array.isArray(this.ngGun.gunOptions.peers)
            ? this.ngGun.gunOptions.peers
            : Object.keys(this.ngGun.gunOptions.peers);
        this.disconnectedPeers$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(1000 * 5, 1000 * 5).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(() => this.disconnectedPeers), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["shareReplay"])(1));
        _log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_2__["LogService"].buffer$.subscribe((buff) => {
            // console.log('got message', buff);
            this.messages = buff;
        });
        this.disconnectedPeers$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["filter"])((peers) => peers.length > 0))
            .subscribe((peers) => {
            this.logger.log('attempting to reconnect peers', peers);
            peers.forEach((peer) => this.dam.connect(peer));
            this.ngGun.auth().get('inbox').once().subscribe();
        });
        this.logger.log('capabilities', _system_service__WEBPACK_IMPORTED_MODULE_4__["CAPABILITIES"]);
    }
    get peers() {
        const peers = Object.keys(this.ngGun.peers).map((k) => {
            const rawPeer = this.ngGun.peers[k];
            const x = Object.assign(Object.assign({}, rawPeer), { wire: rawPeer.wire === undefined
                    ? undefined
                    : {
                        readyState: rawPeer.wire.readyState,
                        protocol: rawPeer.wire.protocol,
                        extensions: rawPeer.wire.extensions,
                        bufferedAmount: rawPeer.wire.bufferedAmount,
                    } });
            return x;
        });
        return peers;
    }
    get missingPeers() {
        return this.configuredPeers.filter((url) => !this.peers.find((p) => p.url === url));
    }
    get disconnectedPeers() {
        const errorPeers = this.peers
            .filter((peer) => { var _a; return ((_a = peer.wire) === null || _a === void 0 ? void 0 : _a.readyState) === 0; })
            .map((p) => p.url);
        return [...errorPeers, ...this.missingPeers];
    }
    bugReport() {
        // LogService.buffer$.pipe(take(1)).subscribe((messages) => {
        this.dialog.open(_components_bug_report_bug_report_component__WEBPACK_IMPORTED_MODULE_1__["BugReportComponent"], {
            data: {
                messages: this.messages,
                gun: this.ngGun.gun,
                peers: this.peers,
            },
            width: '80%',
            height: '80%',
        });
        // });
    }
}
DiagnosticsService.ɵfac = function DiagnosticsService_Factory(t) { return new (t || DiagnosticsService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_6__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_2__["LogService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_ng_gun_src_lib_dam_service__WEBPACK_IMPORTED_MODULE_8__["DamService"])); };
DiagnosticsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: DiagnosticsService, factory: DiagnosticsService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "rzic":
/*!***********************************!*\
  !*** ./projects/demo/src/main.ts ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "H5HQ");



// console.clear();
// if (environment.production) {
Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
// }
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch((err) => console.error(err));


/***/ }),

/***/ "tg88":
/*!*****************************************************!*\
  !*** ./projects/ng-gun/src/lib/classes/GunChain.ts ***!
  \*****************************************************/
/*! exports provided: GUN_NODE, GunChain, GunAuthChain, GunCertChain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUN_NODE", function() { return GUN_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunChain", function() { return GunChain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunAuthChain", function() { return GunAuthChain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunCertChain", function() { return GunCertChain; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gun */ "fJS/");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _functions_gun_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../functions/gun-utils */ "GT5q");
/* harmony import */ var _log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../log/src/lib/log.service */ "Naon");









const GUN_NODE = Symbol('GUN_NODE');
class GunChain {
    constructor(ngZone, gun, back) {
        var _a;
        this.ngZone = ngZone;
        this.back = back;
        this.isNested = false;
        this.isSubRoot = false;
        this.logger = _log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_6__["LogService"].getLogger('gun-chain');
        this.certificate = (_a = this.back) === null || _a === void 0 ? void 0 : _a.certificate;
        this.certificate$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        this.certificates$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        this._certificates = {};
        this.sources = new Map();
        this._auth = null;
        if (!gun) {
            this.gun = new gun__WEBPACK_IMPORTED_MODULE_2__();
        }
        else {
            this.gun = gun;
        }
    }
    get gun() {
        return this._gun;
    }
    set gun(value) {
        var _a, _b;
        this._gun = value;
        const myKey = value._.get;
        const path = Object(_functions_gun_utils__WEBPACK_IMPORTED_MODULE_5__["gunPath"])(value);
        const chainArray = Object(_functions_gun_utils__WEBPACK_IMPORTED_MODULE_5__["gunChainArray"])(value);
        this.path = path;
        const userPair = this.gun.user().is;
        if (!userPair) {
            // TODO figure out how to handle this case
            return;
        }
        const userPub = `~${(_a = this.gun.user().is) === null || _a === void 0 ? void 0 : _a.pub}`;
        const pubs = path.filter((key) => key.startsWith('~'));
        if (pubs.length > 0) {
            this.recordPub = pubs[0];
            const firstPub = path.findIndex((k) => k.startsWith('~'));
            this.record = chainArray[firstPub];
            if (this.recordPub.indexOf(userPub) < 0) {
                this.isNested = true;
                const pathFromRecord = [...path];
                const keyInRecord = pathFromRecord[0];
                // this.logger.log(myKey, 'foreign key', keyInRecord, path.join(' > '));
                const recordPath = pathFromRecord.splice(firstPub).reverse();
                pathFromRecord.reverse();
                if (myKey === this.recordPub) {
                    this.isSubRoot = true;
                    (_b = this.record) === null || _b === void 0 ? void 0 : _b.get('certs').open((certs) => {
                        this.certificates = certs;
                    });
                }
                else {
                    const pathCerts$ = this.closestRoot.certificates$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["pluck"])(keyInRecord), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((pathStore) => pathStore !== null && pathStore !== undefined));
                    pathCerts$
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["pluck"])(userPair.pub), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((c) => c !== null && c !== undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))
                        .subscribe((store) => {
                        // this.logger.log('user certificate', store);
                        this.certificate = store;
                    });
                    pathCerts$
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["pluck"])('*'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((c) => c !== null && c !== undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))
                        .subscribe((store) => {
                        // this.logger.log('public certificate', store);
                        this.certificate = this.certificate || store;
                    });
                }
            }
        }
    }
    get canEdit() {
        return this.certificate !== null && this.certificate !== undefined;
    }
    get closestRoot() {
        if (this._closestRoot) {
            return this._closestRoot;
        }
        let c = this;
        do {
            if (c.isSubRoot) {
                break;
            }
            c = c.back;
        } while (c !== null);
        this._closestRoot = c;
        return c;
    }
    get certificates() {
        var _a;
        if (!this.isSubRoot && ((_a = this.closestRoot) === null || _a === void 0 ? void 0 : _a.certificates)) {
            return this.closestRoot.certificates;
        }
        return this._certificates;
    }
    set certificates(value) {
        if (value !== this._certificates) {
            this._certificates = value;
            this.certificates$.next(value);
        }
    }
    from(gun) {
        return new GunChain(this.ngZone, gun, this);
    }
    get(key) {
        const soul = this.getSoul(key);
        return this.from(this.gun.get(soul));
    }
    put(data, certificate = this.certificate) {
        // FIXME "unverified data" - certified put values must be signed?
        if (this.isNested && !certificate) {
            this.logger.warn('NO CERTIFICATE FOUND FOR FOREIGN RECORD!');
        }
        this.gun.put(data, (...putAck) => {
            if (putAck[0].err) {
                this.logger.error('putAck', putAck);
            }
        }, certificate ? { opt: { cert: certificate } } : undefined);
        return this;
    }
    set(data, certificate = this.certificate) {
        return this.from(this.gun.set(data, null, certificate
            ? {
                opt: {
                    cert: certificate,
                },
            }
            : undefined));
    }
    unset(data) {
        if (this.gun.unset) {
            return this.from(this.gun.unset(data));
        }
        else {
            throw new Error('CANNOT FIND Gun.chain.unset!');
        }
    }
    query(query) {
        return this.from(this.gun.get(query));
    }
    load() {
        // return this.from((this.gun as any).load((d: any) => d) as any);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEventPattern"])((handler) => {
            const signal = { stopped: false };
            this.gun.load((data) => {
                const converted = data;
                this.ngZone.run(() => {
                    handler(converted);
                });
            });
            return signal;
        }, (handler, signal) => {
            signal.stopped = true;
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1));
    }
    open() {
        // return this.from((this.gun as any).load((d: any) => d) as any);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEventPattern"])((handler) => {
            const signal = { stopped: false };
            this.gun.open((data) => {
                const converted = data;
                this.ngZone.run(() => {
                    handler(converted);
                });
            });
            return signal;
        }, (handler, signal) => {
            signal.stopped = true;
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["debounceTime"])(25));
    }
    map(options) {
        return this.from(this.gun.map());
    }
    reduce(options) {
        const base = this.from(this.gun.map());
        return base.on({ includeKeys: true }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["scan"])((acc, val) => {
            if (val[0] === null || undefined === val[0]) {
                delete acc[val[1]];
            }
            else {
                acc[val[1]] = val[0];
            }
            return acc;
        }, {}), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((v) => (options === null || options === void 0 ? void 0 : options.includeNulls) ? v
            : Object.values(v).filter((ov) => ov !== undefined)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["debounceTime"])(100));
    }
    not() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEventPattern"])((handler) => {
            const signal = { stopped: false };
            if (this.gun.not) {
                this.gun.not((key) => {
                    handler(key);
                });
            }
        });
    }
    on(options) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEventPattern"])((handler) => {
            const signal = { stopped: false };
            this.gun.on((data, key, at, ev) => {
                if (signal.stopped) {
                    return ev.off();
                }
                const dispatchHandler = () => {
                    if (options === null || options === void 0 ? void 0 : options.includeKeys) {
                        handler(data, key);
                    }
                    else {
                        handler(data);
                    }
                };
                // FIXME: ngZone.run() causes infinite recursion
                if (options === null || options === void 0 ? void 0 : options.bypassZone) {
                    dispatchHandler();
                }
                else {
                    this.ngZone.run(dispatchHandler);
                }
            }, options);
            return signal;
        }, (handler, signal) => {
            signal.stopped = true;
        });
    }
    once() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEventPattern"])((handler) => {
            const signal = { stopped: false };
            this.gun.once((data, key, at, ev) => {
                if (ev && signal.stopped) {
                    return ev.off();
                }
                this.ngZone.run(() => {
                    handler(data);
                });
            });
            return signal;
        }, (handler, signal) => {
            signal.stopped = true;
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1));
    }
    auth() {
        if (!this._auth) {
            this._auth = new GunAuthChain(this.ngZone, 
            //// no fix for this... gun.user.is is static! can't have multiple logins on a single gun instance
            // TODO allow option to create a new gun instance for this auth call
            this.gun.user().recall({ sessionStorage: true }), this, this);
        }
        return this._auth;
    }
    user(pubKey) {
        return this.from(this.gun.user(pubKey === null || pubKey === void 0 ? void 0 : pubKey.replace(/^~/, '')));
    }
    onEvent(event, node = this.gun) {
        if (!this.sources.has(event)) {
            const source = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEventPattern"])((handler) => {
                // this.logger.log('add handler');
                node.on(event, (...args) => {
                    this.ngZone.run(() => {
                        handler(...args);
                    });
                });
            }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["shareReplay"])(1));
            this.sources.set(event, source);
        }
        return this.sources.get(event);
    }
    getSoul(key) {
        return typeof key === 'object' && gun__WEBPACK_IMPORTED_MODULE_2__["node"].is(key)
            ? gun__WEBPACK_IMPORTED_MODULE_2__["node"].soul(key)
            : key;
    }
}
GunChain.ɵfac = function GunChain_Factory(t) { return new (t || GunChain)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](GUN_NODE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](GunChain, 12)); };
GunChain.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GunChain, factory: GunChain.ɵfac });
/** Represents a top-level authenticated node (user or key pair) */
let GunAuthChain = class GunAuthChain extends GunChain {
    constructor(ngZone, gun, root, back) {
        super(ngZone, gun, back);
        this.root = root;
        this.logger = _log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_6__["LogService"].getLogger('gun-auth-chain');
        this.auth$ = this.root.onEvent('auth').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((ack) => {
            if (!ack.err) {
                this.is = ack.put;
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["shareReplay"])(1));
        this.is = gun.is;
    }
    set is(value) {
        this._is = value;
        if (value) {
            this.root
                .get(`~${value.pub}`)
                .get('alias')
                .once()
                .subscribe((alias) => {
                var _a, _b, _c;
                this.alias = (_c = (_b = (_a = this.gun._.root.user) === null || _a === void 0 ? void 0 : _a._) === null || _b === void 0 ? void 0 : _b.put) === null || _c === void 0 ? void 0 : _c.alias;
            });
        }
    }
    get is() {
        return this._is;
    }
    login(alias, pass) {
        const auth$ = this.root.onEvent('auth').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((ack) => !ack.err), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((ack) => {
            return ack.put.alias === alias;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1));
        const login$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEventPattern"])((handler) => {
            const signal = { stopped: false };
            this.gun.auth(alias, pass, (ack) => {
                this.ngZone.run(() => {
                    handler(ack);
                });
            });
            return signal;
        }, (handler, signal) => {
            signal.stopped = true;
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])((ack) => (ack.wait ? Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(new Error(ack)) : Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(ack))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["retryWhen"])((errors) => errors.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["delay"])(1000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(10))));
        const loginOrAuth$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])([auth$, login$]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1));
        return loginOrAuth$;
    }
    create(alias, pass) {
        const auth$ = this.root.onEvent('auth').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((ack) => {
            return ack.put.alias === alias;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1));
        this.gun.create(alias, pass);
        return auth$;
    }
    secret(value) {
        if (this.gun.secret) {
            return this.from(this.gun.secret(value));
        }
        throw new Error('GUN.chain.secret NOT FOUND');
    }
    from(gun) {
        return new GunAuthChain(this.ngZone, gun, this.root, this);
    }
    recall() {
        this.gun.recall({ sessionStorage: true });
        return this.auth$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["timeout"])(5000));
    }
    logout() {
        this.gun.leave();
    }
    put(data, certificate = this.certificate) {
        // SEA.sign(data, this.is.alias);
        super.put(data, certificate);
        return this;
    }
};
GunAuthChain = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])())
], GunAuthChain);

/** Represents a node nested under a user/pair
 * gun.user() : AuthChain
 * gun.user(pub) : UserChain
 * gun.get('~@alias') : GunChain<{pub: string}>
 */
class GunCertChain extends GunChain {
}


/***/ }),

/***/ "wqjN":
/*!**********************************************************!*\
  !*** ./projects/ng-gun/src/lib/route-chain.directive.ts ***!
  \**********************************************************/
/*! exports provided: RouteChainDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteChainDirective", function() { return RouteChainDirective; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gun */ "fJS/");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chain_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chain.directive */ "R39e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ng_gun_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ng-gun.service */ "bluq");






class RouteChainDirective extends _chain_directive__WEBPACK_IMPORTED_MODULE_2__["ChainDirective"] {
    constructor(route, ngGun, dataKey = 'chain') {
        super(ngGun);
        this.route = route;
        this.dataKey = dataKey;
        this.chain$ = this.route.data.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((data) => {
            const d = data[this.dataKey];
            const soul = gun__WEBPACK_IMPORTED_MODULE_1__["node"].soul(d);
            // console.log('route data', this.dataKey);
            return this.ngGun.auth().root.get(soul);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["shareReplay"])(1));
        this.data$ = this.chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["switchMap"])((chain) => chain.once()));
        this.data$.subscribe((data) => console.log({ data }));
    }
}
RouteChainDirective.ɵfac = function RouteChainDirective_Factory(t) { return new (t || RouteChainDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ng_gun_service__WEBPACK_IMPORTED_MODULE_5__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"]('gun-route-data-key', 8)); };
RouteChainDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineDirective"]({ type: RouteChainDirective, selectors: [["", "libRouteGun", ""]], outputs: { chain$: "chain$", data$: "data$" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]] });


/***/ }),

/***/ "xRfH":
/*!***********************************************************!*\
  !*** ./projects/demo/src/app/forms-ui/forms-ui.module.ts ***!
  \***********************************************************/
/*! exports provided: FormsUiModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormsUiModule", function() { return FormsUiModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class FormsUiModule {
}
FormsUiModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: FormsUiModule });
FormsUiModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function FormsUiModule_Factory(t) { return new (t || FormsUiModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](FormsUiModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]] }); })();


/***/ }),

/***/ "xcn7":
/*!**************************************************!*\
  !*** ./projects/ng-gun/src/lib/ng-gun.module.ts ***!
  \**************************************************/
/*! exports provided: NgGunModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgGunModule", function() { return NgGunModule; });
/* harmony import */ var _alias_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alias.pipe */ "foKA");
/* harmony import */ var _chain_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chain.directive */ "R39e");
/* harmony import */ var _ng_gun_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ng-gun.component */ "kwtq");
/* harmony import */ var _soul_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./soul.pipe */ "FlTl");
/* harmony import */ var _updated_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./updated.pipe */ "xdc7");
/* harmony import */ var _verify_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./verify.pipe */ "VUWm");
/* harmony import */ var _route_chain_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./route-chain.directive */ "wqjN");
/* harmony import */ var _gun_map_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./gun-map.directive */ "6AHW");
/* harmony import */ var _log_src_lib_log_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../log/src/lib/log.module */ "fZIX");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");










class NgGunModule {
}
NgGunModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({ type: NgGunModule });
NgGunModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({ factory: function NgGunModule_Factory(t) { return new (t || NgGunModule)(); }, providers: [{ provide: 'gun-route-data-key', useValue: 'chain' }], imports: [[_log_src_lib_log_module__WEBPACK_IMPORTED_MODULE_8__["LogModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](NgGunModule, { declarations: [_ng_gun_component__WEBPACK_IMPORTED_MODULE_2__["NgGunComponent"],
        _soul_pipe__WEBPACK_IMPORTED_MODULE_3__["SoulPipe"],
        _updated_pipe__WEBPACK_IMPORTED_MODULE_4__["UpdatedPipe"],
        _chain_directive__WEBPACK_IMPORTED_MODULE_1__["ChainDirective"],
        _alias_pipe__WEBPACK_IMPORTED_MODULE_0__["AliasPipe"],
        _verify_pipe__WEBPACK_IMPORTED_MODULE_5__["VerifyPipe"],
        _route_chain_directive__WEBPACK_IMPORTED_MODULE_6__["RouteChainDirective"],
        _gun_map_directive__WEBPACK_IMPORTED_MODULE_7__["GunMapDirective"]], imports: [_log_src_lib_log_module__WEBPACK_IMPORTED_MODULE_8__["LogModule"]], exports: [_ng_gun_component__WEBPACK_IMPORTED_MODULE_2__["NgGunComponent"],
        _soul_pipe__WEBPACK_IMPORTED_MODULE_3__["SoulPipe"],
        _updated_pipe__WEBPACK_IMPORTED_MODULE_4__["UpdatedPipe"],
        _chain_directive__WEBPACK_IMPORTED_MODULE_1__["ChainDirective"],
        _alias_pipe__WEBPACK_IMPORTED_MODULE_0__["AliasPipe"],
        _verify_pipe__WEBPACK_IMPORTED_MODULE_5__["VerifyPipe"],
        _route_chain_directive__WEBPACK_IMPORTED_MODULE_6__["RouteChainDirective"],
        _gun_map_directive__WEBPACK_IMPORTED_MODULE_7__["GunMapDirective"]] }); })();


/***/ }),

/***/ "xdc7":
/*!*************************************************!*\
  !*** ./projects/ng-gun/src/lib/updated.pipe.ts ***!
  \*************************************************/
/*! exports provided: UpdatedPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdatedPipe", function() { return UpdatedPipe; });
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gun */ "fJS/");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class UpdatedPipe {
    transform(value, ...args) {
        const updates = gun__WEBPACK_IMPORTED_MODULE_0__["node"].is(value) ? value._['>'] : null;
        if (!updates) {
            return null;
        }
        return Object.values(updates).reduce((latest, time) => (time > latest ? time : latest), 0);
    }
}
UpdatedPipe.ɵfac = function UpdatedPipe_Factory(t) { return new (t || UpdatedPipe)(); };
UpdatedPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "updated", type: UpdatedPipe, pure: true });


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ }),

/***/ "zzai":
/*!*********************************************************************************!*\
  !*** ./projects/demo/src/app/components/certificates/certificates.component.ts ***!
  \*********************************************************************************/
/*! exports provided: CertificatesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CertificatesComponent", function() { return CertificatesComponent; });
/* harmony import */ var _certificate_form_certificate_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../certificate-form/certificate-form.component */ "8VfK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _ng_gun_src_lib_chain_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/chain.directive */ "R39e");
/* harmony import */ var _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/ng-gun.service */ "bluq");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");






class CertificatesComponent {
    constructor(dialog, chainDirective, ngGun) {
        this.dialog = dialog;
        this.chainDirective = chainDirective;
        // super(ngGun);
    }
    ngOnInit() { }
    createCertificate() {
        this.dialog.open(_certificate_form_certificate_form_component__WEBPACK_IMPORTED_MODULE_0__["CertificateFormComponent"], { height: '90%', width: '90%' });
    }
}
CertificatesComponent.ɵfac = function CertificatesComponent_Factory(t) { return new (t || CertificatesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_gun_src_lib_chain_directive__WEBPACK_IMPORTED_MODULE_3__["ChainDirective"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_4__["NgGunService"])); };
CertificatesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CertificatesComponent, selectors: [["app-certificates"]], decls: 4, vars: 0, consts: [["mat-button", "", 3, "click"]], template: function CertificatesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "certificates works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CertificatesComponent_Template_button_click_2_listener() { return ctx.createCertificate(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Create");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjZXJ0aWZpY2F0ZXMuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map