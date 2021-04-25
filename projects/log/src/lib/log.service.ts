import { Inject, Injectable, Optional } from '@angular/core';
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
    public name: string = 'app'
  ) {
    this.name = this.name || 'app';
    // LogService.out$.subscribe((p) => console.log(p.message, ...p.args));
    LogService.buffer$.subscribe((buffered) => {});
  }

  private static _out$ = new Subject<LogMessage>();
  static out$ = LogService._out$.pipe(
    shareReplay(1)

    // scan((acc, val) => {
    //   acc.push(val as never);
    //   return acc;
    // }, []),
    // shareReplay(1)
  );

  private static readonly outSub = LogService.out$.subscribe((p) =>
    console.log(
      `${new Date(p.timestamp).toISOString()} ${p.name} [${p.level}] ${
        p.message
      }`,
      ...p.args
    )
  );

  static buffer$ = LogService.out$.pipe(
    scan((acc, val) => {
      acc.push(val as never);
      if (acc.length > 1000) {
        acc.shift();
      }
      return acc;
    }, []),
    shareReplay(1)
  );
  level: LogLevel = LogLevel.INFO;

  private supplementals = new Map<string, LogService>();

  verbose(message: string, ...args: any[]) {
    const packed = this.buildMessage(LogLevel.VERBOSE, message, args);
    LogService._out$.next(packed);
  }

  log(message: string, ...args: any[]) {
    const packed = this.buildMessage(LogLevel.INFO, message, args);
    LogService._out$.next(packed);
  }

  warn(message: string, ...args: any[]) {
    const packed = this.buildMessage(LogLevel.WARN, message, args);
    LogService._out$.next(packed);
  }

  error(message: string, ...args: any[]) {
    const packed = this.buildMessage(LogLevel.ERROR, message, args);
    LogService._out$.next(packed);
  }

  supplemental(name: string): LogService {
    if (!this.supplementals.has(name)) {
      this.supplementals.set(name, new LogService(name));
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
