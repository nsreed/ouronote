(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!*****************************************!*\
  !*** multi ./projects/demo/src/main.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/nsreed/repos/libs/ng-gun/projects/demo/src/main.ts */"rzic");


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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ "fXoL");




















class ComponentsModule {
}
ComponentsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineNgModule"]({ type: ComponentsModule });
ComponentsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineInjector"]({ factory: function ComponentsModule_Factory(t) { return new (t || ComponentsModule)(); }, imports: [[
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
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵsetNgModuleScope"](ComponentsModule, { declarations: [_bug_report_bug_report_component__WEBPACK_IMPORTED_MODULE_14__["BugReportComponent"],
        _gun_peers_gun_peers_component__WEBPACK_IMPORTED_MODULE_15__["GunPeersComponent"],
        _alias_autocomplete_alias_autocomplete_component__WEBPACK_IMPORTED_MODULE_16__["AliasAutocompleteComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
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
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gun */ "U+kO");
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
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gun */ "U+kO");
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ng-gun/src/lib/ng-gun.service */ "bluq");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-clipboard */ "Dvla");
/* harmony import */ var _log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../log/src/lib/log.service */ "Naon");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _diagnostics_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./diagnostics.service */ "rP0p");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/flex-layout/flex */ "XiUz");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/badge */ "TU8p");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ "ofXK");




















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
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_5__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_clipboard__WEBPACK_IMPORTED_MODULE_6__["ClipboardService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_7__["LogService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_diagnostics_service__WEBPACK_IMPORTED_MODULE_9__["DiagnosticsService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 30, vars: 7, consts: [["fxFlexFill", ""], [3, "mode", "opened"], ["nav", ""], ["routerLinkActive", "active", "routerLink", "/user/vectors", "matTooltip", "Vectors"], ["mat-list-icon", ""], ["routerLinkActive", "active", "routerLink", "/user/messages", "matTooltip", "Messages"], ["matTooltip", "Open bug report dialog", 3, "click"], ["matTooltip", "Open peer statistics", 3, "click"], ["mat-list-icon", "", "matBadgeColor", "warn", "matBadgeSize", "small", 3, "matBadge"], [3, "matMenuTriggerFor", "matTooltip"], ["mat-list-icon", "", "color", "primary"], ["sessionMenu", ""], ["mat-menu-item", "", "routerLink", "/user/settings"], ["mat-menu-item", "", 3, "click"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-sidenav-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-sidenav", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "mat-action-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "mat-list-item", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "note");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "mat-list-item", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "message");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "mat-list-item", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_Template_mat_list_item_click_11_listener() { return ctx.bugReport(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "bug_report");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "mat-list-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_Template_mat_list_item_click_14_listener() { return ctx.peers(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "mat-icon", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](16, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, " signal_wifi_4_bar ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](18, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "mat-list-item", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "mat-icon", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "account_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "mat-menu", null, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](25, "Settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_Template_button_click_26_listener() { return ctx.logout(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27, "Log Out");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "mat-sidenav-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](29, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](23);
        let tmp_2_0 = null;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("mode", "side")("opened", ctx.user.is);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matBadge", ((tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](16, 5, ctx.diagnosticsService.disconnectedPeers$)) == null ? null : tmp_2_0.length) || null);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matMenuTriggerFor", _r1)("matTooltip", "@" + ctx.ngGun.auth().alias);
    } }, directives: [_angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__["MatSidenavContainer"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_11__["FlexFillDirective"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__["MatSidenav"], _angular_material_list__WEBPACK_IMPORTED_MODULE_12__["MatList"], _angular_material_list__WEBPACK_IMPORTED_MODULE_12__["MatListItem"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterLinkActive"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterLink"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_13__["MatTooltip"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__["MatIcon"], _angular_material_list__WEBPACK_IMPORTED_MODULE_12__["MatListIconCssMatStyler"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_15__["MatDivider"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_16__["MatBadge"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__["MatMenuTrigger"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__["MatMenu"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__["MatMenuItem"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__["MatSidenavContent"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterOutlet"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_18__["AsyncPipe"]], styles: ["mat-sidenav-content[_ngcontent-%COMP%] {\n  align-items: stretch;\n  flex-grow: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVFLG9CQUFBO0VBQ0EsWUFBQTtBQUFGIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1zaWRlbmF2LWNvbnRlbnQge1xuICAvLyBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgZmxleC1ncm93OiAxO1xufVxuIl19 */"] });


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
                console.log('%s %s %s %s', m.name, new Date(m.timestamp).toISOString(), m.message, JSON.stringify(m.args));
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
        return new LogService(name);
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
/* harmony import */ var ng_gun__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-gun */ "f6I/");
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
            log: this.data.messages,
        };
        this.report = report;
        // });
        this.updatePreview();
    }
    updatePreview() {
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
BugReportComponent.ɵfac = function BugReportComponent_Factory(t) { return new (t || BugReportComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ng_gun__WEBPACK_IMPORTED_MODULE_6__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ngx_clipboard__WEBPACK_IMPORTED_MODULE_8__["ClipboardService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MAT_DIALOG_DATA"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__["MatSnackBar"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormBuilder"])); };
BugReportComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: BugReportComponent, selectors: [["app-bug-report"]], decls: 21, vars: 4, consts: [["matDialogTitle", ""], ["matDialogContent", ""], [3, "multi"], [3, "expanded"], ["fxFlexFill", ""], ["matInput", "", "placeholder", "Please provide a description of the problem and what you were doing/what you expected when you encountered it.", 3, "formControl"], ["matDialogActions", ""], ["mat-icon-button", "", "matTooltip", "Copy to clipboard", 3, "click"], ["mat-icon-button", "", "matTooltip", "Download .json", 3, "click"]], template: function BugReportComponent_Template(rf, ctx) { if (rf & 1) {
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
    } }, directives: [_angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatAccordion"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatExpansionPanelHeader"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__["MatFormField"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_13__["FlexFillDirective"], _angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormControlDirective"], _angular_material_button__WEBPACK_IMPORTED_MODULE_15__["MatButton"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__["MatTooltip"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__["MatIcon"]], styles: ["[_nghost-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n[_nghost-%COMP%]   [matDialogContent][_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  flex: 1 1 auto;\n  flex-direction: column;\n  overflow: auto;\n  overflow-y: scroll;\n}\n[_nghost-%COMP%]   [matDialogContent][_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n          user-select: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2J1Zy1yZXBvcnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7QUFDRjtBQUFFO0VBSUUsYUFBQTtFQUNBLG9CQUFBO0VBQ0EsY0FBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FBREo7QUFQSTtFQUNFLHlCQUFBO1VBQUEsaUJBQUE7QUFTTiIsImZpbGUiOiJidWctcmVwb3J0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIFttYXREaWFsb2dDb250ZW50XSB7XG4gICAgaDIge1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gICAgZmxleDogMSAxIGF1dG87XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIH1cbn1cbiJdfQ== */"] });


/***/ }),

/***/ "U+kO":
/*!*****************************************!*\
  !*** /home/nsreed/repos/gun/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./gun.js */ "mKbU")

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
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gun */ "U+kO");
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
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gun */ "U+kO");
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");






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
        path: '',
        component: _welcome_welcome_component__WEBPACK_IMPORTED_MODULE_3__["WelcomeComponent"],
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


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
/* harmony import */ var _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout/grid */ "zpSk");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");







function GunPeersComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
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
    constructor(ngGun, dialogRef, data) {
        this.ngGun = ngGun;
        this.dialogRef = dialogRef;
        this.data = data;
        this.peers = this.data.ngGun.peers;
    }
    logGun() {
        console.log(this.data.ngGun);
    }
}
GunPeersComponent.ɵfac = function GunPeersComponent_Factory(t) { return new (t || GunPeersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_2__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MAT_DIALOG_DATA"])); };
GunPeersComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: GunPeersComponent, selectors: [["app-gun-peers"]], decls: 17, vars: 3, consts: [["gdColumns", "max-content max-content auto repeat(2, max-content)", "gdGap", "1em", "gdAlignRows", "stretch"], [4, "ngFor", "ngForOf"], ["mat-button", "", 3, "click"]], template: function GunPeersComponent_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, GunPeersComponent_ng_container_13_Template, 11, 5, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](14, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function GunPeersComponent_Template_button_click_15_listener() { return ctx.logGun(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "console.log gun");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](14, 1, ctx.peers));
    } }, directives: [_angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_3__["ɵgrid_privatex"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_3__["ɵgrid_privateba"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_3__["ɵgrid_privatei"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["KeyValuePipe"]], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2d1bi1wZWVycy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7QUFDRiIsImZpbGUiOiJndW4tcGVlcnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogMTAwJTtcbn1cbiJdfQ== */"] });


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
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gun */ "U+kO");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_GunChain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/GunChain */ "tg88");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



const GunOptions = 'gun-options';
class NgGunService extends _classes_GunChain__WEBPACK_IMPORTED_MODULE_1__["GunChain"] {
    constructor(gunOptions, ngZone) {
        super(ngZone, new gun__WEBPACK_IMPORTED_MODULE_0__(JSON.parse(JSON.stringify(gunOptions))));
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

/***/ "f6I/":
/*!****************************************!*\
  !*** ./dist/ng-gun/fesm2015/ng-gun.js ***!
  \****************************************/
/*! exports provided: AliasPipe, ChainDirective, GUN_NODE, GunAuthChain, GunCertChain, GunChain, GunOptions, GunResolverService, NgGunComponent, NgGunModule, NgGunService, RouteChainDirective, SoulPipe, UpdatedPipe, VerifyPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AliasPipe", function() { return AliasPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChainDirective", function() { return ChainDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUN_NODE", function() { return GUN_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunAuthChain", function() { return GunAuthChain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunCertChain", function() { return GunCertChain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunChain", function() { return GunChain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunOptions", function() { return GunOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GunResolverService", function() { return GunResolverService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgGunComponent", function() { return NgGunComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgGunModule", function() { return NgGunModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgGunService", function() { return NgGunService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteChainDirective", function() { return RouteChainDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoulPipe", function() { return SoulPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdatedPipe", function() { return UpdatedPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifyPipe", function() { return VerifyPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gun */ "U+kO");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");










const gunUpdateTime = (value) => {
    const updates = gun__WEBPACK_IMPORTED_MODULE_1__["node"].is(value) ? value._['>'] : null;
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

const GUN_NODE = Symbol('GUN_NODE');
class GunChain {
    constructor(ngZone, gun) {
        this.ngZone = ngZone;
        this.isNested = false;
        this.certificate$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.certificates = {};
        this.sources = new Map();
        this._auth = null;
        if (!gun) {
            this.gun = new gun__WEBPACK_IMPORTED_MODULE_1__();
        }
        else {
            this.gun = gun;
        }
    }
    get gun() {
        return this._gun;
    }
    set gun(value) {
        var _a;
        this._gun = value;
        const myKey = value._.get;
        const path = gunPath(value);
        const chainArray = gunChainArray(value);
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
                const recordPath = pathFromRecord.splice(firstPub).reverse();
                pathFromRecord.reverse();
                if (myKey === this.recordPub) {
                    // console.log('sub root', myKey);
                }
                else {
                    // console.log('foreign key', myKey);
                    const keyInRecord = pathFromRecord[0];
                    const record = chainArray[firstPub];
                    // console.log('record', record);
                    this.record = record;
                    const recordCerts = record.get('certs');
                    const pathCerts = recordCerts.get(keyInRecord);
                    const searchKeys = [userPair.pub, '*'];
                    const myCert = pathCerts.get(userPair.pub);
                    myCert.not(() => {
                        // console.log('no cert found');
                        pathCerts.get('*').once((pubCert) => {
                            if (!pubCert) {
                                // console.warn('no public cert found either');
                            }
                            this.certificate = pubCert;
                            this.certificate$.next(pubCert);
                        });
                    });
                    // console.log('  %s', keyInRecord);
                    myCert.once((cert) => Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__awaiter"])(this, void 0, void 0, function* () {
                        if (cert === null || cert === undefined) {
                            console.log('no user cert found, checking for public cert');
                            return;
                        }
                        // console.log('cert', cert);
                        // TODO verify cert later, the await causes chained put() calls to fail
                        // const verified = await SEA.verify(
                        //   cert,
                        //   this.recordPub.replace('~', '')
                        // );
                        this.certificate = cert;
                        this.certificate$.next(cert);
                        // console.log(
                        //   'verified cert for %s.%s',
                        //   this.recordPub,
                        //   keyInRecord,
                        //   pathFromRecord.join('.')
                        // );
                    }));
                }
            }
        }
    }
    get canEdit() {
        return this.certificate !== null && this.certificate !== undefined;
    }
    from(gun) {
        return new GunChain(this.ngZone, gun);
    }
    get(key) {
        const soul = this.getSoul(key);
        return this.from(this.gun.get(soul));
    }
    put(data, certificate = this.certificate) {
        // FIXME "unverified data" - certified put values must be signed?
        if (this.isNested && !certificate) {
            console.warn('NO CERTIFICATE FOUND FOR FOREIGN RECORD!');
        }
        this.gun.put(data, (...putAck) => {
            console.log('putAck', putAck);
        }, certificate ? { opt: { cert: certificate } } : undefined);
        return this;
    }
    set(data, certificate = this.certificate) {
        var _a;
        if (this.isNested && !certificate) {
            console.warn('NO CERTIFICATE FOUND FOR FOREIGN RECORD!');
            (_a = this.record) === null || _a === void 0 ? void 0 : _a.get('certs').load((certs) => {
                console.log('all certs:', certs);
            });
        }
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
            this.gun.user().recall({ sessionStorage: true }), this);
        }
        return this._auth;
    }
    user(pubKey) {
        return this.from(this.gun.user(pubKey === null || pubKey === void 0 ? void 0 : pubKey.replace(/^~/, '')));
    }
    onEvent(event, node = this.gun) {
        if (!this.sources.has(event)) {
            const source = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEventPattern"])((handler) => {
                // console.log('add handler');
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
        return typeof key === 'object' && gun__WEBPACK_IMPORTED_MODULE_1__["node"].is(key)
            ? gun__WEBPACK_IMPORTED_MODULE_1__["node"].soul(key)
            : key;
    }
}
GunChain.ɵfac = function GunChain_Factory(t) { return new (t || GunChain)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](GUN_NODE, 8)); };
GunChain.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GunChain, factory: GunChain.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GunChain, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [GUN_NODE]
            }] }]; }, null); })();
/** Represents a top-level authenticated node (user or key pair) */
let GunAuthChain = class GunAuthChain extends GunChain {
    constructor(ngZone, gun, root) {
        super(ngZone, gun);
        this.root = root;
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
        return new GunAuthChain(this.ngZone, gun, this.root);
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
GunAuthChain = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__decorate"])([
    Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"])())
], GunAuthChain);
/** Represents a node nested under a user/pair
 * gun.user() : AuthChain
 * gun.user(pub) : UserChain
 * gun.get('~@alias') : GunChain<{pub: string}>
 */
class GunCertChain extends GunChain {
}

const GunOptions = 'gun-options';
class NgGunService extends GunChain {
    constructor(gunOptions, ngZone) {
        super(ngZone, new gun__WEBPACK_IMPORTED_MODULE_1__(JSON.parse(JSON.stringify(gunOptions))));
        this.gunOptions = gunOptions;
    }
    get peers() {
        return this.gun._.root.opt.peers;
    }
    findAlias(alias) {
        return this.get(`~@${alias}`).once();
    }
}
NgGunService.ɵfac = function NgGunService_Factory(t) { return new (t || NgGunService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](GunOptions), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"])); };
NgGunService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: NgGunService, factory: NgGunService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgGunService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [GunOptions]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }]; }, null); })();

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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgGunComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'lib-ng-gun',
                template: `
    <p>
      ng-gun works!
    </p>
  `,
                styles: []
            }]
    }], function () { return []; }, null); })();

class AliasPipe extends _angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"] {
    constructor(ngGun, _ref) {
        super(_ref);
        this.ngGun = ngGun;
    }
    transform(value, ...args) {
        if (value === '*') {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(value);
        }
        return this.ngGun
            .get(`~${value.replace('~', '')}`)
            .on()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((v) => v.alias || value), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["shareReplay"])(1));
    }
}
AliasPipe.ɵfac = function AliasPipe_Factory(t) { return new (t || AliasPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgGunService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectPipeChangeDetectorRef"]()); };
AliasPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "alias", type: AliasPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AliasPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'alias',
            }]
    }], function () { return [{ type: NgGunService }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }]; }, null); })();

