import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { SEA } from 'gun';
import { NgSeaService } from '../../../../../ng-gun/src/lib/ng-sea.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(private userService: UserService, private sea: NgSeaService) {}

  ngOnInit(): void {}
  onAllowMessagesClick() {
    const pubInboxCert = this.userService.user
      .get('certs')
      .get('inbox')
      .get('*');
    this.sea
      .certify('*', { '*': 'inbox', '+': '*' }, this.userService.user.is.alias)
      .subscribe((cert) => {
        console.log('generated cert', cert);
        pubInboxCert.put(cert);
      });
  }
}
