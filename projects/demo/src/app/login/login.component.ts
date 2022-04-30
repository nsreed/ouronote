import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgGunService } from '../../../../ng-gun/src/lib/ng-gun.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '../components/about/about.component';
import host from '@jsdevtools/host-environment';
import { UserService } from '../user/user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: any;

  unsupportedBrowser = !(host.browser as any).chrome;

  private _mode: 'create' | 'login' = 'login';
  public get mode(): 'create' | 'login' {
    return this._mode;
  }
  public set mode(value: 'create' | 'login') {
    this._mode = value;
    this.form.controls.alias.updateValueAndValidity({
      onlySelf: false,
      emitEvent: true,
    });
    this.form.controls.password2.updateValueAndValidity();
  }

  submitted = false;

  // FIXME editing password 1 doesn't re-trigger validation
  // FIXME creating account with existing alias should fail validation
  form = this.fb.group({
    alias: [null, Validators.required],
    password: [null, Validators.required],
    password2: [
      null,
      (ctl: FormControl) => {
        if (this.mode === 'login') {
          return null;
        }
        if (ctl.value !== this.form.get('password')?.value) {
          return { passwordMatch: 'passwords do not match' };
        }
        return null;
      },
    ],
  });

  constructor(
    private fb: FormBuilder,
    private ngGun: NgGunService,
    router: Router,
    private dialog: MatDialog
  ) {
    ngGun.auth().auth$.subscribe((data) => {
      // console.log('auth data', data);
      router.navigateByUrl('/user/vectors');
    });
    this.form.controls.alias.addAsyncValidators(
      async (ctl: AbstractControl) => {
        if (this.mode === 'create') {
          // console.log('validating unique username');
          const match = await this.ngGun.findAlias(ctl.value).toPromise();
          // console.log(match);
          return match
            ? {
                aliasTaken: true,
              }
            : null;
        }
        return null;
      }
    );
  }

  ngOnInit(): void {
    this.form.updateValueAndValidity();
  }

  onCreateClick() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.error = null;
    // console.log('create', this.form.value);
    this.ngGun
      .auth()
      .create(this.form.value.alias, this.form.value.password)
      .subscribe((data) => {
        this.error = data.err;
        // console.log('create result', data)
        if (!this.error) {
          this.onLoginClick();
        }
      });
  }

  onLoginClick() {
    if (!this.form.valid) {
      return;
    }
    this.submitted = true;
    this.error = null;
    // console.log('login', this.form.value);
    this.ngGun
      .auth()
      .login(this.form.value.alias, this.form.value.password)
      .subscribe((data) => {
        // console.log('login result', data);
        if (data.err) {
          this.error = true;
          this.submitted = false;
        } else {
          this.error = undefined;
        }
      });
  }

  about() {
    this.dialog.open(AboutComponent);
  }
}