class ChainDirective {
    constructor(ngGun) {
        this.ngGun = ngGun;
        this._chain$ = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chain$ = this._chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["shareReplay"])(1));
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
ChainDirective.ɵfac = function ChainDirective_Factory(t) { return new (t || ChainDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgGunService)); };
ChainDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: ChainDirective, selectors: [["", "gunChain", ""]], inputs: { chain: ["gunChain", "chain"] }, exportAs: ["gunChain"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChainDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                // tslint:disable-next-line: directive-selector
                selector: '[gunChain]',
                exportAs: 'gunChain',
            }]
    }], function () { return [{ type: NgGunService }]; }, { chain: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['gunChain']
        }] }); })();

class SoulPipe {
    transform(value, ...args) {
        return gun__WEBPACK_IMPORTED_MODULE_1__["node"].is(value) ? gun__WEBPACK_IMPORTED_MODULE_1__["node"].soul(value) : undefined;
    }
}
SoulPipe.ɵfac = function SoulPipe_Factory(t) { return new (t || SoulPipe)(); };
SoulPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "soul", type: SoulPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SoulPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'soul',
            }]
    }], null, null); })();

class UpdatedPipe {
    transform(value, ...args) {
        const updates = gun__WEBPACK_IMPORTED_MODULE_1__["node"].is(value) ? value._['>'] : null;
        if (!updates) {
            return null;
        }
        return Object.values(updates).reduce((latest, time) => (time > latest ? time : latest), 0);
    }
}
UpdatedPipe.ɵfac = function UpdatedPipe_Factory(t) { return new (t || UpdatedPipe)(); };
UpdatedPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "updated", type: UpdatedPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UpdatedPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'updated',
            }]
    }], null, null); })();

class NgSeaService {
    constructor() {
        this.SEA = gun__WEBPACK_IMPORTED_MODULE_1__["SEA"];
    }
    certify(certificants, policies, authority, options) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.SEA.certify(certificants, policies, authority, null, options));
    }
    certifySelf(pair) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.SEA.certify(pair, '*', pair));
    }
    pair() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.SEA.pair(() => { }));
    }
    getCertStore(certificant, paths, auth, isProtected = false, opts = null) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('certifying', certificant);
            if (Array.isArray(certificant)) {
                const certificantsPromises = certificant.map((c) => Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__awaiter"])(this, void 0, void 0, function* () { return yield this.getCertStore(c, paths, auth, isProtected, opts); }));
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
            const certPromises = paths.map((path) => Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__awaiter"])(this, void 0, void 0, function* () {
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
NgSeaService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: NgSeaService, factory: NgSeaService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgSeaService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();

class VerifyPipe extends _angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"] {
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(gun__WEBPACK_IMPORTED_MODULE_1__["SEA"].verify(value, (_a = this.chain.chain) === null || _a === void 0 ? void 0 : _a.recordPub.replace('~', ''))).pipe(
        // tap((v) => console.log('verified', v)),
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((v) => this.ref.detectChanges()));
        // ) as any;
    }
}
VerifyPipe.ɵfac = function VerifyPipe_Factory(t) { return new (t || VerifyPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgGunService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgSeaService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectPipeChangeDetectorRef"](), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ChainDirective, 8)); };
VerifyPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "verify", type: VerifyPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](VerifyPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'verify',
            }]
    }], function () { return [{ type: NgGunService }, { type: NgSeaService }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: ChainDirective, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }]; }, null); })();

class RouteChainDirective {
    constructor(route, ngGun, dataKey = 'chain') {
        this.route = route;
        this.ngGun = ngGun;
        this.dataKey = dataKey;
        this.chain$ = this.route.data.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((data) => {
            const d = data[this.dataKey];
            const soul = gun__WEBPACK_IMPORTED_MODULE_1__["node"].soul(d);
            // console.log('route data', this.dataKey);
            return this.ngGun.auth().root.get(soul);
        }));
        this.data$ = this.chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])((chain) => chain.once()));
        this.data$.subscribe((data) => console.log({ data }));
    }
}
RouteChainDirective.ɵfac = function RouteChainDirective_Factory(t) { return new (t || RouteChainDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgGunService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"]('gun-route-data-key', 8)); };
RouteChainDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: RouteChainDirective, selectors: [["", "libRouteGun", ""]], outputs: { chain$: "chain$", data$: "data$" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RouteChainDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[libRouteGun]',
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] }, { type: NgGunService }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: ['gun-route-data-key']
            }] }]; }, { chain$: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], data$: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();

class NgGunModule {
}
NgGunModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: NgGunModule });
NgGunModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function NgGunModule_Factory(t) { return new (t || NgGunModule)(); }, providers: [{ provide: 'gun-route-data-key', useValue: 'chain' }] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](NgGunModule, { declarations: [NgGunComponent,
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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgGunModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
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

class GunResolverService {
    constructor(ngGun) {
        this.ngGun = ngGun;
    }
    resolve(route, state) {
        const soul = route.params.soul;
        return this.ngGun.auth().root.get(soul).once();
    }
}
GunResolverService.ɵfac = function GunResolverService_Factory(t) { return new (t || GunResolverService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](NgGunService)); };
GunResolverService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GunResolverService, factory: GunResolverService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GunResolverService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: NgGunService }]; }, null); })();

/*
 * Public API Surface of ng-gun
 */

/**
 * Generated bundle index. Do not edit.
 */




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

/***/ "h66u":
/*!***********************************!*\
  !*** /home/nsreed/repos/gun sync ***!
  \***********************************/
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
webpackEmptyContext.id = "h66u";

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

