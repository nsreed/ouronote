import { SettingsService } from './../settings.service';
import { LogService } from './../../../../log/src/lib/log.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OuronoteLogService extends LogService {
  constructor(settingsService: SettingsService) {
    super();
    const logSettingsNode = settingsService.gun.get('log');
    logSettingsNode.not().subscribe(() => {
      console.log('no settings');
    });
    logSettingsNode.on().subscribe((logSettings) => {
      this.level = logSettings.level || this.level;
      this.outLevel = logSettings.outLevel || this.outLevel;
    });
  }
}
