import {
  Inject,
  Injectable,
  Optional,
  EventEmitter,
  SkipSelf,
} from '@angular/core';
import { Subject } from 'rxjs';
import { scan, shareReplay, take, filter } from 'rxjs/operators';
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
  outSub = this.out$.pipe(filter((msg) => msg.level >= 1)).subscribe((m) => {
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

  level: LogLevel = LogLevel.INFO;

  private supplementals = new Map<string, LogService>();

  static getLogger(name: string) {
    return new LogService(name, LogService.root);
  }

  verbose(message: string, ...args: any[]) {
    const packed = this.buildMessage(LogLevel.VERBOSE, message, args);
    this._out$.emit(packed);
  }

  log(message: string, ...args: any[]) {
    const packed = this.buildMessage(LogLevel.INFO, message, args);
    this._out$.emit(packed);
  }

  warn(message: string, ...args: any[]) {
    const packed = this.buildMessage(LogLevel.WARN, message, args);
    this._out$.emit(packed);
  }

  error(message: string, ...args: any[]) {
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
