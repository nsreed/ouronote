import * as i0 from '@angular/core';
import { Injectable, Optional, Inject, Component, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { shareReplay, scan } from 'rxjs/operators';

var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["VERBOSE"] = 0] = "VERBOSE";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel || (LogLevel = {}));
class LogService {
    constructor(name = 'app') {
        this.name = name;
        this.level = LogLevel.INFO;
        this.supplementals = new Map();
        this.name = this.name || 'app';
        // LogService.out$.subscribe((p) => console.log(p.message, ...p.args));
        LogService.buffer$.subscribe((buffered) => { });
    }
    log(message, ...args) {
        const packed = this.buildMessage(LogLevel.INFO, message, args);
        LogService._out$.next(packed);
    }
    warn(message, ...args) {
        const packed = this.buildMessage(LogLevel.WARN, message, args);
        LogService._out$.next(packed);
    }
    error(message, ...args) {
        const packed = this.buildMessage(LogLevel.ERROR, message, args);
        LogService._out$.next(packed);
    }
    supplemental(name) {
        if (!this.supplementals.has(name)) {
            this.supplementals.set(name, new LogService(name));
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
LogService._out$ = new Subject();
LogService.out$ = LogService._out$.pipe(shareReplay(1)
// scan((acc, val) => {
//   acc.push(val as never);
//   return acc;
// }, []),
// shareReplay(1)
);
LogService.outSub = LogService.out$.subscribe((p) => console.log(`${new Date(p.timestamp).toISOString()} ${p.name} [${p.level}] ${p.message}`, ...p.args));
LogService.buffer$ = LogService.out$.pipe(scan((acc, val) => {
    acc.push(val);
    if (acc.length > 1000) {
        acc.shift();
    }
    return acc;
}, []), shareReplay(1));
LogService.ɵfac = function LogService_Factory(t) { return new (t || LogService)(i0.ɵɵinject('log-name', 8)); };
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