/***/ "mKbU":
/*!*************************************!*\
  !*** /home/nsreed/repos/gun/gun.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {;(function(){

  /* UNBUILD */
  function USE(arg, req){
    return req? __webpack_require__("h66u")(arg) : arg.slice? USE[R(arg)] : function(mod, path){
      arg(mod = {exports: {}});
      USE[R(path)] = mod.exports;
    }
    function R(p){
      return p.split('/').slice(-1).toString().replace('.js','');
    }
  }
  if(true){ var MODULE = module }
  /* UNBUILD */

	;USE(function(module){
		// Generic javascript utilities.
		var Type = {};
		//Type.fns = Type.fn = {is: function(fn){ return (!!fn && fn instanceof Function) }}
		Type.fn = {is: function(fn){ return (!!fn && 'function' == typeof fn) }}
		Type.bi = {is: function(b){ return (b instanceof Boolean || typeof b == 'boolean') }}
		Type.num = {is: function(n){ return !list_is(n) && ((n - parseFloat(n) + 1) >= 0 || Infinity === n || -Infinity === n) }}
		Type.text = {is: function(t){ return (typeof t == 'string') }}
		Type.text.ify = function(t){
			if(Type.text.is(t)){ return t }
			if(typeof JSON !== "undefined"){ return JSON.stringify(t) }
			return (t && t.toString)? t.toString() : t;
		}
		Type.text.random = function(l, c){
			var s = '';
			l = l || 24; // you are not going to make a 0 length random number, so no need to check type
			c = c || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz';
			while(l > 0){ s += c.charAt(Math.floor(Math.random() * c.length)); l-- }
			return s;
		}
		Type.text.match = function(t, o){ var tmp, u;
			if('string' !== typeof t){ return false }
			if('string' == typeof o){ o = {'=': o} }
			o = o || {};
			tmp = (o['='] || o['*'] || o['>'] || o['<']);
			if(t === tmp){ return true }
			if(u !== o['=']){ return false }
			tmp = (o['*'] || o['>'] || o['<']);
			if(t.slice(0, (tmp||'').length) === tmp){ return true }
			if(u !== o['*']){ return false }
			if(u !== o['>'] && u !== o['<']){
				return (t >= o['>'] && t <= o['<'])? true : false;
			}
			if(u !== o['>'] && t >= o['>']){ return true }
			if(u !== o['<'] && t <= o['<']){ return true }
			return false;
		}
		Type.text.hash = function(s, c){ // via SO
			if(typeof s !== 'string'){ return }
	    c = c || 0;
	    if(!s.length){ return c }
	    for(var i=0,l=s.length,n; i<l; ++i){
	      n = s.charCodeAt(i);
	      c = ((c<<5)-c)+n;
	      c |= 0;
	    }
	    return c;
	  }
		Type.list = {is: function(l){ return (l instanceof Array) }}
		Type.list.slit = Array.prototype.slice;
		Type.list.sort = function(k){ // creates a new sort function based off some key
			return function(A,B){
				if(!A || !B){ return 0 } A = A[k]; B = B[k];
				if(A < B){ return -1 }else if(A > B){ return 1 }
				else { return 0 }
			}
		}
		Type.list.map = function(l, c, _){ return obj_map(l, c, _) }
		Type.list.index = 1; // change this to 0 if you want non-logical, non-mathematical, non-matrix, non-convenient array notation
		Type.obj = {is: function(o){ return o? (o instanceof Object && o.constructor === Object) || Object.prototype.toString.call(o).match(/^\[object (\w+)\]$/)[1] === 'Object' : false }}
		Type.obj.put = function(o, k, v){ return (o||{})[k] = v, o }
		Type.obj.has = function(o, k){ return o && Object.prototype.hasOwnProperty.call(o, k) }
		Type.obj.del = function(o, k){
			if(!o){ return }
			o[k] = null;
			delete o[k];
			return o;
		}
		Type.obj.as = function(o, k, v, u){ return o[k] = o[k] || (u === v? {} : v) }
		Type.obj.ify = function(o){
			if(obj_is(o)){ return o }
			try{o = JSON.parse(o);
			}catch(e){o={}};
			return o;
		}
		;(function(){ var u;
			function map(v,k){
				if(obj_has(this,k) && u !== this[k]){ return }
				this[k] = v;
			}
			Type.obj.to = function(from, to){
				to = to || {};
				obj_map(from, map, to);
				return to;
			}
		}());
		Type.obj.copy = function(o){ // because http://web.archive.org/web/20140328224025/http://jsperf.com/cloning-an-object/2
			return !o? o : JSON.parse(JSON.stringify(o)); // is shockingly faster than anything else, and our data has to be a subset of JSON anyways!
		}
		;(function(){
			function empty(v,i){ var n = this.n, u;
				if(n && (i === n || (obj_is(n) && obj_has(n, i)))){ return }
				if(u !== i){ return true }
			}
			Type.obj.empty = function(o, n){
				if(!o){ return true }
				return obj_map(o,empty,{n:n})? false : true;
			}
		}());
		;(function(){
			function t(k,v){
				if(2 === arguments.length){
					t.r = t.r || {};
					t.r[k] = v;
					return;
				} t.r = t.r || [];
				t.r.push(k);
			};
			var keys = Object.keys, map, u;
			Object.keys = Object.keys || function(o){ return map(o, function(v,k,t){t(k)}) }
			Type.obj.map = map = function(l, c, _){
				var u, i = 0, x, r, ll, lle, f = 'function' == typeof c;
				t.r = u;
				if(keys && obj_is(l)){
					ll = keys(l); lle = true;
				}
				_ = _ || {};
				if(list_is(l) || ll){
					x = (ll || l).length;
					for(;i < x; i++){
						var ii = (i + Type.list.index);
						if(f){
							r = lle? c.call(_, l[ll[i]], ll[i], t) : c.call(_, l[i], ii, t);
							if(r !== u){ return r }
						} else {
							//if(Type.test.is(c,l[i])){ return ii } // should implement deep equality testing!
							if(c === l[lle? ll[i] : i]){ return ll? ll[i] : ii } // use this for now
						}
					}
				} else {
					for(i in l){
						if(f){
							if(obj_has(l,i)){
								r = _? c.call(_, l[i], i, t) : c(l[i], i, t);
								if(r !== u){ return r }
							}
						} else {
							//if(a.test.is(c,l[i])){ return i } // should implement deep equality testing!
							if(c === l[i]){ return i } // use this for now
						}
					}
				}
				return f? t.r : Type.list.index? 0 : -1;
			}
		}());
		Type.time = {};
		Type.time.is = function(t){ return t? t instanceof Date : (+new Date().getTime()) }

		var fn_is = Type.fn.is;
		var list_is = Type.list.is;
		var obj = Type.obj, obj_is = obj.is, obj_has = obj.has, obj_map = obj.map;
		module.exports = Type;
	})(USE, './type');

	;USE(function(module){
		// On event emitter generic javascript utility.
		module.exports = function onto(tag, arg, as){
			if(!tag){ return {to: onto} }
			var u, tag = (this.tag || (this.tag = {}))[tag] ||
			(this.tag[tag] = {tag: tag, to: onto._ = {
				next: function(arg){ var tmp;
					if((tmp = this.to)){
						tmp.next(arg);
				}}
			}});
			if('function' == typeof arg){
				var be = {
					off: onto.off ||
					(onto.off = function(){
						if(this.next === onto._.next){ return !0 }
						if(this === this.the.last){
							this.the.last = this.back;
						}
						this.to.back = this.back;
						this.next = onto._.next;
						this.back.to = this.to;
						if(this.the.last === this.the){
							delete this.on.tag[this.the.tag];
						}
					}),
					to: onto._,
					next: arg,
					the: tag,
					on: this,
					as: as,
				};
				(be.back = tag.last || tag).to = be;
				return tag.last = be;
			}
			if((tag = tag.to) && u !== arg){ tag.next(arg) }
			return tag;
		};
	})(USE, './onto');

	;USE(function(module){
		var to = (typeof setImmediate !== "undefined")? setImmediate : setTimeout, puff = function(cb){
			if(Q.length){ Q.push(cb); return } Q = [cb];
			to(function go(S){ S = S || +new Date;
				var i = 0, cb; while(i < 9 && (cb = Q[i++])){ cb() }
				console.STAT && console.STAT(S, +new Date - S, 'puff');
				if(cb && !(+new Date - S)){ return go(S) }
				if(!(Q = Q.slice(i)).length){ return }
				to(go, 0);
			}, 0);
		}, Q = [];
		module.exports = setTimeout.puff = puff;
	})(USE, './puff');

	;USE(function(module){
		/* Based on the Hypothetical Amnesia Machine thought experiment */
		function HAM(machineState, incomingState, currentState, incomingValue, currentValue){
			if(machineState < incomingState){
				return {defer: true}; // the incoming value is outside the boundary of the machine's state, it must be reprocessed in another state.
			}
			if(incomingState < currentState){
				return {historical: true}; // the incoming value is within the boundary of the machine's state, but not within the range.

			}
			if(currentState < incomingState){
				return {converge: true, incoming: true}; // the incoming value is within both the boundary and the range of the machine's state.

			}
			if(incomingState === currentState){
				incomingValue = Lexical(incomingValue) || "";
				currentValue = Lexical(currentValue) || "";
				if(incomingValue === currentValue){ // Note: while these are practically the same, the deltas could be technically different
					return {state: true};
				}
				/*
					The following is a naive implementation, but will always work.
					Never change it unless you have specific needs that absolutely require it.
					If changed, your data will diverge unless you guarantee every peer's algorithm has also been changed to be the same.
					As a result, it is highly discouraged to modify despite the fact that it is naive,
					because convergence (data integrity) is generally more important.
					Any difference in this algorithm must be given a new and different name.
				*/
				if(incomingValue < currentValue){ // Lexical only works on simple value types!
					return {converge: true, current: true};
				}
				if(currentValue < incomingValue){ // Lexical only works on simple value types!
					return {converge: true, incoming: true};
				}
			}
			return {err: "Invalid CRDT Data: "+ incomingValue +" to "+ currentValue +" at "+ incomingState +" to "+ currentState +"!"};
		}
		if(typeof JSON === 'undefined'){
			throw new Error(
				'JSON is not included in this browser. Please load it first: ' +
				'ajax.cdnjs.com/ajax/libs/json2/20110223/json2.js'
			);
		}
		var Lexical = JSON.stringify, undefined;
		module.exports = HAM;
	})(USE, './HAM');

	;USE(function(module){
		var Type = USE('./type');
		var Val = {};
		Val.is = function(v){ // Valid values are a subset of JSON: null, binary, number (!Infinity), text, or a soul relation. Arrays need special algorithms to handle concurrency, so they are not supported directly. Use an extension that supports them if needed but research their problems first.
			if(v === u){ return false }
			if(v === null){ return true } // "deletes", nulling out keys.
			if(v === Infinity){ return false } // we want this to be, but JSON does not support it, sad face.
			if(text_is(v) // by "text" we mean strings.
			|| bi_is(v) // by "binary" we mean boolean.
			|| num_is(v)){ // by "number" we mean integers or decimals.
				return true; // simple values are valid.
			}
			return Val.link.is(v) || false; // is the value a soul relation? Then it is valid and return it. If not, everything else remaining is an invalid data type. Custom extensions can be built on top of these primitives to support other types.
		}
		Val.link = Val.rel = {_: '#'};
		;(function(){
			Val.link.is = function(v){ // this defines whether an object is a soul relation or not, they look like this: {'#': 'UUID'}
				if(v && v[rel_] && !v._ && obj_is(v)){ // must be an object.
					var o = {};
					obj_map(v, map, o);
					if(o.id){ // a valid id was found.
						return o.id; // yay! Return it.
					}
				}
				return false; // the value was not a valid soul relation.
			}
			function map(s, k){ var o = this; // map over the object...
				if(o.id){ return o.id = false } // if ID is already defined AND we're still looping through the object, it is considered invalid.
				if(k == rel_ && text_is(s)){ // the key should be '#' and have a text value.
					o.id = s; // we found the soul!
				} else {
					return o.id = false; // if there exists anything else on the object that isn't the soul, then it is considered invalid.
				}
			}
		}());
		Val.link.ify = function(t){ return obj_put({}, rel_, t) } // convert a soul into a relation and return it.
		Type.obj.has._ = '.';
		var rel_ = Val.link._, u;
		var bi_is = Type.bi.is;
		var num_is = Type.num.is;
		var text_is = Type.text.is;
		var obj = Type.obj, obj_is = obj.is, obj_put = obj.put, obj_map = obj.map;
		module.exports = Val;
	})(USE, './val');

	;USE(function(module){
		var Type = USE('./type');
		var Val = USE('./val');
		var Node = {_: '_'};
		Node.soul = function(n, o){ return (n && n._ && n._[o || soul_]) } // convenience function to check to see if there is a soul on a node and return it.
		Node.soul.ify = function(n, o){ // put a soul on an object.
			o = (typeof o === 'string')? {soul: o} : o || {};
			n = n || {}; // make sure it exists.
			n._ = n._ || {}; // make sure meta exists.
			n._[soul_] = o.soul || n._[soul_] || text_random(); // put the soul on it.
			return n;
		}
		Node.soul._ = Val.link._;
		;(function(){
			Node.is = function(n, cb, as){ var s; // checks to see if an object is a valid node.
				if(!obj_is(n)){ return false } // must be an object.
				if(s = Node.soul(n)){ // must have a soul on it.
					return !obj_map(n, map, {as:as,cb:cb,s:s,n:n});
				}
				return false; // nope! This was not a valid node.
			}
			function map(v, k){ // we invert this because the way we check for this is via a negation.
				if(k === Node._){ return } // skip over the metadata.
				if(!Val.is(v)){ return true } // it is true that this is an invalid node.
				if(this.cb){ this.cb.call(this.as, v, k, this.n, this.s) } // optionally callback each key/value.
			}
		}());
		;(function(){
			Node.ify = function(obj, o, as){ // returns a node from a shallow object.
				if(!o){ o = {} }
				else if(typeof o === 'string'){ o = {soul: o} }
				else if('function' == typeof o){ o = {map: o} }
				if(o.map){ o.node = o.map.call(as, obj, u, o.node || {}) }
				if(o.node = Node.soul.ify(o.node || {}, o)){
					obj_map(obj, map, {o:o,as:as});
				}
				return o.node; // This will only be a valid node if the object wasn't already deep!
			}
			function map(v, k){ var o = this.o, tmp, u; // iterate over each key/value.
				if(o.map){
					tmp = o.map.call(this.as, v, ''+k, o.node);
					if(u === tmp){
						obj_del(o.node, k);
					} else
					if(o.node){ o.node[k] = tmp }
					return;
				}
				if(Val.is(v)){
					o.node[k] = v;
				}
			}
		}());
		var obj = Type.obj, obj_is = obj.is, obj_del = obj.del, obj_map = obj.map;
		var text = Type.text, text_random = text.random;
		var soul_ = Node.soul._;
		var u;
		module.exports = Node;
	})(USE, './node');

	;USE(function(module){
		var Type = USE('./type');
		var Node = USE('./node');
		function State(){
			var t;
			/*if(perf){
				t = start + perf.now(); // Danger: Accuracy decays significantly over time, even if precise.
			} else {*/
				t = +new Date;
			//}
			if(last < t){
				return N = 0, last = t + State.drift;
			}
			return last = t + ((N += 1) / D) + State.drift;
		}
		var time = Type.time.is, last = -Infinity, N = 0, D = 1000; // WARNING! In the future, on machines that are D times faster than 2016AD machines, you will want to increase D by another several orders of magnitude so the processing speed never out paces the decimal resolution (increasing an integer effects the state accuracy).
		var perf = (typeof performance !== 'undefined')? (performance.timing && performance) : false, start = (perf && perf.timing && perf.timing.navigationStart) || (perf = false);
		var S_ = State._ = '>';
		State.drift = 0;
		State.is = function(n, k, o){ // convenience function to get the state on a key on a node and return it.
			var tmp = (k && n && n[N_] && n[N_][S_]) || o;
			if(!tmp){ return }
			return num_is(tmp = tmp[k])? tmp : -Infinity;
		}
		State.lex = function(){ return State().toString(36).replace('.','') }
		State.ify = function(n, k, s, v, soul){ // put a key's state on a node.
			if(!n || !n[N_]){ // reject if it is not node-like.
				if(!soul){ // unless they passed a soul
					return;
				}
				n = Node.soul.ify(n, soul); // then make it so!
			}
			var tmp = obj_as(n[N_], S_); // grab the states data.
			if(u !== k && k !== N_){
				if(num_is(s)){
					tmp[k] = s; // add the valid state.
				}
				if(u !== v){ // Note: Not its job to check for valid values!
					n[k] = v;
				}
			}
			return n;
		}
		State.to = function(from, k, to){
			var val = (from||{})[k];
			if(obj_is(val)){
				val = obj_copy(val);
			}
			return State.ify(to, k, State.is(from, k), val, Node.soul(from));
		}
		;(function(){
			State.map = function(cb, s, as){ var u; // for use with Node.ify
				var o = obj_is(o = cb || s)? o : null;
				cb = fn_is(cb = cb || s)? cb : null;
				if(o && !cb){
					s = num_is(s)? s : State();
					o[N_] = o[N_] || {};
					obj_map(o, map, {o:o,s:s});
					return o;
				}
				as = as || obj_is(s)? s : u;
				s = num_is(s)? s : State();
				return function(v, k, o, opt){
					if(!cb){
						map.call({o: o, s: s}, v,k);
						return v;
					}
					cb.call(as || this || {}, v, k, o, opt);
					if(obj_has(o,k) && u === o[k]){ return }
					map.call({o: o, s: s}, v,k);
				}
			}
			function map(v,k){
				if(N_ === k){ return }
				State.ify(this.o, k, this.s) ;
			}
		}());
		var obj = Type.obj, obj_as = obj.as, obj_has = obj.has, obj_is = obj.is, obj_map = obj.map, obj_copy = obj.copy;
		var num = Type.num, num_is = num.is;
		var fn = Type.fn, fn_is = fn.is;
		var N_ = Node._, u;
		module.exports = State;
	})(USE, './state');

	;USE(function(module){
		var Type = USE('./type');
		var Val = USE('./val');
		var Node = USE('./node');
		var Graph = {};
		;(function(){
			Graph.is = function(g, cb, fn, as){ // checks to see if an object is a valid graph.
				if(!g || !obj_is(g) || obj_empty(g)){ return false } // must be an object.
				return !obj_map(g, map, {cb:cb,fn:fn,as:as}); // makes sure it wasn't an empty object.
			}
			function map(n, s){ // we invert this because the way'? we check for this is via a negation.
				if(!n || s !== Node.soul(n) || !Node.is(n, this.fn, this.as)){ return true } // it is true that this is an invalid graph.
				if(!this.cb){ return }
				nf.n = n; nf.as = this.as; // sequential race conditions aren't races.
				this.cb.call(nf.as, n, s, nf);
			}
			function nf(fn){ // optional callback for each node.
				if(fn){ Node.is(nf.n, fn, nf.as) } // where we then have an optional callback for each key/value.
			}
		}());
		;(function(){
			Graph.ify = function(obj, env, as){
				var at = {path: [], obj: obj};
				if(!env){
					env = {};
				} else
				if(typeof env === 'string'){
					env = {soul: env};
				} else
				if('function' == typeof env){
					env.map = env;
				}
				if(typeof as === 'string'){
					env.soul = env.soul || as;
					as = u;
				}
				if(env.soul){
					at.link = Val.link.ify(env.soul);
				}
				env.shell = (as||{}).shell;
				env.graph = env.graph || {};
				env.seen = env.seen || [];
				env.as = env.as || as;
				node(env, at);
				env.root = at.node;
				return env.graph;
			}
			function node(env, at){ var tmp;
				if(tmp = seen(env, at)){ return tmp }
				at.env = env;
				at.soul = soul;
				if(Node.ify(at.obj, map, at)){
					at.link = at.link || Val.link.ify(Node.soul(at.node));
					if(at.obj !== env.shell){
						env.graph[Val.link.is(at.link)] = at.node;
					}
				}
				return at;
			}
			function map(v,k,n){
				var at = this, env = at.env, is, tmp;
				if(Node._ === k && obj_has(v,Val.link._)){
					return n._; // TODO: Bug?
				}
				if(!(is = valid(v,k,n, at,env))){ return }
				if(!k){
					at.node = at.node || n || {};
					if(obj_has(v, Node._) && Node.soul(v)){ // ? for safety ?
						at.node._ = obj_copy(v._);
					}
					at.node = Node.soul.ify(at.node, Val.link.is(at.link));
					at.link = at.link || Val.link.ify(Node.soul(at.node));
				}
				if(tmp = env.map){
					tmp.call(env.as || {}, v,k,n, at);
					if(obj_has(n,k)){
						v = n[k];
						if(u === v){
							obj_del(n, k);
							return;
						}
						if(!(is = valid(v,k,n, at,env))){ return }
					}
				}
				if(!k){ return at.node }
				if(true === is){
					return v;
				}
				tmp = node(env, {obj: v, path: at.path.concat(k)});
				if(!tmp.node){ return }
				return tmp.link; //{'#': Node.soul(tmp.node)};
			}
			function soul(id){ var at = this;
				var prev = Val.link.is(at.link), graph = at.env.graph;
				at.link = at.link || Val.link.ify(id);
				at.link[Val.link._] = id;
				if(at.node && at.node[Node._]){
					at.node[Node._][Val.link._] = id;
				}
				if(obj_has(graph, prev)){
					graph[id] = graph[prev];
					obj_del(graph, prev);
				}
			}
			function valid(v,k,n, at,env){ var tmp;
				if(Val.is(v)){ return true }
				if(obj_is(v)){ return 1 }
				if(tmp = env.invalid){
					v = tmp.call(env.as || {}, v,k,n);
					return valid(v,k,n, at,env);
				}
				env.err = "Invalid value at '" + at.path.concat(k).join('.') + "'!";
				if(Type.list.is(v)){ env.err += " Use `.set(item)` instead of an Array." }
			}
			function seen(env, at){
				var arr = env.seen, i = arr.length, has;
				while(i--){ has = arr[i];
					if(at.obj === has.obj){ return has }
				}
				arr.push(at);
			}
		}());
		Graph.node = function(node){
			var soul = Node.soul(node);
			if(!soul){ return }
			return obj_put({}, soul, node);
		}
		;(function(){
			Graph.to = function(graph, root, opt){
				if(!graph){ return }
				var obj = {};
				opt = opt || {seen: {}};
				obj_map(graph[root], map, {obj:obj, graph: graph, opt: opt});
				return obj;
			}
			function map(v,k){ var tmp, obj;
				if(Node._ === k){
					if(obj_empty(v, Val.link._)){
						return;
					}
					this.obj[k] = obj_copy(v);
					return;
				}
				if(!(tmp = Val.link.is(v))){
					this.obj[k] = v;
					return;
				}
				if(obj = this.opt.seen[tmp]){
					this.obj[k] = obj;
					return;
				}
				this.obj[k] = this.opt.seen[tmp] = Graph.to(this.graph, tmp, this.opt);
			}
		}());
		var fn_is = Type.fn.is;
		var obj = Type.obj, obj_is = obj.is, obj_del = obj.del, obj_has = obj.has, obj_empty = obj.empty, obj_put = obj.put, obj_map = obj.map, obj_copy = obj.copy;
		var u;
		module.exports = Graph;
	})(USE, './graph');

	;USE(function(module){
		// request / response module, for asking and acking messages.
		USE('./onto'); // depends upon onto!
		module.exports = function ask(cb, as){
			if(!this.on){ return }
			if(!('function' == typeof cb)){
				if(!cb || !as){ return }
				var id = cb['#'] || cb, tmp = (this.tag||'')[id];
				if(!tmp){ return }
				tmp = this.on(id, as);
				clearTimeout(tmp.err);
				return true;
			}
			var id = (as && as['#']) || Math.random().toString(36).slice(2);
			if(!cb){ return id }
			var to = this.on(id, cb, as);
			to.err = to.err || setTimeout(function(){
				to.next({err: "Error: No ACK yet.", lack: true});
				to.off();
			}, (this.opt||{}).lack || 9000);
			return id;
		}
	})(USE, './ask');

	;USE(function(module){
		var Type = USE('./type');
		function Dup(opt){
			var dup = {s:{}}, s = dup.s;
			opt = opt || {max: 1000, age: /*1000 * 9};//*/ 1000 * 9 * 3};
			dup.check = function(id){
				if(!s[id]){ return false }
				return dt(id);
			}
			var dt = dup.track = function(id){
				var it = s[id] || (s[id] = {});
				it.was = +new Date;
				if(!dup.to){ dup.to = setTimeout(dup.drop, opt.age + 9) }
				return it;
			}
			dup.drop = function(age){
				var now = +new Date;
				Type.obj.map(s, function(it, id){
					if(it && (age || opt.age) > (now - it.was)){ return }
					delete s[id];
				});
				dup.to = null;
				console.STAT && (age = +new Date - now) > 9 && console.STAT(now, age, 'dup drop');
			}
			return dup;
		}
		module.exports = Dup;
	})(USE, './dup');

	;USE(function(module){

		function Gun(o){
			if(o instanceof Gun){ return (this._ = {$: this}).$ }
			if(!(this instanceof Gun)){ return new Gun(o) }
			return Gun.create(this._ = {$: this, opt: o});
		}

		Gun.is = function($){ return ($ instanceof Gun) || ($ && $._ && ($ === $._.$)) || false }

		Gun.version = 0.2020;

		Gun.chain = Gun.prototype;
		Gun.chain.toJSON = function(){};

		var Type = USE('./type');
		Type.obj.to(Type, Gun);
		Gun.HAM = USE('./HAM');
		Gun.val = USE('./val');
		Gun.node = USE('./node');
		Gun.state = USE('./state');
		Gun.graph = USE('./graph');
		Gun.on = USE('./onto');
		Gun.ask = USE('./ask');
		Gun.dup = USE('./dup');
		Gun.puff = USE('./puff');

		;(function(){
			Gun.create = function(at){
				at.root = at.root || at;
				at.graph = at.graph || {};
				at.on = at.on || Gun.on;
				at.ask = at.ask || Gun.ask;
				at.dup = at.dup || Gun.dup();
				var gun = at.$.opt(at.opt);
				if(!at.once){
					at.on('in', universe, at);
					at.on('out', universe, at);
					at.on('put', map, at);
					Gun.on('create', at);
					at.on('create', at);
				}
				at.once = 1;
				return gun;
			}
			function universe(msg){
				if(!msg){ return }
				if(msg.out === universe){ this.to.next(msg); return }
				var eve = this, as = eve.as, at = as.at || as, gun = at.$, dup = at.dup, tmp, DBG = msg.DBG;
				(tmp = msg['#']) || (tmp = msg['#'] = text_rand(9));
				if(dup.check(tmp)){ return } dup.track(tmp);
				tmp = msg._; msg._ = ('function' == typeof tmp)? tmp : function(){};
				(msg.$ && (msg.$ === (msg.$._||'').$)) || (msg.$ = gun);
				if(!at.ask(msg['@'], msg)){ // is this machine listening for an ack?
					DBG && (DBG.u = +new Date);
					if(msg.get){ Gun.on._get(msg, gun) }
					if(msg.put){ put(msg); return }
				}
				DBG && (DBG.uc = +new Date);
				eve.to.next(msg);
				DBG && (DBG.ua = +new Date);
				msg.out = universe; at.on('out', msg);
				DBG && (DBG.ue = +new Date);
			}
			function put(msg){
				if(!msg){ return }
				var ctx = msg._||'', root = ctx.root = ((ctx.$ = msg.$||'')._||'').root;
				var put = msg.put, id = msg['#'], err, tmp;
				var DBG = ctx.DBG = msg.DBG;
				if(put['#'] && put['.']){ root.on('put', msg); return } // TODO: BUG! This needs to call HAM instead.
				/*root.on(id, function(m){
					console.log('ack:', m);
				});*/
				ctx.out = msg;
				ctx.lot = {s: 0, more: 1};
				var S = +new Date;
				DBG && (DBG.p = S);
				for(var soul in put){ // Gun.obj.native() makes this safe.
					var node = put[soul], states;
					if(!node){ err = ERR+cut(soul)+"no node."; break }
					if(!(tmp = node._)){ err = ERR+cut(soul)+"no meta."; break }
					if(soul !== tmp[_soul]){ err = ERR+cut(soul)+"soul not same."; break }
					if(!(states = tmp[state_])){ err = ERR+cut(soul)+"no state."; break }
					for(var key in node){ // double loop uncool, but have to support old format.
						if(node_ === key){ continue }
						var val = node[key], state = states[key];
						if(u === state){ err = ERR+cut(key)+"on"+cut(soul)+"no state."; break }
						if(!val_is(val)){ err = ERR+cut(key)+"on"+cut(soul)+"bad "+(typeof val)+cut(val); break }
						ham(val, key, soul, state, msg);
					}
					if(err){ break }
				}
				DBG && (DBG.pe = +new Date);
				if(console.STAT){ console.STAT(S, +new Date - S, 'mix');console.STAT(S, ctx.lot.s, 'mix #') }
				if(ctx.err = err){ root.on('in', {'@': id, err: Gun.log(err)}); return }
				if(!(--ctx.lot.more)){ fire(ctx) } // if synchronous.
				if(!ctx.stun && !msg['@']){ root.on('in', {'@': id, ok: -1}) } // in case no diff sent to storage, etc., still ack.
			} Gun.on.put = put;
			function ham(val, key, soul, state, msg){
				var ctx = msg._||'', root = ctx.root, graph = root.graph, lot;
				var vertex = graph[soul] || empty, was = state_is(vertex, key, 1), known = vertex[key];
				var machine = State(), is = HAM(machine, state, was, val, known), u;
				if(!is.incoming){
					if(is.defer){
						var to = state - machine;
						setTimeout(function(){
							ham(val, key, soul, state, msg);
						}, to > MD? MD : to); // setTimeout Max Defer 32bit :(
						if(!ctx.to){ root.on('in', {'@': msg['#'], err: to}) } ctx.to = 1; // TODO: This causes too many problems unless sending peers auto-retry.
						return to;
					}
					//return; // it should be this
					if(!ctx.miss){ return } // but some chains have a cache miss that need to re-fire. // TODO: Improve in future.
				}
				(lot = ctx.lot||'').s++; lot.more++;
				(ctx.stun || (ctx.stun = {}))[soul+key] = 1;
				var DBG = ctx.DBG; DBG && (DBG.ph = DBG.ph || +new Date);
				root.on('put', {'#': msg['#'], '@': msg['@'], put: {'#': soul, '.': key, ':': val, '>': state}, _: ctx});
			}
			function map(msg){
				var DBG; if(DBG = (msg._||'').DBG){ DBG.pa = +new Date; DBG.pm = DBG.pm || +new Date}
      	var eve = this, root = eve.as, graph = root.graph, ctx = msg._, put = msg.put, soul = put['#'], key = put['.'], val = put[':'], state = put['>'], id = msg['#'], tmp;
				graph[soul] = state_ify(graph[soul], key, state, val, soul); // TODO: Only put in graph if subscribed? Relays vs Browsers?
				chain(ctx, soul, key, (u !== (tmp = put['=']))? tmp : val, state); // TODO: This should NOT be how the API works, this should be done at an extension layer, but hacky solution to migrate with old code for now.
				if((tmp = ctx.out) && (tmp = tmp.put)){
					tmp[soul] = state_ify(tmp[soul], key, state, val, soul); // TODO: Hacky, fix & come back later, for actual pushing messages.
				}
				if(!(--ctx.lot.more)){ fire(ctx) } // TODO: 'forget' feature in SEA tied to this, bad approach, but hacked in for now. Any changes here must update there.
				eve.to.next(msg);
			}
			function chain(ctx, soul, key,val, state){
				var root = ctx.root, put, tmp;
				(root.opt||'').super && root.$.get(soul); // I think we need super for now, but since we are rewriting, should consider getting rid of it.
				if(!root || !(tmp = root.next) || !(tmp = tmp[soul]) || !tmp.$){ return }
				(put = ctx.put || (ctx.put = {}))[soul] = state_ify(put[soul], key, state, val, soul);
				tmp.put = state_ify(tmp.put, key, state, val, soul);
			}
			function fire(ctx){
				if(ctx.err){ return }
				var stop = {};
				var root = ((ctx.$||'')._||'').root, next = (root||'').next||'', put = ctx.put, tmp;
				var S = +new Date;
				//Gun.graph.is(put, function(node, soul){
				for(var soul in put){ var node = put[soul]; // Gun.obj.native() makes this safe.
					if(!(tmp = next[soul]) || !tmp.$){ continue }
					root.stop = stop; // temporary fix till a better solution?
					tmp.on('in', {$: tmp.$, get: soul, put: node});
					root.stop = null; // temporary fix till a better solution?
				}
				console.STAT && console.STAT(S, +new Date - S, 'fire');
				ctx.DBG && (ctx.DBG.f = +new Date);
				if(!(tmp = ctx.out)){ return }
				tmp.out = universe;
				root.on('out', tmp);
			}
			var ERR = "Error: Invalid graph!";
			var cut = function(s){ return " '"+(''+s).slice(0,9)+"...' " }
			var HAM = Gun.HAM, MD = 2147483647, State = Gun.state;
		}());

		;(function(){
			Gun.on._put = function(msg, gun){
				var at = gun._, ctx = {$: gun, graph: at.graph, put: {}, map: {}, souls: {}, machine: Gun.state(), ack: msg['@'], cat: at, stop: {}};
				if(!Gun.obj.map(msg.put, perf, ctx)){ return } // HNPERF: performance test, not core code, do not port.
				if(!Gun.graph.is(msg.put, null, verify, ctx)){ ctx.err = "Error: Invalid graph!" }
				if(ctx.err){ return at.on('in', {'@': msg['#'], err: Gun.log(ctx.err) }) }
				obj_map(ctx.put, merge, ctx);
				if(!ctx.async){ obj_map(ctx.map, map, ctx) }
				if(u !== ctx.defer){
					var to = ctx.defer - ctx.machine;
					setTimeout(function(){
						Gun.on._put(msg, gun);
					}, to > MD? MD : to ); // setTimeout Max Defer 32bit :(
				}
				if(!ctx.diff){ return }
				at.on('put', obj_to(msg, {put: ctx.diff}));
			};
			function verify(val, key, node, soul){ var ctx = this;
				var state = Gun.state.is(node, key), tmp;
				if(!state){ return ctx.err = "Error: No state on '"+key+"' in node '"+soul+"'!" }
				var vertex = ctx.graph[soul] || empty, was = Gun.state.is(vertex, key, true), known = vertex[key];
				var HAM = Gun.HAM(ctx.machine, state, was, val, known);
				if(!HAM.incoming){
					if(HAM.defer){ // pick the lowest
						ctx.defer = (state < (ctx.defer || Infinity))? state : ctx.defer;
					}
					return;
				}
				ctx.put[soul] = Gun.state.to(node, key, ctx.put[soul]);
				(ctx.diff || (ctx.diff = {}))[soul] = Gun.state.to(node, key, ctx.diff[soul]);
				ctx.souls[soul] = true;
			}
			function merge(node, soul){
				var ctx = this, cat = ctx.$._, at = (cat.next || empty)[soul];
				if(!at){
					if(!(cat.opt||empty).super){
						ctx.souls[soul] = false;
						return;
					}
					at = (ctx.$.get(soul)._);
				}
				var msg = ctx.map[soul] = {
					put: node,
					get: soul,
					$: at.$
				}, as = {ctx: ctx, msg: msg};
				ctx.async = !!cat.tag.node;
				if(ctx.ack){ msg['@'] = ctx.ack }
				obj_map(node, each, as);
				if(!ctx.async){ return }
				if(!ctx.and){
					// If it is async, we only need to setup one listener per context (ctx)
					cat.on('node', function(m){
						this.to.next(m); // make sure to call other context's listeners.
						if(m !== ctx.map[m.get]){ return } // filter out events not from this context!
						ctx.souls[m.get] = false; // set our many-async flag
						obj_map(m.put, patch, m); // merge into view
						if(obj_map(ctx.souls, function(v){ if(v){ return v } })){ return } // if flag still outstanding, keep waiting.
						if(ctx.c){ return } ctx.c = 1; // failsafe for only being called once per context.
						this.off();
						obj_map(ctx.map, map, ctx); // all done, trigger chains.
					});
				}
				ctx.and = true;
				cat.on('node', msg); // each node on the current context's graph needs to be emitted though.
			}
			function each(val, key){
				var ctx = this.ctx, graph = ctx.graph, msg = this.msg, soul = msg.get, node = msg.put, at = (msg.$._), tmp;
				graph[soul] = Gun.state.to(node, key, graph[soul]);
				if(ctx.async){ return }
				at.put = Gun.state.to(node, key, at.put);
			}
			function patch(val, key){
				var msg = this, node = msg.put, at = (msg.$._);
				at.put = Gun.state.to(node, key, at.put);
			}
			function map(msg, soul){
				if(!msg.$){ return }
				this.cat.stop = this.stop; // temporary fix till a better solution?
				(msg.$._).on('in', msg);
				this.cat.stop = null; // temporary fix till a better solution?
			}
			function perf(node, soul){ if(node !== this.graph[soul]){ return true } } // HNPERF: do not port!

			Gun.on._get = function(msg, gun){
				var root = gun._, get = msg.get, soul = get[_soul], node = root.graph[soul], has = get[_has], tmp;
				var next = root.next || (root.next = {}), at = next[soul];
				// queue concurrent GETs?
				var ctx = msg._||'', DBG = ctx.DBG = msg.DBG;
				DBG && (DBG.g = +new Date);
				if(!node){ return root.on('get', msg) }
				if(has){
					if('string' != typeof has || !obj_has(node, has)){ return root.on('get', msg) }
					node = Gun.state.to(node, has);
					// If we have a key in-memory, do we really need to fetch?
					// Maybe... in case the in-memory key we have is a local write
					// we still need to trigger a pull/merge from peers.
				} else {
					node = Gun.window? Gun.obj.copy(node) : node; // HNPERF: If !browser bump Performance? Is this too dangerous to reference root graph? Copy / shallow copy too expensive for big nodes. Gun.obj.to(node); // 1 layer deep copy // Gun.obj.copy(node); // too slow on big nodes
				}
				node = Gun.graph.node(node);
				tmp = (at||empty).ack;
				var faith = function(){}; faith.ram = faith.faith = true; // HNPERF: We're testing performance improvement by skipping going through security again, but this should be audited.
				faith.$ = msg.$;
				DBG && (DBG.ga = +new Date);
				root.on('in', {
					'@': msg['#'],
					put: node,
					ram: 1,
					$: gun,
					_: faith
				});
				DBG && (DBG.gm = +new Date);
				//if(0 < tmp){ return }
				root.on('get', msg);
				DBG && (DBG.gd = +new Date);
			}
		}());

		;(function(){
			Gun.chain.opt = function(opt){
				opt = opt || {};
				var gun = this, at = gun._, tmp = opt.peers || opt;
				if(!obj_is(opt)){ opt = {} }
				if(!obj_is(at.opt)){ at.opt = opt }
				if(text_is(tmp)){ tmp = [tmp] }
				if(list_is(tmp)){
					tmp = obj_map(tmp, function(url, i, map){
						i = {}; i.id = i.url = url; map(url, i);
					});
					if(!obj_is(at.opt.peers)){ at.opt.peers = {}}
					at.opt.peers = obj_to(tmp, at.opt.peers);
				}
				at.opt.peers = at.opt.peers || {};
				obj_map(opt, function each(v,k){
					if(!obj_has(this, k) || text.is(v) || obj.empty(v)){ this[k] = v ; return }
					if(v && v.constructor !== Object && !list_is(v)){ return }
					obj_map(v, each, this[k]);
				}, at.opt);
				Gun.on('opt', at);
				//at.opt.uuid = at.opt.uuid || function(){ return state_lex() + text_rand(12) }
				Gun.obj.native();
				return gun;
			}
		}());
		Gun.obj.native = function(){ var p = Object.prototype; for(var i in p){ console.log("Native Object.prototype polluted, reverting", i); delete p[i]; } };

		var list_is = Gun.list.is;
		var text = Gun.text, text_is = text.is, text_rand = text.random;
		var obj = Gun.obj, obj_empty = obj.empty, obj_is = obj.is, obj_has = obj.has, obj_to = obj.to, obj_map = obj.map, obj_copy = obj.copy;
		var state_lex = Gun.state.lex, state_ify = Gun.state.ify, state_is = Gun.state.is, _soul = Gun.val.link._, _has = '.', node_ = Gun.node._, val_is = Gun.val.is, rel_is = Gun.val.link.is, state_ = Gun.state._;
		var empty = {}, u;
		var C;

		Gun.log = function(){ return (!Gun.log.off && C.log.apply(C, arguments)), [].slice.call(arguments).join(' ') };
		Gun.log.once = function(w,s,o){ return (o = Gun.log.once)[w] = o[w] || 0, o[w]++ || Gun.log(s) };

		if(typeof window !== "undefined"){ (window.GUN = window.Gun = Gun).window = window }
		try{ if(typeof MODULE !== "undefined"){ MODULE.exports = Gun } }catch(e){}
		module.exports = Gun;

		(Gun.window||'').console = (Gun.window||'').console || {log: function(){}};
		(C = console).only = function(i, s){ return (C.only.i && i === C.only.i && C.only.i++) && (C.log.apply(C, arguments) || s) };

		;"Please do not remove welcome log unless you are paying for a monthly sponsorship, thanks!";
		Gun.log.once("welcome", "Hello wonderful person! :) Thanks for using GUN, please ask for help on http://chat.gun.eco if anything takes you longer than 5min to figure out!");
	})(USE, './root');

	;USE(function(module){
		var Gun = USE('./root');
		Gun.chain.back = function(n, opt){ var tmp;
			n = n || 1;
			if(-1 === n || Infinity === n){
				return this._.root.$;
			} else
			if(1 === n){
				return (this._.back || this._).$;
			}
			var gun = this, at = gun._;
			if(typeof n === 'string'){
				n = n.split('.');
			}
			if(n instanceof Array){
				var i = 0, l = n.length, tmp = at;
				for(i; i < l; i++){
					tmp = (tmp||empty)[n[i]];
				}
				if(u !== tmp){
					return opt? gun : tmp;
				} else
				if((tmp = at.back)){
					return tmp.$.back(n, opt);
				}
				return;
			}
			if('function' == typeof n){
				var yes, tmp = {back: at};
				while((tmp = tmp.back)
				&& u === (yes = n(tmp, opt))){}
				return yes;
			}
			if(Gun.num.is(n)){
				return (at.back || at).$.back(n - 1);
			}
			return this;
		}
		var empty = {}, u;
	})(USE, './back');

	;USE(function(module){
		// WARNING: GUN is very simple, but the JavaScript chaining API around GUN
		// is complicated and was extremely hard to build. If you port GUN to another
		// language, consider implementing an easier API to build.
		var Gun = USE('./root');
		Gun.chain.chain = function(sub){
			var gun = this, at = gun._, chain = new (sub || gun).constructor(gun), cat = chain._, root;
			cat.root = root = at.root;
			cat.id = ++root.once;
			cat.back = gun._;
			cat.on = Gun.on;
			cat.on('in', input, cat); // For 'in' if I add my own listeners to each then I MUST do it before in gets called. If I listen globally for all incoming data instead though, regardless of individual listeners, I can transform the data there and then as well.
			cat.on('out', output, cat); // However for output, there isn't really the global option. I must listen by adding my own listener individually BEFORE this one is ever called.
			return chain;
		}

		function output(msg){
			var put, get, at = this.as, back = at.back, root = at.root, tmp;
			if(!msg.$){ msg.$ = at.$ }
			this.to.next(msg);
			if(get = msg.get){
				/*if(u !== at.put){
					at.on('in', at);
					return;
				}*/
				if(at.lex){ msg.get = obj_to(at.lex, msg.get) }
				if(get['#'] || at.soul){
					get['#'] = get['#'] || at.soul;
					msg['#'] || (msg['#'] = text_rand(9));
					back = (root.$.get(get['#'])._);
					if(!(get = get['.'])){
						tmp = back.ack;
						if(!tmp){ back.ack = -1 }
						if(obj_has(back, 'put')){
							back.on('in', back);
						}
						if(tmp && u !== back.put){ return } //if(tmp){ return }
						msg.$ = back.$;
					} else
					if(obj_has(back.put, get)){ // TODO: support #LEX !
						put = (back.$.get(get)._);
						if(!(tmp = put.ack)){ put.ack = -1 }
						back.on('in', {
							$: back.$,
							put: Gun.state.to(back.put, get),
							get: back.get
						});
						if(tmp){ return }
					} else
					if('string' != typeof get){
						var put = {}, meta = (back.put||{})._;
						Gun.obj.map(back.put, function(v,k){
							if(!Gun.text.match(k, get)){ return }
							put[k] = v;
						})
						if(!Gun.obj.empty(put)){
							put._ = meta;
							back.on('in', {$: back.$, put: put, get: back.get})
						}
						if(tmp = at.lex){
							tmp = (tmp._) || (tmp._ = function(){});
							if(back.ack < tmp.ask){ tmp.ask = back.ack }
							if(tmp.ask){ return }
							tmp.ask = 1;
						}
					}
					root.ask(ack, msg);
					return root.on('in', msg);
				}
				if(root.now){ root.now[at.id] = root.now[at.id] || true; at.pass = {} }
				if(get['.']){
					if(at.get){
						msg = {get: {'.': at.get}, $: at.$};
						//if(back.ask || (back.ask = {})[at.get]){ return }
						(back.ask || (back.ask = {}));
						back.ask[at.get] = msg.$._; // TODO: PERFORMANCE? More elegant way?
						return back.on('out', msg);
					}
					msg = {get: {}, $: at.$};
					return back.on('out', msg);
				}
				at.ack = at.ack || -1;
				if(at.get){
					msg.$ = at.$;
					get['.'] = at.get;
					(back.ask || (back.ask = {}))[at.get] = msg.$._; // TODO: PERFORMANCE? More elegant way?
					return back.on('out', msg);
				}
			}
			return back.on('out', msg);
		}

		function input(msg){
			var eve = this, cat = eve.as, root = cat.root, gun = msg.$, at = (gun||empty)._ || empty, change = msg.put, rel, tmp;
			if(cat.get && msg.get !== cat.get){
				msg = obj_to(msg, {get: cat.get});
			}
			if(cat.has && at !== cat){
				msg = obj_to(msg, {$: cat.$});
				if(at.ack){
					cat.ack = at.ack;
					//cat.ack = cat.ack || at.ack;
				}
			}
			if(u === change){
				tmp = at.put;
				eve.to.next(msg);
				if(cat.soul){ return } // TODO: BUG, I believee the fresh input refactor caught an edge case that a `gun.get('soul').get('key')` that points to a soul that doesn't exist will not trigger val/get etc.
				if(u === tmp && u !== at.put){ return }
				echo(cat, msg, eve);
				if(cat.has){
					not(cat, msg);
				}
				obj_del(at.echo, cat.id);
				obj_del(cat.map, at.id);
				return;
			}
			if(cat.soul){
				eve.to.next(msg);
				echo(cat, msg, eve);
				if(cat.next){ obj_map(change, map, {msg: msg, cat: cat}) }
				return;
			}
			if(!(rel = Gun.val.link.is(change))){
				if(Gun.val.is(change)){
					if(cat.has || cat.soul){
						not(cat, msg);
					} else
					if(at.has || at.soul){
						(at.echo || (at.echo = {}))[cat.id] = at.echo[at.id] || cat;
						(cat.map || (cat.map = {}))[at.id] = cat.map[at.id] || {at: at};
						//if(u === at.put){ return } // Not necessary but improves performance. If we have it but at does not, that means we got things out of order and at will get it. Once at gets it, it will tell us again.
					}
					eve.to.next(msg);
					echo(cat, msg, eve);
					return;
				}
				if(cat.has && at !== cat && obj_has(at, 'put')){
					cat.put = at.put;
				};
				if((rel = Gun.node.soul(change)) && at.has){
					at.put = (cat.root.$.get(rel)._).put;
				}
				tmp = (root.stop || {})[at.id];
				//if(tmp && tmp[cat.id]){ } else {
					eve.to.next(msg);
				//}
				relate(cat, msg, at, rel);
				echo(cat, msg, eve);
				if(cat.next){ obj_map(change, map, {msg: msg, cat: cat}) }
				return;
			}
			var was = root.stop;
			tmp = root.stop || {};
			tmp = tmp[at.id] || (tmp[at.id] = {});
			//if(tmp[cat.id]){ return }
			tmp.is = tmp.is || at.put;
			tmp[cat.id] = at.put || true;
			//if(root.stop){
				eve.to.next(msg)
			//}
			relate(cat, msg, at, rel);
			echo(cat, msg, eve);
		}

		function relate(at, msg, from, rel){
			if(!rel || node_ === at.get){ return }
			var tmp = (at.root.$.get(rel)._);
			if(at.has){
				from = tmp;
			} else
			if(from.has){
				relate(from, msg, from, rel);
			}
			if(from === at){ return }
			if(!from.$){ from = {} }
			(from.echo || (from.echo = {}))[at.id] = from.echo[at.id] || at;
			if(at.has && !(at.map||empty)[from.id]){ // if we haven't seen this before.
				not(at, msg);
			}
			tmp = from.id? ((at.map || (at.map = {}))[from.id] = at.map[from.id] || {at: from}) : {};
			if(rel === tmp.link){
				if(!(tmp.pass || at.pass)){
					return;
				}
			}
			if(at.pass){
				Gun.obj.map(at.map, function(tmp){ tmp.pass = true })
				obj_del(at, 'pass');
			}
			if(tmp.pass){ obj_del(tmp, 'pass') }
			if(at.has){ at.link = rel }
			ask(at, tmp.link = rel);
		}
		function echo(at, msg, ev){
			if(!at.echo){ return } // || node_ === at.get ?
			//if(at.has){ msg = obj_to(msg, {event: ev}) }
			obj_map(at.echo, reverb, msg);
		}
		function reverb(to){
			if(!to || !to.on){ return }
			to.on('in', this);
		}
		function map(data, key){ // Map over only the changes on every update.
			var cat = this.cat, next = cat.next || empty, via = this.msg, chain, at, tmp;
			if(node_ === key && !next[key]){ return }
			if(!(at = next[key])){
				return;
			}
			//if(data && data[_soul] && (tmp = Gun.val.link.is(data)) && (tmp = (cat.root.$.get(tmp)._)) && obj_has(tmp, 'put')){
			//	data = tmp.put;
			//}
			if(at.has){
				//if(!(data && data[_soul] && Gun.val.link.is(data) === Gun.node.soul(at.put))){
				if(u === at.put || !Gun.val.link.is(data)){
					at.put = data;
				}
				chain = at.$;
			} else
			if(tmp = via.$){
				tmp = (chain = via.$.get(key))._;
				if(u === tmp.put || !Gun.val.link.is(data)){
					tmp.put = data;
				}
			}
			at.on('in', {
				put: data,
				get: key,
				$: chain,
				via: via
			});
		}
		function not(at, msg){
			if(!(at.has || at.soul)){ return }
			var tmp = at.map, root = at.root;
			at.map = null;
			if(at.has){
				if(at.dub && at.root.stop){ at.dub = null }
				at.link = null;
			}
			//if(!root.now || !root.now[at.id]){
			if(!at.pass){
				if((!msg['@']) && null === tmp){ return }
				//obj_del(at, 'pass');
			}
			if(u === tmp && Gun.val.link.is(at.put)){ return } // This prevents the very first call of a thing from triggering a "clean up" call. // TODO: link.is(at.put) || !val.is(at.put) ?
			obj_map(tmp, function(proxy){
				if(!(proxy = proxy.at)){ return }
				obj_del(proxy.echo, at.id);
			});
			tmp = at.put;
			obj_map(at.next, function(neat, key){
				if(u === tmp && u !== at.put){ return true }
				neat.put = u;
				if(neat.ack){
					neat.ack = -1; // Shouldn't this be reset to 0? If we do that, SEA test `set user ref should be found` fails, odd.
				}
				neat.on('in', {
					get: key,
					$: neat.$,
					put: u
				});
			});
		}
		function ask(at, soul){
			var tmp = (at.root.$.get(soul)._), lex = at.lex;
			if(at.ack || lex){
				(lex = lex||{})['#'] = soul;
				tmp.on('out', {get: lex});
				if(!at.ask){ return } // TODO: PERFORMANCE? More elegant way?
			}
			tmp = at.ask; Gun.obj.del(at, 'ask');
			obj_map(tmp || at.next, function(neat, key){
				var lex = neat.lex || {}; lex['#'] = soul; lex['.'] = lex['.'] || key;
				neat.on('out', {get: lex});
			});
			Gun.obj.del(at, 'ask'); // TODO: PERFORMANCE? More elegant way?
		}
		function ack(msg, ev){
			var as = this.as, get = as.get||'', at = as.$._, tmp = (msg.put||'')[get['#']];
			if(at.ack){ at.ack = (at.ack + 1) || 1; }
			if(!msg.put || ('string' == typeof get['.'] && !obj_has(tmp, at.get))){
				if(at.put !== u){ return }
				at.on('in', {
					get: at.get,
					put: at.put = u,
					$: at.$,
					'@': msg['@']
				});
				return;
			}
			if(node_ == get['.']){ // is this a security concern?
				at.on('in', {get: at.get, put: Gun.val.link.ify(get['#']), $: at.$, '@': msg['@']});
				return;
			}
			if(at.$ === (msg._||'').$){ // replying to self, for perf, skip ham/security tho needs audit.
				(msg._).miss = (at.put === u);
			}
			Gun.on.put(msg);
		}
		var empty = {}, u;
		var obj = Gun.obj, obj_has = obj.has, obj_put = obj.put, obj_del = obj.del, obj_to = obj.to, obj_map = obj.map;
		var text_rand = Gun.text.random;
		var _soul = Gun.val.link._, node_ = Gun.node._;
	})(USE, './chain');

	;USE(function(module){
		var Gun = USE('./root');
		Gun.chain.get = function(key, cb, as){
			var gun, tmp;
			if(typeof key === 'string'){
			        if(key.length == 0) {
			              (as = this.chain())._.err = {err: Gun.log('Invalid zero length string key!', key)};
			              return null
			        }
				var back = this, cat = back._;
				var next = cat.next || empty;
				if(!(gun = next[key])){
					gun = cache(key, back);
				}
				gun = gun.$;
			} else
			if('function' == typeof key){
				if(true === cb){ return soul(this, key, cb, as), this }
				gun = this;
				var at = gun._, root = at.root, tmp = root.now, ev;
				as = cb || {};
				as.at = at;
				as.use = key;
				as.out = as.out || {};
				as.out.get = as.out.get || {};
				(ev = at.on('in', use, as)).rid = rid;
				(root.now = {$:1})[as.now = at.id] = ev;
				var mum = root.mum; root.mum = {};
				at.on('out', as.out);
				root.mum = mum;
				root.now = tmp;
				return gun;
			} else
			if(num_is(key)){
				return this.get(''+key, cb, as);
			} else
			if(tmp = rel.is(key)){
				return this.get(tmp, cb, as);
			} else
			if(obj.is(key)){
				gun = this;
				if(tmp = ((tmp = key['#'])||empty)['='] || tmp){ gun = gun.get(tmp) }
				gun._.lex = key;
				return gun;
			} else {
				(as = this.chain())._.err = {err: Gun.log('Invalid get request!', key)}; // CLEAN UP
				if(cb){ cb.call(as, as._.err) }
				return as;
			}
			if(tmp = this._.stun){ // TODO: Refactor?
				gun._.stun = gun._.stun || tmp;
			}
			if(cb && 'function' == typeof cb){
				gun.get(cb, as);
			}
			return gun;
		}
		function cache(key, back){
			var cat = back._, next = cat.next, gun = back.chain(), at = gun._;
			if(!next){ next = cat.next = {} }
			next[at.get = key] = at;
			if(back === cat.root.$){
				at.soul = key;
			} else
			if(cat.soul || cat.has){
				at.has = key;
				//if(obj_has(cat.put, key)){
					//at.put = cat.put[key];
				//}
			}
			return at;
		}
		function soul(gun, cb, opt, as){
			var cat = gun._, acks = 0, tmp;
			if(tmp = cat.soul || cat.link || cat.dub){ return cb(tmp, as, cat) }
			if(cat.jam){ return cat.jam.push([cb, as]) }
			cat.jam = [[cb,as]];
			gun.get(function go(msg, eve){
				if(u === msg.put && !cat.root.opt.super && (tmp = Object.keys(cat.root.opt.peers).length) && ++acks <= tmp){ // TODO: super should not be in core code, bring AXE up into core instead to fix?
					return;
				}
				eve.rid(msg);
				var at = ((at = msg.$) && at._) || {}, i = 0, as;
				tmp = cat.jam; delete cat.jam; // tmp = cat.jam.splice(0, 100);
				//if(tmp.length){ process.nextTick(function(){ go(msg, eve) }) }
				while(as = tmp[i++]){ //Gun.obj.map(tmp, function(as, cb){
					var cb = as[0], id; as = as[1];
					cb && cb(id = at.link || at.soul || rel.is(msg.put) || node_soul(msg.put) || at.dub, as, msg, eve);
				} //);
			}, {out: {get: {'.':true}}});
			return gun;
		}
		function use(msg){
			var eve = this, as = eve.as, cat = as.at, root = cat.root, gun = msg.$, at = (gun||{})._ || {}, data = msg.put || at.put, tmp;
			if((tmp = root.now) && eve !== tmp[as.now]){ return eve.to.next(msg) }
			//if(at.async && msg.root){ return }
			//if(at.async === 1 && cat.async !== true){ return }
			//if(root.stop && root.stop[at.id]){ return } root.stop && (root.stop[at.id] = true);
			//if(!at.async && !cat.async && at.put && msg.put === at.put){ return }
			//else if(!cat.async && msg.put !== at.put && root.stop && root.stop[at.id]){ return } root.stop && (root.stop[at.id] = true);


			//root.stop && (root.stop.id = root.stop.id || Gun.text.random(2));
			//if((tmp = root.stop) && (tmp = tmp[at.id] || (tmp[at.id] = {})) && tmp[cat.id]){ return } tmp && (tmp[cat.id] = true);
			if(eve.seen && at.id && eve.seen[at.id]){ return eve.to.next(msg) }
			//if((tmp = root.stop)){ if(tmp[at.id]){ return } tmp[at.id] = msg.root; } // temporary fix till a better solution?
			if((tmp = data) && tmp[rel._] && (tmp = rel.is(tmp))){
				tmp = ((msg.$$ = at.root.$.get(tmp))._);
				if(u !== tmp.put){
					msg = obj_to(msg, {put: data = tmp.put});
				}
			}
			if((tmp = root.mum) && at.id){ // TODO: can we delete mum entirely now?
				var id = at.id + (eve.id || (eve.id = Gun.text.random(9)));
				if(tmp[id]){ return }
				if(u !== data && !rel.is(data)){ tmp[id] = true; }
			}
			as.use(msg, eve);
			if(eve.stun){
				eve.stun = null;
				return;
			}
			eve.to.next(msg);
		}
		function rid(at){
			var cat = this.on;
			if(!at || cat.soul || cat.has){ return this.off() }
			if(!(at = (at = (at = at.$ || at)._ || at).id)){ return }
			var map = cat.map, tmp, seen;
			//if(!map || !(tmp = map[at]) || !(tmp = tmp.at)){ return }
			if(tmp = (seen = this.seen || (this.seen = {}))[at]){ return true }
			seen[at] = true;
			return;
			//tmp.echo[cat.id] = {}; // TODO: Warning: This unsubscribes ALL of this chain's listeners from this link, not just the one callback event.
			//obj.del(map, at); // TODO: Warning: This unsubscribes ALL of this chain's listeners from this link, not just the one callback event.
			return;
		}
		var obj = Gun.obj, obj_map = obj.map, obj_has = obj.has, obj_to = Gun.obj.to;
		var num_is = Gun.num.is;
		var rel = Gun.val.link, node_soul = Gun.node.soul, node_ = Gun.node._;
		var empty = {}, u;
	})(USE, './get');

	;USE(function(module){
		var Gun = USE('./root');
		Gun.chain.put = function(data, cb, as){
			var gun = this, at = (gun._), root = at.root.$, ctx = root._, M = 100, tmp;
			as = as || {};
			as.data = data;
			as.via = as.$ = as.via || as.$ || gun;
			if(typeof cb === 'string'){
				as.soul = cb;
			} else {
				as.ack = as.ack || cb;
			}
			if(at.soul){
				as.soul = at.soul;
			}
			if(as.soul || root === gun){
				if(!obj_is(as.data)){
					(as.ack||noop).call(as, as.out = {err: Gun.log("Data saved to the root level of the graph must be a node (an object), not a", (typeof as.data), 'of "' + as.data + '"!')});
					if(as.res){ as.res() }
					return gun;
				}
				as.soul = as.soul || (as.not = Gun.node.soul(as.data) || (as.via.back('opt.uuid') || Gun.text.random)());
				as.via._.stun = {};
				if(!as.soul){ // polyfill async uuid for SEA
					as.via.back('opt.uuid')(function(err, soul){ // TODO: improve perf without anonymous callback
						if(err){ return Gun.log(err) } // TODO: Handle error!
						(as.ref||as.$).put(as.data, as.soul = soul, as);
					});
					return gun;
				}
				as.$ = root.get(as.soul);
				as.ref = as.$;
				ify(as);
				return gun;
			}
			as.via._.stun = {};
			if(Gun.is(data)){
				data.get(function(soul, o, msg){
					if(!soul){
						delete as.via._.stun;
						return Gun.log("The reference you are saving is a", typeof msg.put, '"'+ msg.put +'", not a node (object)!');
					}
					gun.put(Gun.val.link.ify(soul), cb, as);
				}, true);
				return gun;
			}
			if(at.has && (tmp = Gun.val.link.is(data))){ at.dub = tmp }
			as.ref = as.ref || (root._ === (tmp = at.back))? gun : tmp.$;
			if(as.ref._.soul && Gun.val.is(as.data) && at.get){
				as.data = obj_put({}, at.get, as.data);
				as.ref.put(as.data, as.soul, as);
				return gun;
			}
			as.ref.get(any, true, {as: as});
			if(!as.out){
				// TODO: Perf idea! Make a global lock, that blocks everything while it is on, but if it is on the lock it does the expensive lookup to see if it is a dependent write or not and if not then it proceeds full speed. Meh? For write heavy async apps that would be terrible.
				as.res = as.res || stun; // Gun.on.stun(as.ref); // TODO: BUG! Deal with locking?
				as.$._.stun = as.ref._.stun;
			}
			return gun;
		};
		/*Gun.chain.put = function(data, cb, as){ // don't rewrite! :(
			var gun = this, at = gun._;
			as = as || {};
			as.soul || (as.soul = at.soul || ('string' == typeof cb && cb));
			if(!as.soul){ return get(data, cb, as) }

			return gun;
		}*/

		function ify(as){
			as.batch = batch;
			var opt = as.opt||{}, env = as.env = Gun.state.map(map, opt.state);
			env.soul = as.soul;
			as.graph = Gun.graph.ify(as.data, env, as);
			if(env.err){
				(as.ack||noop).call(as, as.out = {err: Gun.log(env.err)});
				if(as.res){ as.res() }
				return;
			}
			as.batch();
		}

		function stun(cb){
			if(cb){ cb() }
			return;
			var as = this;
			if(!as.ref){ return }
			if(cb){
				as.after = as.ref._.tag;
				as.now = as.ref._.tag = {};
				cb();
				return;
			}
			if(as.after){
				as.ref._.tag = as.after;
			}
		}

		function batch(){ var as = this;
			if(!as.graph || !obj_empty(as.stun)){ return }
			as.res = as.res || function(cb){ if(cb){ cb() } };
			as.res(function(){
				delete as.via._.stun;
				var cat = (as.$.back(-1)._), ask = cat.ask(function(ack){
					cat.root.on('ack', ack);
					if(ack.err){ Gun.log(ack) }
					if(++acks > (as.acks || 0)){ this.off() } // Adjustable ACKs! Only 1 by default.
					if(!as.ack){ return }
					as.ack(ack, this);
					//--C;
				}, as.opt), acks = 0;
				//C++;
				// NOW is a hack to get synchronous replies to correctly call.
				// and STOP is a hack to get async behavior to correctly call.
				// neither of these are ideal, need to be fixed without hacks,
				// but for now, this works for current tests. :/
				var tmp = cat.root.now; obj.del(cat.root, 'now');
				var mum = cat.root.mum; cat.root.mum = {};
				(as.ref._).on('out', {
					$: as.ref, put: as.out = as.env.graph, opt: as.opt, '#': ask
				});
				cat.root.mum = mum? obj.to(mum, cat.root.mum) : mum;
				cat.root.now = tmp;
				as.via._.on('res', {}); delete as.via._.tag.res; // emitting causes mem leak?
			}, as);
			if(as.res){ as.res() }
		} function no(v,k){ if(v){ return true } }

		function map(v,k,n, at){ var as = this;
			var is = Gun.is(v);
			if(k || !at.path.length){ return }
			(as.res||iife)(function(){
				var path = at.path, ref = as.ref, opt = as.opt;
				var i = 0, l = path.length;
				for(i; i < l; i++){
					ref = ref.get(path[i]);
				}
				if(is){ ref = v }
				//if(as.not){ (ref._).dub = Gun.text.random() } // This might optimize stuff? Maybe not needed anymore. Make sure it doesn't introduce bugs.
				var id = (ref._).dub;
				if(id || (id = Gun.node.soul(at.obj))){
					ref.back(-1).get(id);
					at.soul(id);
					return;
				}
				(as.stun = as.stun || {})[path] = 1;
				ref.get(soul, true, {as: {at: at, as: as, p:path, ref: ref}});
			}, {as: as, at: at});
			//if(is){ return {} }
		}
		var G = String.fromCharCode(31);
		function soul(id, as, msg, eve){
			var as = as.as, path = as.p, ref = as.ref, cat = as.at, pat = [], sat; as = as.as;
			ref.back(function(at){
				if(sat = at.soul || at.link || at.dub){ return sat }
				pat.push(at.has || at.get);
			});
			pat = [sat || as.soul].concat(pat.reverse());
			var at = ((msg || {}).$ || {})._ || {};
			id = at.dub = at.dub || id || Gun.node.soul(cat.obj) || Gun.node.soul(msg.put || at.put) || Gun.val.link.is(msg.put || at.put) || pat.join('/') /* || (function(){
				return (as.soul+'.')+Gun.text.hash(path.join(G)).toString(32);
			})(); // TODO: BUG!? Do we really want the soul of the object given to us? Could that be dangerous? What about copy operations? */
			if(eve){ eve.stun = true }
			if(!id){ // polyfill async uuid for SEA
				as.via.back('opt.uuid')(function(err, id){ // TODO: improve perf without anonymous callback
					if(err){ return Gun.log(err) } // TODO: Handle error.
					solve(at, at.dub = at.dub || id, cat, as);
				});
				return;
			}
			solve(at, at.dub = id, cat, as);
		}

		function solve(at, id, cat, as){
			at.$.back(-1).get(id);
			cat.soul(id);
			delete as.stun[cat.path];
			as.batch();
		}

		function any(soul, as, msg, eve){
			as = as.as;
			if(!msg.$ || !msg.$._){ return } // TODO: Handle
			if(msg.err){ // TODO: Handle
				Gun.log("Please report this as an issue! Put.any.err");
				return;
			}
			var at = (msg.$._), data = at.put, opt = as.opt||{}, root, tmp;
			if((tmp = as.ref) && tmp._.now){ return }
			if(eve){ eve.stun = true }
			if(as.ref !== as.$){
				tmp = (as.$._).get || at.get;
				if(!tmp){ // TODO: Handle
					delete as.via._.stun;
					Gun.log("Please report this as an issue! Put.no.get"); // TODO: BUG!??
					return;
				}
				as.data = obj_put({}, tmp, as.data);
				tmp = null;
			}
			if(u === data){
				if(!at.get){ delete as.via._.stun; return } // TODO: Handle
				if(!soul){
					tmp = at.$.back(function(at){
						if(at.link || at.soul){ return at.link || at.soul }
						as.data = obj_put({}, at.get, as.data);
					});
					as.not = true; // maybe consider this?
				}
				tmp = tmp || at.soul || at.link || at.dub;// || at.get;
				at = tmp? (at.root.$.get(tmp)._) : at;
				as.soul = tmp;
				data = as.data;
			}
			if(!as.not && !(as.soul = as.soul || soul)){
				if(as.path && obj_is(as.data)){
					as.soul = (opt.uuid || as.via.back('opt.uuid') || Gun.text.random)();
				} else {
					//as.data = obj_put({}, as.$._.get, as.data);
					if(node_ == at.get){
						as.soul = (at.put||empty)['#'] || at.dub;
					}
					as.soul = as.soul || at.soul || at.link || (opt.uuid || as.via.back('opt.uuid') || Gun.text.random)();
				}
				if(!as.soul){ // polyfill async uuid for SEA
					as.via.back('opt.uuid')(function(err, soul){ // TODO: improve perf without anonymous callback
						if(err){ delete as.via._.stun; return Gun.log(err) } // Handle error.
						as.ref.put(as.data, as.soul = soul, as);
					});
					return;
				}
			}
			as.ref.put(as.data, as.soul, as);
		}
		var obj = Gun.obj, obj_is = obj.is, obj_put = obj.put, obj_map = obj.map, obj_empty = obj.empty;
		var u, empty = {}, noop = function(){}, iife = function(fn,as){fn.call(as||empty)};
		var node_ = Gun.node._;
	})(USE, './put');

	;USE(function(module){
		var Gun = USE('./root');
		USE('./chain');
		USE('./back');
		USE('./put');
		USE('./get');
		module.exports = Gun;
	})(USE, './index');

	;USE(function(module){
		var Gun = USE('./index');
		Gun.chain.on = function(tag, arg, eas, as){
			var gun = this, at = gun._, tmp, act, off;
			if(typeof tag === 'string'){
				if(!arg){ return at.on(tag) }
				act = at.on(tag, arg, eas || at, as);
				if(eas && eas.$){
					(eas.subs || (eas.subs = [])).push(act);
				}
				return gun;
			}
			var opt = arg;
			opt = (true === opt)? {change: true} : opt || {};
			opt.at = at;
			opt.ok = tag;
			//opt.last = {};
			gun.get(ok, opt); // TODO: PERF! Event listener leak!!!?
			return gun;
		}

		function ok(msg, ev){ var opt = this;
			var gun = msg.$, at = (gun||{})._ || {}, data = at.put || msg.put, cat = opt.at, tmp;
			if(u === data){
				return;
			}
			if(tmp = msg.$$){
				tmp = (msg.$$._);
				if(u === tmp.put){
					return;
				}
				data = tmp.put;
			}
			if(opt.change){ // TODO: BUG? Move above the undef checks?
				data = msg.put;
			}
			// DEDUPLICATE // TODO: NEEDS WORK! BAD PROTOTYPE
			//if(tmp.put === data && tmp.get === id && !Gun.node.soul(data)){ return }
			//tmp.put = data;
			//tmp.get = id;
			// DEDUPLICATE // TODO: NEEDS WORK! BAD PROTOTYPE
			//at.last = data;
			if(opt.as){
				opt.ok.call(opt.as, msg, ev);
			} else {
				opt.ok.call(gun, data, msg.get, msg, ev);
			}
		}

		Gun.chain.val = function(cb, opt){
			Gun.log.once("onceval", "Future Breaking API Change: .val -> .once, apologies unexpected.");
			return this.once(cb, opt);
		}
		Gun.chain.once = function(cb, opt){
			var gun = this, at = gun._, data = at.put;
			if(0 < at.ack && u !== data){
				(cb || noop).call(gun, data, at.get);
				return gun;
			}
			if(cb){
				(opt = opt || {}).ok = cb;
				opt.at = at;
				opt.out = {'#': Gun.text.random(9)};
				gun.get(val, {as: opt});
				opt.async = true; //opt.async = at.stun? 1 : true;
			} else {
				Gun.log.once("valonce", "Chainable val is experimental, its behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");
				var chain = gun.chain();
				chain._.nix = gun.once(function(){
					chain._.on('in', gun._);
				});
				return chain;
			}
			return gun;
		}

		function val(msg, eve, to){
			if(!msg.$){ eve.off(); return }
			var opt = this.as, cat = opt.at, gun = msg.$, at = gun._, data = at.put || msg.put, link, tmp;
			if(tmp = msg.$$){
				link = tmp = (msg.$$._);
				if(u !== link.put){
					data = link.put;
				}
			}
			if((tmp = eve.wait) && (tmp = tmp[at.id])){ clearTimeout(tmp) }
			eve.ack = (eve.ack||0)+1;
			// TODO: super should not be in core code, bring AXE up into core instead to fix?
			if(!to && u === data && !at.root.opt.super && eve.ack <= (opt.acks || Object.keys(at.root.opt.peers).length)){ return }
			if((!to && (u === data || at.soul || at.link || (link && !(0 < link.ack))))
			|| (u === data && !at.root.opt.super && (tmp = Object.keys(at.root.opt.peers).length) && (!to && (link||at).ack < tmp))){
				tmp = (eve.wait = {})[at.id] = setTimeout(function(){
					val.call({as:opt}, msg, eve, tmp || 1);
				}, opt.wait || 99);
				return;
			}
			if(link && u === link.put && (tmp = rel.is(data))){ data = Gun.node.ify({}, tmp) }
			eve.rid? eve.rid(msg) : eve.off();
			opt.ok.call(gun || opt.$, data, msg.get);
		}

		Gun.chain.off = function(){
			// make off more aggressive. Warning, it might backfire!
			var gun = this, at = gun._, tmp;
			var cat = at.back;
			if(!cat){ return }
			at.ack = 0; // so can resubscribe.
			if(tmp = cat.next){
				if(tmp[at.get]){
					obj_del(tmp, at.get);
				} else {

				}
			}
			if(tmp = cat.ask){
				obj_del(tmp, at.get);
			}
			if(tmp = cat.put){
				obj_del(tmp, at.get);
			}
			if(tmp = at.soul){
				obj_del(cat.root.graph, tmp);
			}
			if(tmp = at.map){
				obj_map(tmp, function(at){
					if(at.link){
						cat.root.$.get(at.link).off();
					}
				});
			}
			if(tmp = at.next){
				obj_map(tmp, function(neat){
					neat.$.off();
				});
			}
			at.on('off', {});
			return gun;
		}
		var obj = Gun.obj, obj_map = obj.map, obj_has = obj.has, obj_del = obj.del, obj_to = obj.to;
		var rel = Gun.val.link;
		var empty = {}, noop = function(){}, u;
	})(USE, './on');

	;USE(function(module){
		var Gun = USE('./index');
		Gun.chain.map = function(cb, opt, t){
			var gun = this, cat = gun._, chain;
			if(!cb){
				if(chain = cat.each){ return chain }
				cat.each = chain = gun.chain();
				chain._.nix = gun.back('nix');
				gun.on('in', map, chain._);
				return chain;
			}
			Gun.log.once("mapfn", "Map functions are experimental, their behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");
			chain = gun.chain();
			gun.map().on(function(data, key, at, ev){
				var next = (cb||noop).call(this, data, key, at, ev);
				if(u === next){ return }
				if(data === next){ return chain._.on('in', at) }
				if(Gun.is(next)){ return chain._.on('in', next._) }
				chain._.on('in', {get: key, put: next});
			});
			return chain;
		}
		function map(msg){
			if(!msg.put || Gun.val.is(msg.put)){ return this.to.next(msg) }
			if(this.as.nix){ this.off() } // TODO: Ugly hack!
			obj_map(msg.put, each, {at: this.as, msg: msg});
			this.to.next(msg);
		}
		function each(v,k){
			if(n_ === k){ return }
			var msg = this.msg, gun = msg.$, at = gun._, cat = this.at, tmp = at.lex;
			if(tmp && !Gun.text.match(k, tmp['.'] || tmp['#'] || tmp)){ return } // review?
			((tmp = gun.get(k)._).echo || (tmp.echo = {}))[cat.id] = tmp.echo[cat.id] || cat;
		}
		var obj_map = Gun.obj.map, noop = function(){}, event = {stun: noop, off: noop}, n_ = Gun.node._, u;
	})(USE, './map');

	;USE(function(module){
		var Gun = USE('./index');
		Gun.chain.set = function(item, cb, opt){
			var gun = this, soul;
			cb = cb || function(){};
			opt = opt || {}; opt.item = opt.item || item;
			if(soul = Gun.node.soul(item)){ item = Gun.obj.put({}, soul, Gun.val.link.ify(soul)) }
			if(!Gun.is(item)){
				if(Gun.obj.is(item)){
					//item = gun.back(-1).get(soul = soul || Gun.node.soul(item) || (gun.back('opt.uuid') || uuid)()).put(item);
					soul = soul || Gun.node.soul(item) || uuid(); // this just key now, not a soul.
				}
				return gun.get(soul || uuid()).put(item, cb, opt);
			}
			item.get(function(soul, o, msg){
				if(!soul && item._.stun){ item._.on('res', function(){ this.off(); gun.set(item, cb, opt) }); return }
				if(!soul){ return cb.call(gun, {err: Gun.log('Only a node can be linked! Not "' + msg.put + '"!')}) }
				gun.put(Gun.obj.put({}, soul, Gun.val.link.ify(soul)), cb, opt);
			},true);
			return item;
		}
		function uuid(){ return Gun.state.lex() + Gun.text.random(7) }
	})(USE, './set');

	;USE(function(module){
		if(typeof Gun === 'undefined'){ return } // TODO: localStorage is Browser only. But it would be nice if it could somehow plugin into NodeJS compatible localStorage APIs?

		var root, noop = function(){}, store, u;
		try{store = (Gun.window||noop).localStorage}catch(e){}
		if(!store){
			Gun.log("Warning: No localStorage exists to persist data to!");
			store = {setItem: function(k,v){this[k]=v}, removeItem: function(k){delete this[k]}, getItem: function(k){return this[k]}};
		}
		/*
			NOTE: Both `lib/file.js` and `lib/memdisk.js` are based on this design!
			If you update anything here, consider updating the other adapters as well.
		*/

		Gun.on('create', function(root){
			// This code is used to queue offline writes for resync.
			// See the next 'opt' code below for actual saving of data.
			var ev = this.to, opt = root.opt;
			if(root.once){ return ev.next(root) }
			if(false === opt.localStorage){ return ev.next(root) } // we want offline resynce queue regardless! // actually, this doesn't help, per @go1dfish 's observation. Disabling for now, will need better solution later.
			opt.prefix = opt.file || 'gun/';
			var gap = Gun.obj.ify(store.getItem('gap/'+opt.prefix)) || {};
			var empty = Gun.obj.empty, id, to, go;
			// add re-sync command.
			if(!empty(gap)){
				var disk = Gun.obj.ify(store.getItem(opt.prefix)) || {}, send = {};
				Gun.obj.map(gap, function(node, soul){
					Gun.obj.map(node, function(val, key){
						send[soul] = Gun.state.to(disk[soul], key, send[soul]);
					});
				});
				setTimeout(function(){
					// TODO: Holy Grail dangling by this thread! If gap / offline resync doesn't trigger, it doesn't work. Ouch, and this is a localStorage specific adapter. :(
					root.on('out', {put: send, '#': root.ask(ack)});
				},1);
			}

			root.on('out', function(msg){
				if(msg.lS){ return } // TODO: for IndexedDB and others, shouldn't send to peers ACKs to our own GETs. // THIS IS BLOCKING BROWSERS REPLYING TO REQUESTS, NO??? CHANGE THIS SOON!! UNDER CONTROLLED CIRCUMSTANCES!! Or maybe in-memory already doe sit?
				if(Gun.is(msg.$) && msg.put && !msg['@']){
					id = msg['#'];
					Gun.graph.is(msg.put, null, map);
					if(!to){ to = setTimeout(flush, opt.wait || 1) }
				}
				this.to.next(msg);
			});
			root.on('ack', ack);

			function ack(ack){ // TODO: This is experimental, not sure if we should keep this type of event hook.
				if(ack.err || !ack.ok){ return }
				var id = ack['@'];
				setTimeout(function(){
					Gun.obj.map(gap, function(node, soul){
						Gun.obj.map(node, function(val, key){
							if(id !== val){ return }
							delete node[key];
						});
						if(empty(node)){
							delete gap[soul];
						}
					});
					flush();
				}, opt.wait || 1);
			};
			ev.next(root);

			var map = function(val, key, node, soul){
				(gap[soul] || (gap[soul] = {}))[key] = id;
			}
			var flush = function(){
				clearTimeout(to);
				to = false;
				try{store.setItem('gap/'+opt.prefix, JSON.stringify(gap));
				}catch(e){ Gun.log(err = e || "localStorage failure") }
			}
		});

		Gun.on('create', function(root){
			this.to.next(root);
			var opt = root.opt;
			if(root.once){ return }
			if(false === opt.localStorage){ return }
			opt.prefix = opt.file || 'gun/';
			var graph = root.graph, acks = {}, count = 0, to;
			var disk = Gun.obj.ify(store.getItem(opt.prefix)) || {};
			var lS = function(){}, u;
			root.on('localStorage', disk); // NON-STANDARD EVENT!

			root.on('put', function(msg){
				this.to.next(msg);
				var put = msg.put, soul = put['#'], key = put['.'], val = put[':'], state = put['>'], tmp;
				disk[soul] = Gun.state.ify(disk[soul], key, state, val, soul);
				if(!msg['@']){ (acks[msg['#']] = (tmp = (msg._||'').lot || {})).lS = (tmp.lS||0)+1; } // only ack non-acks.
				count += 1;
				if(count >= (opt.batch || 1000)){
					return flush();
				}
				if(to){ return }
				to = setTimeout(flush, opt.wait || 1);
			});

			root.on('get', function(msg){
				this.to.next(msg);
				var lex = msg.get, soul, data, u;
				function to(){
				if(!lex || !(soul = lex['#'])){ return }
				//if(0 >= msg.cap){ return }
				var has = lex['.'];
				data = disk[soul] || u;
				if(data && has){
					data = Gun.state.to(data, has);
				}
				//if(!data && !Gun.obj.empty(opt.peers)){ return } // if data not found, don't ack if there are peers. // Hmm, what if we have peers but we are disconnected?
				root.on('in', {'@': msg['#'], put: Gun.graph.node(data), lS:1});// || root.$});
				};
				Gun.debug? setTimeout(to,1) : to();
			});

			var map = function(val, key, node, soul){
				disk[soul] = Gun.state.to(node, key, disk[soul]);
			}

			var flush = function(data){
				var err;
				count = 0;
				clearTimeout(to);
				to = false;
				var ack = acks;
				acks = {};
				if(data){ disk = data }
				try{store.setItem(opt.prefix, JSON.stringify(disk));
				}catch(e){
					Gun.log(err = (e || "localStorage failure") + " Consider using GUN's IndexedDB plugin for RAD for more storage space, https://gun.eco/docs/RAD#install");
					root.on('localStorage:error', {err: err, file: opt.prefix, flush: disk, retry: flush});
				}
				if(!err && !Gun.obj.empty(opt.peers)){ return } // only ack if there are no peers.
				Gun.obj.map(ack, function(yes, id){
					if(yes){
						if(yes.more){ acks[id] = yes; return }
						if(yes.s !== yes.lS){ err = "localStorage batch not same." }
					}
					root.on('in', {
						'@': id,
						err: err,
						ok: 0 // localStorage isn't reliable, so make its `ok` code be a low number.
					});
				});
			}
		});
	})(USE, './adapters/localStorage');

	;USE(function(module){
		var Type = USE('../type');

		function Mesh(root){
			var mesh = function(){};
			var opt = root.opt || {};
			opt.log = opt.log || console.log;
			opt.gap = opt.gap || opt.wait || 0;
			opt.pack = opt.pack || (opt.memory? (opt.memory * 1000 * 1000) : 1399000000) * 0.3; // max_old_space_size defaults to 1400 MB.
			opt.puff = opt.puff || 9; // IDEA: do a start/end benchmark, divide ops/result.
			var puff = setTimeout.puff || setTimeout;

			var dup = root.dup, dup_check = dup.check, dup_track = dup.track;

			var hear = mesh.hear = function(raw, peer){
				if(!raw){ return }
				if(opt.pack <= raw.length){ return mesh.say({dam: '!', err: "Message too big!"}, peer) }
				var msg, id, hash, tmp = raw[0], DBG;
				if(mesh === this){ hear.d += raw.length||0 ; ++hear.c } // STATS!
				if('[' === tmp){
					try{msg = JSON.parse(raw)}catch(e){opt.log('DAM JSON parse error', e)}
					raw = '';
					if(!msg){ return }
					console.STAT && console.STAT(+new Date, msg.length, '# on hear batch');
					var P = opt.puff;
					(function go(){
						var S = +new Date;
						//var P = peer.puff || opt.puff, s = +new Date; // TODO: For future, but in mix?
						var i = 0, m; while(i < P && (m = msg[i++])){ hear(m, peer) }
						//peer.puff = Math.ceil((+new Date - s)? P * 1.1 : P * 0.9);
						msg = msg.slice(i); // slicing after is faster than shifting during.
						console.STAT && console.STAT(S, +new Date - S, 'hear loop');
						flush(peer); // force send all synchronously batched acks.
						if(!msg.length){ return }
						puff(go, 0);
					}());
					return;
				}
				if('{' === tmp || ((raw['#'] || obj_is(raw)) && (msg = raw))){
					try{msg = msg || JSON.parse(raw);
					}catch(e){return opt.log('DAM JSON parse error', e)}
					if(!msg){ return }
					if(msg.DBG){ msg.DBG = DBG = {DBG: msg.DBG} }
					DBG && (DBG.hp = +new Date);
					if(!(id = msg['#'])){ id = msg['#'] = Type.text.random(9) }
					if(tmp = dup_check(id)){ return }
					/*if(!(hash = msg['##']) && u !== msg.put){ hash = msg['##'] = Type.obj.hash(msg.put) }
					if(hash && (tmp = msg['@'] || (msg.get && id))){ // Reduces backward daisy in case varying hashes at different daisy depths are the same.
						if(dup.check(tmp+hash)){ return }
						dup.track(tmp+hash, true).it = it(msg); // GUN core also dedups, so `true` is needed. // Does GUN core need to dedup anymore?
					}
					if(tmp = msg['><']){ (msg._).to = Type.obj.map(tmp.split(','), tomap) }
					*/ // TOOD: COME BACK TO THIS LATER!!! IMPORTANT MESH STUFF!!
					(msg._ = function(){}).via = mesh.leap = peer;
					if(tmp = msg.dam){
						if(tmp = mesh.hear[tmp]){
							tmp(msg, peer, root);
						}
						dup_track(id);
						return;
					}
					var S = +new Date, ST;
					DBG && (DBG.is = S);
					root.on('in', msg);
					//ECHO = msg.put || ECHO; !(msg.ok !== -3740) && mesh.say({ok: -3740, put: ECHO, '@': msg['#']}, peer);
					DBG && (DBG.hd = +new Date);
					console.STAT && (ST = +new Date - S) > 9 && console.STAT(S, ST, 'msg'); // TODO: PERF: caught one > 1.5s on tgif
					dup_track(id).via = peer;
					mesh.leap = null; // warning! mesh.leap could be buggy.
				}
			}
			var tomap = function(k,i,m){m(k,true)};
			var noop = function(){};
			hear.c = hear.d = 0;

			;(function(){
				var SMIA = 0;
				var message, loop;
				function each(peer){ mesh.say(message, peer) }
				var say = mesh.say = function(msg, peer){ var tmp;
					if((tmp = this) && (tmp = tmp.to) && tmp.next){ tmp.next(msg) } // compatible with middleware adapters.
					if(!msg){ return false }
					var id, hash, raw;
					var DBG = msg.DBG, S; if(!peer){ S = +new Date ; DBG && (DBG.y = S) }
					var meta = msg._||(msg._=function(){});
					if(!(id = msg['#'])){ id = msg['#'] = Type.text.random(9) }
					//if(!(hash = msg['##']) && u !== msg.put){ hash = msg['##'] = Type.obj.hash(msg.put) }
					if(!(raw = meta.raw)){
						raw = mesh.raw(msg);
						/*if(hash && (tmp = msg['@'])){
							dup.track(tmp+hash).it = it(msg);
							if(tmp = (dup.s[tmp]||ok).it){
								if(hash === tmp['##']){ return false }
								tmp['##'] = hash;
							}
						}*/
					}
					S && console.STAT && console.STAT(S, +new Date - S, 'say prep');
					!loop && dup_track(id);//.it = it(msg); // track for 9 seconds, default. Earth<->Mars would need more! // always track, maybe move this to the 'after' logic if we split function.
					//console.log("SEND!", JSON.parse(JSON.stringify(msg)));
					if(!peer && (tmp = msg['@'])){ peer = ((tmp = dup.s[tmp]) && (tmp.via || ((tmp = tmp.it) && (tmp = tmp._) && tmp.via))) || mesh.leap } // warning! mesh.leap could be buggy!
					if(!peer && msg['@']){
						console.STAT && console.STAT(+new Date, ++SMIA, 'total no peer to ack to');
						return false;
					} // TODO: Temporary? If ack via trace has been lost, acks will go to all peers, which trashes browser bandwidth. Not relaying the ack will force sender to ask for ack again. Note, this is technically wrong for mesh behavior.
					if(!peer && mesh.way){ return mesh.way(msg) }
					if(!peer || !peer.id){ message = msg;
						if(!Type.obj.is(peer || opt.peers)){ return false }
						var P = opt.puff, ps = opt.peers, pl = Object.keys(peer || opt.peers || {}); // TODO: BETTER PERF? No object.keys? It is polyfilled by Type.js tho.
						;(function go(){
							var S = +new Date;
							//Type.obj.map(peer || opt.peers, each); // in case peer is a peer list.
							loop = 1; var wr = meta.raw; meta.raw = raw; // quick perf hack
							var i = 0, p; while(i < 9 && (p = (pl||'')[i++])){
								if(!(p = ps[p])){ continue }
								say(msg, p);
							}
							meta.raw = wr; loop = 0;
							pl = pl.slice(i); // slicing after is faster than shifting during.
							console.STAT && console.STAT(S, +new Date - S, 'say loop');
							if(!pl.length){ return }
							puff(go, 0);
							dup_track(msg['@']); // keep for later
						}());
						return;
					}
					// TODO: PERF: consider splitting function here, so say loops do less work.
					if(!peer.wire && mesh.wire){ mesh.wire(peer) }
					if(id === peer.last){ return } peer.last = id;  // was it just sent?
					if(peer === meta.via){ return false } // don't send back to self.
					if((tmp = meta.to) && (tmp[peer.url] || tmp[peer.pid] || tmp[peer.id]) /*&& !o*/){ return false }
					if(peer.batch){
						peer.tail = (tmp = peer.tail || 0) + raw.length;
						if(peer.tail <= opt.pack){
							//peer.batch.push(raw);
							peer.batch += (tmp?',':'')+raw; // TODO: Prevent double JSON! // FOR v1.0 !?
							return;
						}
						flush(peer);
					}
					//peer.batch = [];
					peer.batch = '['; // TODO: Prevent double JSON!
					var S = +new Date, ST;
					setTimeout(function(){
						console.STAT && (ST = +new Date - S) > 9 && console.STAT(S, ST, '0ms TO', id, peer.id);
						flush(peer);
					}, opt.gap);
					send(raw, peer);
				}
				mesh.say.c = mesh.say.d = 0;
			}());

			function flush(peer){
				var tmp = peer.batch, t = 'string' == typeof tmp, l;
				if(t){ tmp += ']' }// TODO: Prevent double JSON!
				peer.batch = peer.tail = null;
				if(!tmp){ return }
				if(t? 3 > tmp.length : !tmp.length){ return } // TODO: ^
				if(!t){try{tmp = (1 === tmp.length? tmp[0] : JSON.stringify(tmp));
				}catch(e){return opt.log('DAM JSON stringify error', e)}}
				if(!tmp){ return }
				send(tmp, peer);
			}
			// for now - find better place later.
			function send(raw, peer){ try{
				var wire = peer.wire;
				if(peer.say){
					peer.say(raw);
				} else
				if(wire.send){
					wire.send(raw);
				}
				mesh.say.d += raw.length||0; ++mesh.say.c; // STATS!
			}catch(e){
				(peer.queue = peer.queue || []).push(raw);
			}}

			;(function(){
				// TODO: this caused a out-of-memory crash!
				mesh.raw = function(msg){ // TODO: Clean this up / delete it / move logic out!
					if(!msg){ return '' }
					var meta = (msg._) || {}, put, hash, tmp;
					if(tmp = meta.raw){ return tmp }
					if('string' == typeof msg){ return msg }
					/*if(!msg.dam){ // TOOD: COME BACK TO THIS LATER!!! IMPORTANT MESH STUFF!!
						var i = 0, to = []; Type.obj.map(opt.peers, function(p){
							to.push(p.url || p.pid || p.id); if(++i > 3){ return true } // limit server, fast fix, improve later! // For "tower" peer, MUST include 6 surrounding ids. // REDUCED THIS TO 3 for temporary relay peer performance, towers still should list neighbors.
						}); if(i > 1){ msg['><'] = to.join() }
					}*/  // TOOD: COME BACK TO THIS LATER!!! IMPORTANT MESH STUFF!!
					var raw = $(msg); // optimize by reusing put = the JSON.stringify from .hash?
					/*if(u !== put){
						tmp = raw.indexOf(_, raw.indexOf('put'));
						raw = raw.slice(0, tmp-1) + put + raw.slice(tmp + _.length + 1);
						//raw = raw.replace('"'+ _ +'"', put); // NEVER USE THIS! ALSO NEVER DELETE IT TO NOT MAKE SAME MISTAKE! https://github.com/amark/gun/wiki/@$$ Heisenbug
					}*/
					// TODO: PERF: tgif, CPU way too much on re-JSONifying ^ it.
					/*
						// NOTE TO SELF: Switch NTS to DAM now.
					*/
					if(meta && (raw||'').length < (1000 * 100)){ meta.raw = raw } // HNPERF: If string too big, don't keep in memory.
					return raw;
				}
				var $ = JSON.stringify, _ = ':])([:';

			}());

			mesh.hi = function(peer){
				var tmp = peer.wire || {};
				if(peer.id){
					opt.peers[peer.url || peer.id] = peer;
				} else {
					tmp = peer.id = peer.id || Type.text.random(9);
					mesh.say({dam: '?', pid: root.opt.pid}, opt.peers[tmp] = peer);
					delete dup.s[peer.last]; // IMPORTANT: see https://gun.eco/docs/DAM#self
				}
				peer.met = peer.met || +(new Date);
				if(!tmp.hied){ root.on(tmp.hied = 'hi', peer) }
				// @rogowski I need this here by default for now to fix go1dfish's bug
				tmp = peer.queue; peer.queue = [];
				Type.obj.map(tmp, function(msg){
					send(msg, peer);
				});
				Type.obj.native && Type.obj.native(); // dirty place to check if other JS polluted.
			}
			mesh.bye = function(peer){
				root.on('bye', peer);
				var tmp = +(new Date); tmp = (tmp - (peer.met||tmp));
				mesh.bye.time = ((mesh.bye.time || tmp) + tmp) / 2;
			}
			mesh.hear['!'] = function(msg, peer){ opt.log('Error:', msg.err) }
			mesh.hear['?'] = function(msg, peer){
				if(msg.pid){
					if(!peer.pid){ peer.pid = msg.pid }
					if(msg['@']){ return }
				}
				mesh.say({dam: '?', pid: opt.pid, '@': msg['#']}, peer);
				delete dup.s[peer.last]; // IMPORTANT: see https://gun.eco/docs/DAM#self
			}

			root.on('create', function(root){
				root.opt.pid = root.opt.pid || Type.text.random(9);
				this.to.next(root);
				root.on('out', mesh.say);
			});

			root.on('bye', function(peer, tmp){
				peer = opt.peers[peer.id || peer] || peer;
				this.to.next(peer);
				peer.bye? peer.bye() : (tmp = peer.wire) && tmp.close && tmp.close();
				Type.obj.del(opt.peers, peer.id);
				peer.wire = null;
			});

			var gets = {};
			root.on('bye', function(peer, tmp){ this.to.next(peer);
				if(!(tmp = peer.url)){ return } gets[tmp] = true;
				setTimeout(function(){ delete gets[tmp] },opt.lack || 9000);
			});
			root.on('hi', function(peer, tmp){ this.to.next(peer);
				if(!(tmp = peer.url) || !gets[tmp]){ return } delete gets[tmp];
				if(opt.super){ return } // temporary (?) until we have better fix/solution?
				Type.obj.map(root.next, function(node, soul){
					tmp = {}; tmp[soul] = root.graph[soul];
					mesh.say({'##': Type.obj.hash(tmp), get: {'#': soul}}, peer);
				})
			});

			return mesh;
		}

		;(function(){
			var $ = JSON.stringify, u;

			Type.obj.hash = function(obj, hash){
				if(!hash && u === (obj = $(obj, sort))){ return }
				return Type.text.hash(hash || obj || '');
			}

			function sort(k, v){ var tmp;
				if(!(v instanceof Object)){ return v }
				var S = +new Date;
				Type.obj.map(Object.keys(v).sort(), map, {to: tmp = {}, on: v});
				console.STAT && console.STAT(S, +new Date - S, 'sort');
				return tmp;
			}
			Type.obj.hash.sort = sort;

			function map(k){
				this.to[k] = this.on[k];
			}
		}());

		function it(msg){ return msg || {_: msg._, '##': msg['##']} } // HNPERF: Only need some meta data, not full reference (took up too much memory). // HNPERF: Garrrgh! We add meta data to msg over time, copying the object happens to early.

	  var empty = {}, ok = true, u;
		var obj_is = Type.obj.is, obj_map = Type.obj.map;

	  try{ module.exports = Mesh }catch(e){}

	})(USE, './adapters/mesh');

	;USE(function(module){
		var Gun = USE('../index');
		Gun.Mesh = USE('./mesh');

		Gun.on('opt', function(root){
			this.to.next(root);
			var opt = root.opt;
			if(root.once){ return }
			if(false === opt.WebSocket){ return }

			var env;
			if(typeof window !== "undefined"){ env = window }
			if(typeof global !== "undefined"){ env = global }
			env = env || {};

			var websocket = opt.WebSocket || env.WebSocket || env.webkitWebSocket || env.mozWebSocket;
			if(!websocket){ return }
			opt.WebSocket = websocket;

			var mesh = opt.mesh = opt.mesh || Gun.Mesh(root);

			var wire = mesh.wire || opt.wire;
			mesh.wire = opt.wire = open;
			function open(peer){ try{
				if(!peer || !peer.url){ return wire && wire(peer) }
				var url = peer.url.replace(/^http/, 'ws');
				var wire = peer.wire = new opt.WebSocket(url);
				wire.onclose = function(){
					opt.mesh.bye(peer);
					reconnect(peer);
				};
				wire.onerror = function(error){
					reconnect(peer);
				};
				wire.onopen = function(){
					opt.mesh.hi(peer);
				}
				wire.onmessage = function(msg){
					if(!msg){ return }
					opt.mesh.hear(msg.data || msg, peer);
				};
				return wire;
			}catch(e){}}

			setTimeout(function(){ root.on('out', {dam:'hi'}) },1); // it can take a while to open a socket, so maybe no longer lazy load for perf reasons?

			var wait = 2 * 1000;
			function reconnect(peer){
				clearTimeout(peer.defer);
				if(doc && peer.retry <= 0){ return } peer.retry = (peer.retry || opt.retry || 60) - 1;
				peer.defer = setTimeout(function to(){
					if(doc && doc.hidden){ return setTimeout(to,wait) }
					open(peer);
				}, wait);
			}
			var doc = 'undefined' !== typeof document && document;
		});
		var noop = function(){};
	})(USE, './adapters/websocket');

}());

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../libs/ng-gun/node_modules/webpack/buildin/module.js */ "YuTi")(module)))

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
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gun */ "U+kO");
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ng-gun/src/lib/ng-gun.service */ "bluq");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");








