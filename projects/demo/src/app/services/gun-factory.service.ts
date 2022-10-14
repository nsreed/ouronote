import { OuronoteGunService } from './ouronote-gun.service';
import { NgGunService } from './../../../../ng-gun/src/lib/ng-gun.service';
import { shareReplay, take } from 'rxjs/operators';
import { SettingsService } from './../settings.service';
import { Injectable, NgZone } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GunFactoryService {
  gunSettingsNode = this.settingsService.gun.get('gun');
  gunSettings$ = this.gunSettingsNode.on().pipe(shareReplay(1));
  root$ = new ReplaySubject<OuronoteGunService>(1);
  root?: OuronoteGunService;
  constructor(
    private settingsService: SettingsService,
    private ngZone: NgZone
  ) {
    this.gunSettings$.pipe(take(1)).subscribe((gunSettings) => {
      const newGun = new OuronoteGunService(
        gunOptionsFromSettings(gunSettings),
        this.ngZone
      );
      this.root = newGun;
      this.root$.next(newGun);
    });
  }
}
function gunOptionsFromSettings(gunSettings: {
  file: string;
  localStorage: boolean;
  peers: string[];
  enableWebRTC: boolean;
  enableRadisk: boolean;
}) {
  return JSON.parse(
    JSON.stringify({
      peers: [],
      file: gunSettings.file,
      localStorage: !gunSettings.enableRadisk,
    })
  );
}
