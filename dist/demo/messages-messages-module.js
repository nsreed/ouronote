(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["messages-messages-module"],{

/***/ "+Hl8":
/*!*******************************************************************!*\
  !*** ./projects/demo/src/app/user/messages/messages.component.ts ***!
  \*******************************************************************/
/*! exports provided: MessagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesComponent", function() { return MessagesComponent; });
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gun */ "U+kO");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user.service */ "DlYp");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./message.service */ "7Ikh");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ng_gun_src_lib_soul_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/soul.pipe */ "FlTl");







const _c0 = function (a1) { return ["/user/messages/", a1]; };
const _c1 = function (a1) { return ["/user/messages/", a1, "edit"]; };
function MessagesComponent_ng_container_6_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "input", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "soul");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "soul");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "button", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MessagesComponent_ng_container_6_ng_container_1_Template_button_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5); const message_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r3.onMessageRemove(message_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Remove");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const message_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](7, _c0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 3, message_r1)));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](message_r1.text);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](9, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](7, 5, message_r1)));
} }
function MessagesComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MessagesComponent_ng_container_6_ng_container_1_Template, 11, 11, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const message_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", message_r1 && message_r1._);
} }
class MessagesComponent {
    constructor(userService, messageService) {
        this.userService = userService;
        this.messageService = messageService;
        this.inbox = this.messageService.messages.reduce();
    }
    ngOnInit() { }
    onMessageClick() {
        this.messageService.messages.set({
            text: 'hello',
        });
    }
    onMessageRemove(message) {
        if (gun__WEBPACK_IMPORTED_MODULE_0__["node"].is(message)) {
            console.log('removing message', message);
            this.messageService.messages
                .get(message)
                .once()
                .subscribe((togo) => {
                console.log('found removed message', togo);
            });
        }
        this.messageService.messages
            .unset(message)
            .once()
            .subscribe((r) => {
            console.log('done removing message', r);
        });
    }
    onMessageUpdate(message) {
        console.log('updating', message);
        this.messageService.messages
            .get(gun__WEBPACK_IMPORTED_MODULE_0__["node"].soul(message))
            .put({ text: 'another update' })
            .once()
            .subscribe((m) => {
            console.log('would update', m);
        });
        // this.messageService.messages.get(message).put({
        //   text: 'updated',
        // });
    }
}
MessagesComponent.ɵfac = function MessagesComponent_Factory(t) { return new (t || MessagesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"])); };
MessagesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MessagesComponent, selectors: [["app-messages"]], decls: 9, vars: 3, consts: [[3, "click"], ["id", "Messages", 1, "list"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["type", "checkbox"], [3, "routerLink"]], template: function MessagesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Messages");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MessagesComponent_Template_button_click_3_listener() { return ctx.onMessageClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "New Message");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, MessagesComponent_ng_container_6_Template, 2, 1, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "router-outlet");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](7, 1, ctx.inbox));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLink"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"], _ng_gun_src_lib_soul_pipe__WEBPACK_IMPORTED_MODULE_6__["SoulPipe"]], styles: ["#Messages[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: -webkit-min-content auto -webkit-max-content -webkit-max-content;\n  grid-template-columns: min-content auto max-content max-content;\n  column-gap: 2em;\n  row-gap: 0.75em;\n  flex-shrink: 1;\n  flex-grow: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21lc3NhZ2VzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLHVGQUFBO0VBQUEsK0RBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FBQ0YiLCJmaWxlIjoibWVzc2FnZXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjTWVzc2FnZXMge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbi1jb250ZW50IGF1dG8gbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQ7XG4gIGNvbHVtbi1nYXA6IDJlbTtcbiAgcm93LWdhcDogMC43NWVtO1xuICBmbGV4LXNocmluazogMTtcbiAgZmxleC1ncm93OiAwO1xufVxuIl19 */"] });


/***/ }),

/***/ "7Ikh":
/*!****************************************************************!*\
  !*** ./projects/demo/src/app/user/messages/message.service.ts ***!
  \****************************************************************/
/*! exports provided: MessageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageService", function() { return MessageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "DlYp");


class MessageService {
    constructor(userService) {
        this.userService = userService;
        this.messages = this.userService.user.get('messages');
    }
}
MessageService.ɵfac = function MessageService_Factory(t) { return new (t || MessageService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"])); };
MessageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MessageService, factory: MessageService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "CNue":
/*!************************************************************************************!*\
  !*** ./projects/demo/src/app/user/messages/edit-message/edit-message.component.ts ***!
  \************************************************************************************/
/*! exports provided: EditMessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditMessageComponent", function() { return EditMessageComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _route_message_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../route-message.directive */ "bmD0");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gun */ "U+kO");
/* harmony import */ var gun__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(gun__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../message.service */ "7Ikh");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../ng-gun/src/lib/ng-gun.service */ "bluq");
/* harmony import */ var _ng_gun_src_lib_ng_sea_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../ng-gun/src/lib/ng-sea.service */ "mWLu");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/core */ "FKr1");















