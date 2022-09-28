import { Component, OnInit, Optional } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { NgGunService } from 'ng-gun';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '../components/about/about.component';
import host from '@jsdevtools/host-environment';
import { UserService } from '../user/user.service';
import { NgGunSessionService } from 'ng-gun';
import { LogService } from 'log';
import { fromEvent, from, of } from 'rxjs';
import {
  shareReplay,
  map,
  mapTo,
  take,
  mergeAll,
  distinct,
} from 'rxjs/operators';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { IGunCryptoKeyPair } from 'gun/types/types';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: any;
  submitted = false;
  unsupportedBrowser = !(host.browser as any).chrome;
  onLine = false;

  onLine$ = from([
    of(this.onlineStatusService.getStatus()),
    this.onlineStatusService.status,
  ]).pipe(
    mergeAll(),
    map((status) => status === OnlineStatusType.ONLINE)
  );

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

  form = this.fb.group({
    alias: [null, Validators.required],
    password: [
      null,
      [
        Validators.required,
        (ctl: UntypedFormControl) => {
          if (this.mode === 'login') {
            return null;
          }
          if (ctl.value !== this.form.get('password2')?.value) {
            return { passwordMatch: 'passwords do not match' };
          }
          return null;
        },
      ],
    ],
    password2: [
      null,
      (ctl: UntypedFormControl) => {
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

  sessions: IGunCryptoKeyPair[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private ngGun: NgGunService,
    private router: Router,
    private dialog: MatDialog,
    @Optional() protected sessionService: NgGunSessionService,
    private logger: LogService,
    public onlineStatusService: OnlineStatusService
  ) {
    logger.name = 'login';
    logger.log('login page started');
  }

  ngOnInit(): void {
    this.onLine$.subscribe((v) => {
      this.onLine = v;
    });
    this.sessions = this.sessionService?.workerState.sessions || [];
    this.ngGun.auth().auth$.subscribe((data) => {
      console.log('auth data', data);
      this.router.navigateByUrl('/user/vectors');
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
    this.logger.log('login', this.form.value);
    if (!this.form.valid) {
      return;
    }
    this.submitted = true;
    this.error = null;
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

  onSessionSelect(sessionPair: any) {
    this.logger.log('selected session', sessionPair.pub);
    this.submitted = true;
    this.error = null;
    this.ngGun
      .auth()
      .login(sessionPair)
      .subscribe((data) => {
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
