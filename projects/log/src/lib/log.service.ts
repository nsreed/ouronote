import {
  Inject,
  Injectable,
  Optional,
  EventEmitter,
  SkipSelf,
} from '@angular/core';
import { Subject } from 'rxjs';
import { scan, shareReplay, take, filter, bufferTime } from 'rxjs/operators';
import { around } from 'aspect-ts';
export enum LogLevel {
  VERBOSE,
  INFO,
  WARN,
  ERROR,
}

const labelLevels = new Map<LogLevel, string>();
labelLevels.set(LogLevel.VERBOSE, 'verbose');
labelLevels.set(LogLevel.INFO, 'info');
labelLevels.set(LogLevel.WARN, 'WARN');
labelLevels.set(LogLevel.ERROR, 'ERROR');

export interface LogMessage {
  name: string;
  timestamp: number;
  level: LogLevel;
  message: string;
  args: any[];
}

const doOnce = (fn: any) => {
  return (...args: any[]) => {
    if (LogService.seen.has(args[0])) {
      // console.log('only once!')
      return;
    }
    LogService.seen.add(args[0]);
    fn(...args);
  };
};
const stringifyMessage = ({ level, name, message, args, timestamp }: any) =>
  `${timestamp} [${level}] ${name} ${message}`;
const buildMessage = (
  level: any,
  name: string,
  message: string,
  ...args: any[]
) => ({ level, name, message, args, timestamp: Date.now() });

const filterLevel =
  (
    minLevel: LogLevel = LogLevel.ERROR,
    logLevel = () => LogLevel.VERBOSE,
    out = (message: string, ...args: any[]) => {}
  ) =>
  (message: string, ...args: any[]) => {
    if (minLevel > logLevel()) {
      return;
    }
    out(message, ...args);
  };

class Stopwatch {
  startTime!: number;
  endTime!: number;

  constructor(public readonly label = 'timer') {
    this.start();
  }

  start() {
    this.startTime = window.performance.now();
  }

  get elapsed() {
    return window.performance.now() - this.startTime;
  }

  end() {
    this.endTime = window.performance.now();
  }
}

// @dynamic
@Injectable({
  providedIn: 'root',
})
export class LogService {
  static seen = new Set<string>();
  set name(value: string) {
    this._name = value;
    LogService.longestName =
      value.length > LogService.longestName
        ? value.length
        : LogService.longestName;
  }

  get name(): string {
    return this._name;
  }

  constructor(
    @Optional()
    @Inject('log-name')
    name: string = 'app',
    @Optional()
    @SkipSelf()
    public parent?: LogService
  ) {
    this.name = name || 'app';
    if (this.name !== 'root' && !parent) {
      this.parent = LogService.root;
    }
    this.updatePiping();
  }
  private static longestName = 14;
  private static timers = new Map<string, Stopwatch>();
  private static elapsed = new Map<string, number>();
  private static count = new Map<string, number>();

  public static readonly root = new LogService('root');

  static readonly buffer$ = LogService.root.out$.pipe(
    scan((acc, val) => {
      acc.push(val as never);
      if (acc.length > 300) {
        acc.shift();
      }
      return acc;
    }, []),
    shareReplay(1)
  );
  private _name!: string;

  protected _out$ = new EventEmitter<LogMessage>();
  out$ = this._out$;
  outSub = this.out$
    .pipe(filter((msg) => msg.level >= this.outLevel))
    .subscribe((m) => {
      if (this.parent) {
        this.parent._out$.emit(m);
      } else {
        console.log(
          `%s %s %s ${m.message}`,
          new Date(m.timestamp).toISOString(),
          m.name.padEnd(LogService.longestName),
          labelLevels.get(m.level)?.padEnd(7),
          ...m.args
        );
      }
    });

  /** level to be recorded */
  level: LogLevel = LogLevel.INFO;

  /** level to be echoed */
  private _outLevel = JSON.parse(localStorage.getItem('log.outLevel') || '1');
  public get outLevel() {
    return this._outLevel;
  }
  public set outLevel(value) {
    this._outLevel = value;
    localStorage.setItem('log.outLevel', JSON.stringify(value));
    this.updatePiping();
  }

  private _consoleOnly =
    JSON.parse(localStorage.getItem('log.consoleOnly') || 'false') || false;
  public get consoleOnly() {
    return this._consoleOnly;
  }
  public set consoleOnly(value) {
    this._consoleOnly = value;
    localStorage.setItem('log.consoleOnly', JSON.stringify(value));
    this.updatePiping();
  }