class DiagnosticsService {
    constructor(ngGun, dialog, logger) {
        this.ngGun = ngGun;
        this.dialog = dialog;
        this.logger = logger;
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
            this.ngGun.gun.opt({
                peers,
            });
        });
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
DiagnosticsService.ɵfac = function DiagnosticsService_Factory(t) { return new (t || DiagnosticsService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_5__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_log_src_lib_log_service__WEBPACK_IMPORTED_MODULE_2__["LogService"])); };
DiagnosticsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: DiagnosticsService, factory: DiagnosticsService.ɵfac, providedIn: 'root' });


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
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gun */ "U+kO");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _functions_gun_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../functions/gun-utils */ "GT5q");







const GUN_NODE = Symbol('GUN_NODE');
class GunChain {
    constructor(ngZone, gun) {
        this.ngZone = ngZone;
        this.isNested = false;
        this.certificate$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.certificates = {};
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
        var _a;
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
                const recordPath = pathFromRecord.splice(firstPub).reverse();
                pathFromRecord.reverse();
                if (myKey === this.recordPub) {
                    // console.log('sub root', myKey);
                }
                else {
                    // console.log('foreign key', myKey);
                    const keyInRecord = pathFromRecord[0];
                    const record = chainArray[firstPub];
                    // console.log('record', record);
                    this.record = record;
                    const recordCerts = record.get('certs');
                    const pathCerts = recordCerts.get(keyInRecord);
                    const searchKeys = [userPair.pub, '*'];
                    const myCert = pathCerts.get(userPair.pub);
                    myCert.not(() => {
                        // console.log('no cert found');
                        pathCerts.get('*').once((pubCert) => {
                            if (!pubCert) {
                                // console.warn('no public cert found either');
                            }
                            this.certificate = pubCert;
                            this.certificate$.next(pubCert);
                        });
                    });
                    // console.log('  %s', keyInRecord);
                    myCert.once((cert) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                        if (cert === null || cert === undefined) {
                            console.log('no user cert found, checking for public cert');
                            return;
                        }
                        // console.log('cert', cert);
                        // TODO verify cert later, the await causes chained put() calls to fail
                        // const verified = await SEA.verify(
                        //   cert,
                        //   this.recordPub.replace('~', '')
                        // );
                        this.certificate = cert;
                        this.certificate$.next(cert);
                        // console.log(
                        //   'verified cert for %s.%s',
                        //   this.recordPub,
                        //   keyInRecord,
                        //   pathFromRecord.join('.')
                        // );
                    }));
                }
            }
        }
    }
    get canEdit() {
        return this.certificate !== null && this.certificate !== undefined;
    }
    from(gun) {
        return new GunChain(this.ngZone, gun);
    }
    get(key) {
        const soul = this.getSoul(key);
        return this.from(this.gun.get(soul));
    }
    put(data, certificate = this.certificate) {
        // FIXME "unverified data" - certified put values must be signed?
        if (this.isNested && !certificate) {
            console.warn('NO CERTIFICATE FOUND FOR FOREIGN RECORD!');
        }
        this.gun.put(data, (...putAck) => {
            console.log('putAck', putAck);
        }, certificate ? { opt: { cert: certificate } } : undefined);
        return this;
    }
    set(data, certificate = this.certificate) {
        var _a;
        if (this.isNested && !certificate) {
            console.warn('NO CERTIFICATE FOUND FOR FOREIGN RECORD!');
            (_a = this.record) === null || _a === void 0 ? void 0 : _a.get('certs').load((certs) => {
                console.log('all certs:', certs);
            });
        }
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
            this.gun.user().recall({ sessionStorage: true }), this);
        }
        return this._auth;
    }
    user(pubKey) {
        return this.from(this.gun.user(pubKey === null || pubKey === void 0 ? void 0 : pubKey.replace(/^~/, '')));
    }
    onEvent(event, node = this.gun) {
        if (!this.sources.has(event)) {
            const source = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEventPattern"])((handler) => {
                // console.log('add handler');
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
GunChain.ɵfac = function GunChain_Factory(t) { return new (t || GunChain)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](GUN_NODE, 8)); };
GunChain.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GunChain, factory: GunChain.ɵfac });
/** Represents a top-level authenticated node (user or key pair) */
let GunAuthChain = class GunAuthChain extends GunChain {
    constructor(ngZone, gun, root) {
        super(ngZone, gun);
        this.root = root;
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
        return new GunAuthChain(this.ngZone, gun, this.root);
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
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["SkipSelf"])())
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
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gun */ "U+kO");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ng_gun_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ng-gun.service */ "bluq");





