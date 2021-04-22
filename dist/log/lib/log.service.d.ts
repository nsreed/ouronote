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
    constructor(name?: string);
    private static _out$;
    static out$: import("rxjs").Observable<LogMessage>;
    private static readonly outSub;
    static buffer$: import("rxjs").Observable<never[]>;
    level: LogLevel;
    private supplementals;
    log(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    supplemental(name: string): LogService;
    private buildMessage;
    static ɵfac: i0.ɵɵFactoryDef<LogService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<LogService>;
}
//# sourceMappingURL=log.service.d.ts.map