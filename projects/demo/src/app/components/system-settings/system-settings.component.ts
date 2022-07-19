import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { SettingsService } from '../../settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss'],
})
export class SystemSettingsComponent implements OnInit {
  settingsForm = this.fb.group({
    enableWebRTC: false,
    enableRadisk: false,
  });
  constructor(
    private fb: UntypedFormBuilder,
    private settingsService: SettingsService,
    private router: Router
  ) {
    this.settingsForm.patchValue({
      enableWebRTC: settingsService.enableWebRTC,
      enableRadisk: settingsService.enableRadisk,
    });
  }

  ngOnInit(): void {}

  save() {
    this.settingsService.enableRadisk = this.settingsForm.value.enableRadisk;
    this.settingsService.enableWebRTC = this.settingsForm.value.enableWebRTC;
    this.settingsService.save();
    this.router
      .navigateByUrl('/')
      .then((s) => (window.location = window.location));
  }
}
