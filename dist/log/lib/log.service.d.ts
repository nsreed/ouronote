import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare enum LogLevel {
    VERBOSE = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}
export interface LogMessage {
    name: string;
    timestamp: number;
    level: LogLevel;
    message: string;
    args: any[];
}
export declare class LogService {
    name: string;
    parent?: LogService | undefined;
    constructor(name?: string, parent?: LogService | undefined);
    static readonly root: LogService;
    static readonly buffer$: import("rxjs").Observable<never[]>;
    protected _out$: EventEmitter<LogMessage>;
    out$: EventEmitter<LogMessage>;
    outSub: import("rxjs").Subscription;
    level: LogLevel;
    private supplementals;
    static getLogger(name: string): LogService;
    verbose(message: string, ...args: any[]): void;
    log(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    supplemental(name: string): LogService;
    private buildMessage;
    static ɵfac: i0.ɵɵFactoryDef<LogService, [{ optional: true; }, { optional: true; skipSelf: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<LogService>;
}
//# sourceMappingURL=log.service.d.ts.map