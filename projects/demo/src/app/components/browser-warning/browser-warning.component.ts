import { Component, OnInit, Input } from '@angular/core';

import host from '@jsdevtools/host-environment';
import { SettingsService } from '../../settings.service';
import { defaultIfEmpty } from 'rxjs';

@Component({
  selector: 'app-browser-warning',
  templateUrl: './browser-warning.component.html',
  styleUrls: ['./browser-warning.component.scss'],
})
export class BrowserWarningComponent implements OnInit {
  private _supressBrowserIncompatible = this.settingsService.gun
    .get('ui')
    .get('suppressWarning')
    .get('browserIncompatible');
  unsupportedBrowser = !(host.browser as any).chrome;

  supressWarning$ = this._supressBrowserIncompatible
    .on()
    .pipe(defaultIfEmpty(this.unsupportedBrowser));

  show$ = this.supressWarning$.pipe(defaultIfEmpty(this.unsupportedBrowser));

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {}

  onDismissClick() {
    this._supressBrowserIncompatible.put(true);
  }
}
