import {
  Inject,
  Injectable,
  Optional,
  EventEmitter,
  SkipSelf,
} from '@angular/core';
import { Subject } from 'rxjs';
import { scan, shareReplay, take, filter } from 'rxjs/operators';
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
  }
  private static longestName = 14;
  private static timers = new Map<string, Stopwatch>();
  private static elapsed = new Map<string, number>();

  public static readonly root = new LogService('root');

  static readonly buffer$ = LogService.root.out$.pipe(
    scan((acc, val) => {
      acc.push(val as never);
      if (acc.length > 1000) {
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
  outLevel = LogLevel.INFO;

  private supplementals = new Map<string, LogService>();

  static getLogger(name: string) {
    return new LogService(name, LogService.root);
  }

  verbose(message: string, ...args: any[]) {
    if (this.level > LogLevel.VERBOSE) {
      return;
    }
    const packed = this.buildMessage(LogLevel.VERBOSE, message, args);
    this._out$.emit(packed);
  }

  log(message: string, ...args: any[]) {
    if (this.level > LogLevel.INFO) {
      return;
    }
    const packed = this.buildMessage(LogLevel.INFO, message, args);
    this._out$.emit(packed);
  }

  warn(message: string, ...args: any[]) {
    if (this.level > LogLevel.WARN) {
      return;
    }
    const packed = this.buildMessage(LogLevel.WARN, message, args);
    this._out$.emit(packed);
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

  time(label: string) {
    if (!LogService.timers.has(label)) {
      LogService.timers.set(label, new Stopwatch(label));
    }
    LogService.timers.get(label)?.start();
    return LogService.timers.get(label) as Stopwatch;
  }

  monitor(ctx: any, name: string, threshold = 1) {
    around(ctx, name, (...args: any[]) => {
      const notify = args.pop();
      const t = this.time(name);
      const ret = notify(...args);
      const dur = this.timeEnd(name, threshold);
      const prev: number = LogService.elapsed.get(name) || 0;

      return ret;
    });
  }

  error(message: string, ...args: any[]) {
    if (this.level > LogLevel.ERROR) {
      return;
    }
    const packed = this.buildMessage(LogLevel.ERROR, message, args);
    this._out$.emit(packed);
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