function EditMessageComponent_mat_option_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx_r1.user.alias);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", ctx_r1.user.alias, " ", ctx_r1.user.pub, "");
} }
class EditMessageComponent extends _route_message_directive__WEBPACK_IMPORTED_MODULE_2__["RouteMessageDirective"] {
    constructor(messageService, route, ngGun, fb, ngSea) {
        super(messageService, route);
        this.ngGun = ngGun;
        this.fb = fb;
        this.ngSea = ngSea;
        this.userSearch = this.fb.control(null);
        this.user = null;
        this.messageForm = this.fb.group({
            text: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required],
        });
        this.message$.subscribe((m) => {
            console.log('got message', m);
            this.messageForm.patchValue(m, { onlySelf: true, emitEvent: false });
        });
        this.messageForm.valueChanges.subscribe((vc) => {
            this.message$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)).subscribe((m) => {
                this.messageService.messages.get(m).put(vc);
            });
        });
        this.userSearch.valueChanges.subscribe((alias) => {
            this.user = null;
            if (this.userSearch.invalid) {
                return;
            }
            // console.log('should search for', alias);
            this.ngGun.findAlias(alias).subscribe((found) => {
                // console.log('found user', found);
                if (!found) {
                    return;
                }
                const foundPub = Object.keys(found).find((k) => k !== '_');
                this.user = {
                    alias,
                    pub: foundPub,
                };
            });
        });
    }
    ngOnInit() { }
    onSelectUser(event) {
        const addPubKey = event.option.value;
        console.log('selected', addPubKey);
        this.ngGun
            .user(addPubKey.replace(/^~/, ''))
            .once()
            .subscribe((user) => {
            console.log('adding user', user.alias, user.pub);
            const epub = user.epub;
            const me = this.ngGun.auth().is.alias; // FIXME I think this will break when not recall()ing a session
            console.log('I am', me);
            const certificants = [user.pub];
            const messageSoul = gun__WEBPACK_IMPORTED_MODULE_3__["node"].soul(this.message);
            const policies = `^${messageSoul}*`;
            const authority = me;
            this.ngSea
                .certify(certificants, policies, authority)
                .subscribe((certificate) => {
                console.log('generated certificate', certificate);
                this.chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)).subscribe((chain) => {
                    console.log('chain', chain);
                    // chain
                    //   .get('certificates' as never)
                    //   .get(user.pub)
                    //   .put(certificate as never);
                    // chain
                    //   .get('certificates' as never)
                    //   .once()
                    //   .subscribe((cs: any) => console.log('all certs', cs));
                });
            });
        });
        // this.message$.subscribe((mn) => {
        //   console.log('updating', mn);
        // // });
        // this.messageService.messages.get()
    }
}
EditMessageComponent.ɵfac = function EditMessageComponent_Factory(t) { return new (t || EditMessageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_message_service__WEBPACK_IMPORTED_MODULE_5__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ng_gun_src_lib_ng_gun_service__WEBPACK_IMPORTED_MODULE_7__["NgGunService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ng_gun_src_lib_ng_sea_service__WEBPACK_IMPORTED_MODULE_8__["NgSeaService"])); };
EditMessageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: EditMessageComponent, selectors: [["ng-component"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 10, vars: 4, consts: [[3, "formGroup"], ["formControlName", "text"], ["matInput", "", 3, "formControl", "matAutocomplete"], [3, "optionSelected"], ["auto", "matAutocomplete"], [3, "value", 4, "ngIf"], [3, "value"]], template: function EditMessageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "textarea", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Search for user");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "mat-autocomplete", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("optionSelected", function EditMessageComponent_Template_mat_autocomplete_optionSelected_7_listener($event) { return ctx.onSelectUser($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, EditMessageComponent_mat_option_9_Template, 2, 3, "mat-option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.messageForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formControl", ctx.userSearch)("matAutocomplete", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.user);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_10__["MatInput"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_11__["MatAutocompleteTrigger"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlDirective"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_11__["MatAutocomplete"], _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgIf"], _angular_material_core__WEBPACK_IMPORTED_MODULE_13__["MatOption"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlZGl0LW1lc3NhZ2UuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "KVij":
/*!************************************************************************!*\
  !*** ./projects/demo/src/app/user/messages/messages-routing.module.ts ***!
  \************************************************************************/
/*! exports provided: MessagesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesRoutingModule", function() { return MessagesRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _messages_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./messages.component */ "+Hl8");
/* harmony import */ var _message_message_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./message/message.component */ "zGfO");
/* harmony import */ var _message_resolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./message.resolver */ "Yr3b");
/* harmony import */ var _edit_message_edit_message_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit-message/edit-message.component */ "CNue");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    {
        path: '',
        component: _messages_component__WEBPACK_IMPORTED_MODULE_1__["MessagesComponent"],
        children: [],
    },
    {
        path: ':soul',
        component: _message_message_component__WEBPACK_IMPORTED_MODULE_2__["MessageComponent"],
        resolve: {
            message: _message_resolver__WEBPACK_IMPORTED_MODULE_3__["MessageResolver"],
        },
    },
    {
        path: ':soul/edit',
        component: _edit_message_edit_message_component__WEBPACK_IMPORTED_MODULE_4__["EditMessageComponent"],
        resolve: {
            message: _message_resolver__WEBPACK_IMPORTED_MODULE_3__["MessageResolver"],
        },
    },
];
class MessagesRoutingModule {
}
MessagesRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: MessagesRoutingModule });
MessagesRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ factory: function MessagesRoutingModule_Factory(t) { return new (t || MessagesRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](MessagesRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "Yr3b":
/*!*****************************************************************!*\
  !*** ./projects/demo/src/app/user/messages/message.resolver.ts ***!
  \*****************************************************************/
/*! exports provided: MessageResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageResolver", function() { return MessageResolver; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user.service */ "DlYp");



class MessageResolver {
    constructor(userService) {
        this.userService = userService;
    }
    resolve(route, state) {
        return this.userService.user
            .get('messages')
            .get(route.params.soul)
            .once()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((message) => message._));
    }
}
MessageResolver.ɵfac = function MessageResolver_Factory(t) { return new (t || MessageResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"])); };
MessageResolver.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: MessageResolver, factory: MessageResolver.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "bmD0":
/*!************************************************************************!*\
  !*** ./projects/demo/src/app/user/messages/route-message.directive.ts ***!
  \************************************************************************/
/*! exports provided: RouteMessageDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteMessageDirective", function() { return RouteMessageDirective; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./message.service */ "7Ikh");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");




class RouteMessageDirective {
    constructor(messageService, route) {
        this.messageService = messageService;
        this.route = route;
        this.chain$ = this.route.data.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((data) => this.messageService.messages.get(data.message)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])((chain) => (this.chain = chain)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["shareReplay"])(1));
        this.message$ = this.chain$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["switchMap"])((chain) => chain.on()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])((message) => (this.message = message)));
        // this.route.data.subscribe((d) => console.log('route data', d));
        // this.message.subscribe((m) => console.log('got message', m));
    }
}
RouteMessageDirective.ɵfac = function RouteMessageDirective_Factory(t) { return new (t || RouteMessageDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_message_service__WEBPACK_IMPORTED_MODULE_2__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"])); };
RouteMessageDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: RouteMessageDirective, selectors: [["", "appRouteMessage", ""]] });


