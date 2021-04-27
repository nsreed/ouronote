(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('log', ['exports', '@angular/core', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.log = {}, global.ng.core, global.rxjs.operators));
}(this, (function (exports, i0, operators) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    exports.LogLevel = void 0;
    (function (LogLevel) {
        LogLevel[LogLevel["VERBOSE"] = 0] = "VERBOSE";
        LogLevel[LogLevel["INFO"] = 1] = "INFO";
        LogLevel[LogLevel["WARN"] = 2] = "WARN";
        LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    })(exports.LogLevel || (exports.LogLevel = {}));
    var LogService = /** @class */ (function () {
        function LogService(name, parent) {
            var _this = this;
            if (name === void 0) { name = 'app'; }
            this.name = name;
            this.parent = parent;
            this._out$ = new i0.EventEmitter();
            this.out$ = this._out$;
            this.outSub = this.out$.subscribe(function (m) {
                if (_this.parent) {
                    _this.parent._out$.emit(m);
                }
                else {
                    console.log('%s %s %s %s', m.name, new Date(m.timestamp).toISOString(), m.message, JSON.stringify(m.args));
                }
            });
            this.level = exports.LogLevel.INFO;
            this.supplementals = new Map();
            this.name = this.name || 'app';
            if (this.name !== 'root' && !parent) {
                this.parent = LogService.root;
            }
        }
        LogService.getLogger = function (name) {
            return new LogService(name);
        };
        LogService.prototype.verbose = function (message) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var packed = this.buildMessage(exports.LogLevel.VERBOSE, message, args);
            this._out$.emit(packed);
        };
        LogService.prototype.log = function (message) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var packed = this.buildMessage(exports.LogLevel.INFO, message, args);
            this._out$.emit(packed);
        };
        LogService.prototype.warn = function (message) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var packed = this.buildMessage(exports.LogLevel.WARN, message, args);
            this._out$.emit(packed);
        };
        LogService.prototype.error = function (message) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var packed = this.buildMessage(exports.LogLevel.ERROR, message, args);
            this._out$.emit(packed);
        };
        LogService.prototype.supplemental = function (name) {
            if (!this.supplementals.has(name)) {
                var supplementalLog = new LogService(name, this);
                // supplementalLog.out$.subscribe((msg) => {
                //   console.log('supplemental message', msg);
                //   this._out$.emit(msg);
                // });
                this.supplementals.set(name, supplementalLog);
            }
            return this.supplementals.get(name);
        };
        LogService.prototype.buildMessage = function (level, message, args) {
            return {
                level: level,
                message: message,
                args: args,
                timestamp: Date.now(),
                name: this.name,
            };
        };
        return LogService;
    }());
    LogService.root = new LogService('root');
    LogService.buffer$ = LogService.root.out$.pipe(operators.scan(function (acc, val) {
        acc.push(val);
        if (acc.length > 1000) {
            acc.shift();
        }
        return acc;
    }, []), operators.shareReplay(1));
    LogService.ɵfac = function LogService_Factory(t) { return new (t || LogService)(i0__namespace.ɵɵinject('log-name', 8), i0__namespace.ɵɵinject(LogService, 12)); };
    LogService.ɵprov = i0__namespace.ɵɵdefineInjectable({ token: LogService, factory: LogService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(LogService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: ['log-name']
                        }] }, { type: LogService, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.SkipSelf
                        }] }];
        }, null);
    })();

    var LogComponent = /** @class */ (function () {
        function LogComponent() {
        }
        LogComponent.prototype.ngOnInit = function () {
        };
        return LogComponent;
    }());
    LogComponent.ɵfac = function LogComponent_Factory(t) { return new (t || LogComponent)(); };
    LogComponent.ɵcmp = i0__namespace.ɵɵdefineComponent({ type: LogComponent, selectors: [["lib-log"]], decls: 2, vars: 0, template: function LogComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵelementStart(0, "p");
                i0__namespace.ɵɵtext(1, " log works! ");
                i0__namespace.ɵɵelementEnd();
            }
        }, encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(LogComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-log',
                        template: "\n    <p>\n      log works!\n    </p>\n  ",
                        styles: []
                    }]
            }], function () { return []; }, null);
    })();

    var LogModule = /** @class */ (function () {
        function LogModule() {
        }
        return LogModule;
    }());
    LogModule.ɵmod = i0__namespace.ɵɵdefineNgModule({ type: LogModule });
    LogModule.ɵinj = i0__namespace.ɵɵdefineInjector({ factory: function LogModule_Factory(t) { return new (t || LogModule)(); }, imports: [[]] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(LogModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [],
                        imports: [],
                        exports: [],
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of log
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.LogComponent = LogComponent;
    exports.LogModule = LogModule;
    exports.LogService = LogService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=log.umd.js.map
