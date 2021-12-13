import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgGunService } from '../../../../ng-gun/src/lib/ng-gun.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: any;

  mode: 'create' | 'login' = 'login';

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
    router: Router
  ) {
    ngGun.auth().auth$.subscribe((data) => {
      // console.log('auth data', data);
      router.navigateByUrl('/user/vectors');
    });
  }

  ngOnInit(): void {
    this.form.updateValueAndValidity();
  }

  create() {
    if (this.form.invalid) {
      return;
    }
    this.error = null;
    // console.log('create', this.form.value);
    this.ngGun
      .auth()
      .create(this.form.value.alias, this.form.value.password)
      .subscribe((data) => {
        this.error = data.err;
        // console.log('create result', data)
        if (!this.error) {
          this.login();
        }
      });
  }

  login() {
    if (!this.form.valid) {
      return;
    }
    this.error = null;
    // console.log('login', this.form.value);
    this.ngGun
      .auth()
      .login(this.form.value.alias, this.form.value.password)
      .subscribe((data) => {
        // console.log('login result', data);
        if (data.err) {
          this.error = true;
        } else {
          this.error = undefined;
        }
      });
  }
}
