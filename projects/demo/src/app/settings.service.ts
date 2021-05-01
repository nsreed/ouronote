import { Injectable } from '@angular/core';
import { NgGunService } from '../../../ng-gun/src/lib/ng-gun.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  input = {
    touchToDraw: true,
  };
  constructor(private ngGun: NgGunService) {}
}
