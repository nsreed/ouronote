import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LICENSES } from '../../LICENSES';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-license-selector',
  templateUrl: './license-selector.component.html',
  styleUrls: ['./license-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseSelectorComponent implements OnInit {
  licenses = { ...LICENSES };

  @Input()
  control = this.fb.control([null]);

  @Input()
  customControl = this.fb.group({
    type: 'custom',
    name: null,
    text: [
      `Copyright © ${new Date().getFullYear()} ${
        this.userService.user.alias
      } ALL RIGHTS RESERVED`,
      Validators.required,
    ],
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {}
}
