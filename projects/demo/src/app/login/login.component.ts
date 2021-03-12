import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgGunService } from '../../../../ng-gun/src/lib/ng-gun.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    alias: ['alice', Validators.required],
    password: ['1234', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private ngGun: NgGunService,
    router: Router
  ) {
    ngGun.auth().auth$.subscribe((data) => {
      // console.log('auth data', data);
      router.navigateByUrl('/user');
    });
  }

  ngOnInit(): void {
    this.form.updateValueAndValidity();
  }

  create() {
    if (this.form.invalid) {
      return;
    }
    // console.log('create', this.form.value);
    this.ngGun
      .auth()
      .create(this.form.value.alias, this.form.value.password)
      .subscribe((data) => {
        // console.log('create result', data)
      });
  }

  login() {
    if (!this.form.valid) {
      return;
    }
    // console.log('login', this.form.value);
    this.ngGun
      .auth()
      .login(this.form.value.alias, this.form.value.password)
      .subscribe((data) => {
        // console.log('login result', data);
      });
  }
}
