import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { LICENSES } from '../../LICENSES';
import { UntypedFormBuilder, FormControl, FormControlDirective } from '@angular/forms';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-license-form',
  templateUrl: './license-form.component.html',
  styleUrls: ['./license-form.component.scss'],
})
export class LicenseFormComponent implements OnInit {
  licenses = LICENSES;

  @Input()
  control = this.fb.control([null]);
  @Input()
  group = this.fb.group({
    name: null,
    text: `Copyright © ${new Date().getFullYear()} ${
      this.userService.user.alias
    } ALL RIGHTS RESERVED`,
  });

  constructor(private fb: UntypedFormBuilder, private userService: UserService) {}

  ngOnInit(): void {}
}
