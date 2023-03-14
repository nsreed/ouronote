import { SettingsService } from './../settings.service';
import { LogService } from 'log';
import { Injectable } from '@angular/core';
import { LogLevel } from '../../../../log/src/lib/log.service';

@Injectable({
  providedIn: 'root',
})
export class OuronoteLogService extends LogService {
  constructor(settingsService: SettingsService) {
    super();
    const logSettingsNode = settingsService.gun.get('log');
    logSettingsNode.not().subscribe(() => {
      this.warn('no settings');
      logSettingsNode.put({
        level: LogLevel.INFO,
        outLevel: LogLevel.WARN,
        persist: false,
        bypassLogger: false,
      });
    });
    logSettingsNode.on().subscribe((logSettings) => {
      this.level = logSettings.level || this.level;
      this.outLevel = logSettings.outLevel || this.outLevel;
    });
  }
}