class RouteChainDirective {
    constructor(route, ngGun, dataKey = 'chain') {
        this.route = route;
        this.ngGun = ngGun;
        this.dataKey = dataKey;
        this.chain$ = this.route.data.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((data) => {
            const d = data[this.dataKey];
            const soul = gun__WEBPACK_IMPORTED_MODULE_1__["node"].soul(d);
            // console.log('route data', this.dataKey);
            return this.ngGun.auth().root.get(soul);
        }));
        this.data$ = this.chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["switchMap"])((chain) => chain.once()));
        this.data$.subscribe((data) => console.log({ data }));
    }
}
RouteChainDirective.ɵfac = function RouteChainDirective_Factory(t) { return new (t || RouteChainDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ng_gun_service__WEBPACK_IMPORTED_MODULE_4__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"]('gun-route-data-key', 8)); };
RouteChainDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({ type: RouteChainDirective, selectors: [["", "libRouteGun", ""]], outputs: { chain$: "chain$", data$: "data$" } });


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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");








class NgGunModule {
}
NgGunModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: NgGunModule });
NgGunModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ factory: function NgGunModule_Factory(t) { return new (t || NgGunModule)(); }, providers: [{ provide: 'gun-route-data-key', useValue: 'chain' }] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](NgGunModule, { declarations: [_ng_gun_component__WEBPACK_IMPORTED_MODULE_2__["NgGunComponent"],
        _soul_pipe__WEBPACK_IMPORTED_MODULE_3__["SoulPipe"],
        _updated_pipe__WEBPACK_IMPORTED_MODULE_4__["UpdatedPipe"],
        _chain_directive__WEBPACK_IMPORTED_MODULE_1__["ChainDirective"],
        _alias_pipe__WEBPACK_IMPORTED_MODULE_0__["AliasPipe"],
        _verify_pipe__WEBPACK_IMPORTED_MODULE_5__["VerifyPipe"],
        _route_chain_directive__WEBPACK_IMPORTED_MODULE_6__["RouteChainDirective"]], exports: [_ng_gun_component__WEBPACK_IMPORTED_MODULE_2__["NgGunComponent"],
        _soul_pipe__WEBPACK_IMPORTED_MODULE_3__["SoulPipe"],
        _updated_pipe__WEBPACK_IMPORTED_MODULE_4__["UpdatedPipe"],
        _chain_directive__WEBPACK_IMPORTED_MODULE_1__["ChainDirective"],
        _alias_pipe__WEBPACK_IMPORTED_MODULE_0__["AliasPipe"],
        _verify_pipe__WEBPACK_IMPORTED_MODULE_5__["VerifyPipe"],
        _route_chain_directive__WEBPACK_IMPORTED_MODULE_6__["RouteChainDirective"]] }); })();


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
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gun */ "U+kO");
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