  private supplementals = new Map<string, LogService>();

  verbose = this.outVerbose;
  log = this.outLog;
  warn = this.outWarn;
  error = this.outError;
  once = doOnce(
    filterLevel(
      LogLevel.INFO,
      () => this.level,
      (message: string, ...args: any[]) =>
        this.out$.emit(buildMessage(this.level, this.name, message, ...args))
    )
  );

  static getLogger(name: string) {
    return new LogService(name, LogService.root);
  }

  updatePiping() {
    const noop = () => {};
    ['verbose', 'log', 'warn', 'error'].forEach((l: string, i) => {
      const name = !this.consoleOnly
        ? `out${l.slice(0, 1).toUpperCase()}${l.slice(1)}`
        : l;

      const consoleFn = (console as any)[l === 'verbose' ? 'info' : l];
      const outFn = (...args: any[]) => (this as any)[name](...args);

      (this as any)[l] =
        this.outLevel < i ? (!this.consoleOnly ? outFn : consoleFn) : noop;
    });
  }

  private outVerbose(message: string, ...args: any[]) {
    if (this.level > LogLevel.VERBOSE) {
      return;
    }
    const packed = this.buildMessage(LogLevel.VERBOSE, message, args);
    this._out$.emit(packed);
  }

  private outLog(message: string, ...args: any[]) {
    if (this.level > LogLevel.INFO) {
      return;
    }
    const packed = this.buildMessage(LogLevel.INFO, message, args);
    this._out$.emit(packed);
  }

  private outWarn(message: string, ...args: any[]) {
    if (this.level > LogLevel.WARN) {
      return;
    }
    const packed = this.buildMessage(LogLevel.WARN, message, args);
    this._out$.emit(packed);
  }

  private outError(message: string, ...args: any[]) {
    if (this.level > LogLevel.ERROR) {
      return;
    }
    const packed = this.buildMessage(LogLevel.ERROR, message, args);
    this._out$.emit(packed);
  }

  monitor(ctx: any, name: string, threshold = 1, countMod = 20) {
    return;
    if (!LogService.count.has(name)) {
      LogService.count.set(name, 0);
    }
    around(ctx, name, (...args: any[]) => {
      const notify = args.pop();
      const t = this.time(name);
      const ret = notify(...args);
      const dur = this.timeEnd(name, threshold);
      const callCount = LogService.count.get(name) || 0;
      LogService.count.set(name, callCount + 1);
      if (callCount % 1000 === 0) {
        this.log(`${name} called ${callCount} times`);
      }
      const prev: number = LogService.elapsed.get(name) || 0;

      return ret;
    });
  }

  time(label: string) {
    if (!LogService.timers.has(label)) {
      LogService.timers.set(label, new Stopwatch(label));
    }
    LogService.timers.get(label)?.start();
    return LogService.timers.get(label) as Stopwatch;
  }

  timeEnd(label: string, threshold = 1) {
    const t = LogService.timers.get(label) as Stopwatch;
    t.end();
    const prev: number = LogService.elapsed.get(label) || 0;
    LogService.elapsed.set(label, prev + t.elapsed);
    if (t.elapsed > threshold) {
      console.log('%s %f (%f total)', label, t.elapsed, prev + t.elapsed);
    }
    return t.elapsed;
  }

  eventTap(name: string) {
    return () => {};
    const e$ = new EventEmitter();
    e$.pipe(
      bufferTime(1000, 1000),
      filter((times) => times.length > 0)
    ).subscribe((times) => {
      this.log(`${this.name}${name} event @ ${times.length} per second`);
    });
    return () => {
      e$.emit(Date.now());
    };
  }

  supplemental(name: string): LogService {
    if (!this.supplementals.has(name)) {
      const supplementalLog = new LogService(name, this);
      // supplementalLog.out$.subscribe((msg) => {
      //   console.log('supplemental message', msg);
      //   this._out$.emit(msg);
      // });
      this.supplementals.set(name, supplementalLog);
    }
    return this.supplementals.get(name) as LogService;
  }

  private buildMessage(
    level: LogLevel,
    message: string,
    args: any[]
  ): LogMessage {
    return {
      level,
      message,
      args,
      timestamp: Date.now(),
      name: this.name,
    };
  }
}
