import {
  Inject,
  Injectable,
  Optional,
  EventEmitter,
  SkipSelf,
} from '@angular/core';
import { Subject } from 'rxjs';
import { scan, shareReplay, take } from 'rxjs/operators';
export enum LogLevel {
  VERBOSE,
  INFO,
  WARN,
  ERROR,
}

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
  constructor(
    @Optional()
    @Inject('log-name')
    public name: string = 'app',
    @Optional()
    @SkipSelf()
    public parent?: LogService
  ) {
    this.name = this.name || 'app';
    if (this.name !== 'root' && !parent) {
      this.parent = LogService.root;
    }
  }

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

  protected _out$ = new EventEmitter<LogMessage>();
  out$ = this._out$;
  outSub = this.out$.subscribe((m) => {
    if (this.parent) {
      this.parent._out$.emit(m);
    } else {
      let stringy = '';
      try {
        stringy = JSON.stringify(m.args);
      } catch (e: any) {
        stringy = 'COULD NOT CONVERT ARGS!';
      }
      console.log(
        '%s %s %s %s',
        m.name,
        new Date(m.timestamp).toISOString(),
        m.message,
        stringy
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