/***/ }),

/***/ "zGfO":
/*!**************************************************************************!*\
  !*** ./projects/demo/src/app/user/messages/message/message.component.ts ***!
  \**************************************************************************/
/*! exports provided: MessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageComponent", function() { return MessageComponent; });
/* harmony import */ var _route_message_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../route-message.directive */ "bmD0");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");



class MessageComponent extends _route_message_directive__WEBPACK_IMPORTED_MODULE_0__["RouteMessageDirective"] {
    ngOnInit() { }
}
MessageComponent.ɵfac = function MessageComponent_Factory(t) { return ɵMessageComponent_BaseFactory(t || MessageComponent); };
MessageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MessageComponent, selectors: [["ng-component"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 6, vars: 6, template: function MessageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "section");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        let tmp_0_0 = null;
        let tmp_1_0 = null;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Message ", (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 2, ctx.message$)) == null ? null : tmp_0_0._["#"], "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", (tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 4, ctx.message$)) == null ? null : tmp_1_0.text, "\n");
    } }, pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtZXNzYWdlLmNvbXBvbmVudC5zY3NzIn0= */"] });
const ɵMessageComponent_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](MessageComponent);


/***/ }),

/***/ "zkYC":
/*!****************************************************************!*\
  !*** ./projects/demo/src/app/user/messages/messages.module.ts ***!
  \****************************************************************/
