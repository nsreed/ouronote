import * as i0 from '@angular/core';
import { EventEmitter, Injectable, Optional, Inject, SkipSelf, Component, NgModule } from '@angular/core';
import { scan, shareReplay } from 'rxjs/operators';

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
        this._out$ = new EventEmitter();
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
LogService.buffer$ = LogService.root.out$.pipe(scan((acc, val) => {
    acc.push(val);
    if (acc.length > 1000) {
        acc.shift();
    }
    return acc;
}, []), shareReplay(1));
LogService.ɵfac = function LogService_Factory(t) { return new (t || LogService)(i0.ɵɵinject('log-name', 8), i0.ɵɵinject(LogService, 12)); };
LogService.ɵprov = i0.ɵɵdefineInjectable({ token: LogService, factory: LogService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LogService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: ['log-name']
            }] }, { type: LogService, decorators: [{
                type: Optional
            }, {
                type: SkipSelf
            }] }]; }, null); })();

class LogComponent {
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

class LogModule {
}
LogModule.ɵmod = i0.ɵɵdefineNgModule({ type: LogModule });
LogModule.ɵinj = i0.ɵɵdefineInjector({ factory: function LogModule_Factory(t) { return new (t || LogModule)(); }, imports: [[]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LogModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [],
                exports: [],
            }]
    }], null, null); })();

/*
 * Public API Surface of log
 */

/**
 * Generated bundle index. Do not edit.
 */

export { LogComponent, LogLevel, LogModule, LogService };
//# sourceMappingURL=log.js.map
