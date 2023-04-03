import { SettingsSchema, SettingsService } from './../settings.service';
import { LogService, LogLevel, LogMessage } from 'log';
import { Injectable, NgZone } from '@angular/core';
import {
  Observable,
  concatAll,
  concatMap,
  from,
  map,
  mergeAll,
  mergeMap,
  of,
  scan,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import Gun from 'gun';
import { GunChain } from 'ng-gun';

interface LogSchema {
  [name: string]: LogMessage[];
}

@Injectable({
  providedIn: 'root',
})
export class OuronoteLogService extends LogService {
  private _gun = new GunChain<{ logs: LogSchema }>(
    this.ngZone,
    new Gun({
      file: 'logs',
      localStorage: false,
      peers: [],
    }) as any,
    null as any
  );
  logsNode = this._gun.get('logs');

  persist!: boolean;
  logSettingsNode = this.settingsService.gun.get('log');
  persist$ = this.logSettingsNode.get('persist').on().pipe(shareReplay(1));
  toPersist$ = this.persist$.pipe(
    switchMap((persist) =>
      persist
        ? LogService.root.out$
        : of({
            name: 'log-viewer.service',
            message: 'no persisting',
            args: [],
            level: LogLevel.INFO,
            timestamp: Date.now(),
          } as LogMessage)
    )
  );

  logs$ = this.logsNode.reduce({ includeKeys: true }).pipe(
    concatMap((messages: any) =>
      from(
        messages.map((m: any) =>
          this._gun.get(m._['#'] as never).reduce()
        ) as Observable<any>
      ).pipe(mergeAll())
    ),
    scan((all, log: any) => [...all, ...log], [] as any[]),
    shareReplay(1)
  );
  constructor(
    private settingsService: SettingsService,
    private ngZone: NgZone
  ) {
    super();
    this.persist$.subscribe((persist) => {
      console.log({ persist });
    });
    this.toPersist$.subscribe((toPersist) => {
      const { name, level, timestamp, message, args } = toPersist;
      this.logsNode.get(toPersist.name).set({
        name,
        level,
        timestamp,
        message,
        args,
      } as never);
    });
    this.logs$.subscribe((messages) => {
      console.log(messages);
    });
    this.logSettingsNode.not().subscribe(() => {
      this.warn('no settings');
      this.logSettingsNode.put({
        level: LogLevel.INFO,
        outLevel: LogLevel.WARN,
        persist: false,
        bypassLogger: false,
      });
    });
    this.logSettingsNode.on().subscribe((logSettings) => {
      this.level = logSettings.level || this.level;
      this.outLevel = logSettings.outLevel || this.outLevel;
      this.persist = logSettings.persist || this.persist;
    });
  }
}