/*! exports provided: MessagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesModule", function() { return MessagesModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _messages_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./messages-routing.module */ "KVij");
/* harmony import */ var _messages_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./messages.component */ "+Hl8");
/* harmony import */ var _message_message_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./message/message.component */ "zGfO");
/* harmony import */ var _route_message_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./route-message.directive */ "bmD0");
/* harmony import */ var _edit_message_edit_message_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./edit-message/edit-message.component */ "CNue");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ng_gun_src_lib_ng_gun_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../ng-gun/src/lib/ng-gun.module */ "xcn7");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ "fXoL");













class MessagesModule {
}
MessagesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({ type: MessagesModule });
MessagesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({ factory: function MessagesModule_Factory(t) { return new (t || MessagesModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _messages_routing_module__WEBPACK_IMPORTED_MODULE_1__["MessagesRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
            _ng_gun_src_lib_ng_gun_module__WEBPACK_IMPORTED_MODULE_7__["NgGunModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatFormFieldModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_11__["MatAutocompleteModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](MessagesModule, { declarations: [_messages_component__WEBPACK_IMPORTED_MODULE_2__["MessagesComponent"],
        _message_message_component__WEBPACK_IMPORTED_MODULE_3__["MessageComponent"],
        _route_message_directive__WEBPACK_IMPORTED_MODULE_4__["RouteMessageDirective"],
        _edit_message_edit_message_component__WEBPACK_IMPORTED_MODULE_5__["EditMessageComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _messages_routing_module__WEBPACK_IMPORTED_MODULE_1__["MessagesRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
        _ng_gun_src_lib_ng_gun_module__WEBPACK_IMPORTED_MODULE_7__["NgGunModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__["MatFormFieldModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_11__["MatAutocompleteModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=messages-messages-module.js.map