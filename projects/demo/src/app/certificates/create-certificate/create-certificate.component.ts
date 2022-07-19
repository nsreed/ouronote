import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { FormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { delay, filter, mergeMap } from 'rxjs/operators';
import { NgSeaService } from '../../../../../ng-gun/src/lib/ng-sea.service';
import { ChainDirective } from '../../../../../ng-gun/src/lib/chain.directive';
import { from, Subject } from 'rxjs';
import { SEA } from 'gun';
import { Router } from '@angular/router';
import { IGunCryptoKeyPair } from 'gun/types/types';

@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.scss'],
})
export class CreateCertificateComponent implements OnInit {
  form = this.fb.group({
    paths: this.fb.array(['layers']),
    public: true,
    people: this.fb.array([]),
    protected: false,
    options: this.fb.group({
      blacklist: ['blacklist', Validators.required],
      expires: null,
    }),
  });

  userCtl = this.fb.control(null);

  userResults: any[] = [];

  pathCtl = this.fb.control(null);
  constructor(
    private fb: UntypedFormBuilder,
    private ngGun: NgGunService,
    private sea: NgSeaService,
    private chain: ChainDirective,
    private ngZone: NgZone,
    @Inject('gun-options')
    private gunOpts: any,
    private router: Router
  ) {
    console.log(this.form.value);
    this.form.statusChanges.subscribe((sc) => console.log('status', sc));
    this.userCtl.valueChanges
      .pipe(filter((alias) => alias !== null))
      .subscribe((alias: string) => {
        if (alias.startsWith('~')) {
          return;
        }
        console.log('searching', alias);
        this.ngGun.findAlias(alias).subscribe((found: any) => {
          console.log('found', found);
          if (found === undefined || found === null) {
            this.userResults = [];
            return;
          }
          // FIXME aliases are not guaranteed to be unique, and this may give a false match to the user
          // FIXME warn the user that they should verify that the public key matches the expected public key for whomever they're inviting
          const foundPub = Object.keys(found).find((k) => k !== '_');
          this.userResults = [
            {
              alias,
              pub: foundPub,
            },
          ];
        });
      });
  }

  ngOnInit(): void {}

  addPath(path: any) {
    const n = this.form.controls.paths.value;
    n.push(path);
    this.pathCtl.patchValue(null);
  }
  removePath(path: any) {
    const p = this.form.controls.paths.value as string[];
    const idx = p.indexOf(path);
    if (idx >= 0) {
      p.splice(idx, 1);
    }
  }

  onSelectUser(event: MatAutocompleteSelectedEvent) {
    const selectedValue = event.option.value;
    console.log('selected', selectedValue);
    this.userCtl.reset();
    this.form.controls.people.value.push(selectedValue.replace('~', ''));
  }

  addUser() {}

  removeUser(user: any) {
    const p = this.form.controls.people.value as string[];
    const idx = p.indexOf(user);
    if (idx >= 0) {
      p.splice(idx, 1);
    }
  }

  create() {
    console.log('creating certificate store');
    const value = this.form.value;
    const certificants = value.public ? ['*'] : value.people;
    const isProtected = value.protected;
    const blacklist = value.options.blacklist;
    const expires = value.options.expires;
    const opts = {
      blacklist,
      expires,
    };
    const r = this.chain.chain;
    if (!r) {
      return;
    }
    // FIXME if we aren't the owner, fail gracefully
    r.get('owner')
      .get(this.ngGun.auth().is.pub)
      .once()
      .pipe(
        mergeMap((encPair) => from(SEA.decrypt(encPair, this.ngGun.auth().is)))
      )
      .subscribe((recordPair: any) => {
        console.log('owns', recordPair.pub);
        from(
          // FIXME options not accounted for
          // TODO improve this process
          this.sea.getCertStore(
            certificants,
            value.paths,
            recordPair,
            isProtected,
            opts
          )
        ).subscribe(async (certStores: any) => {
          const v = (
            await this.ngGun.detached(recordPair as IGunCryptoKeyPair)
          ).auth();

          const certs = v.get('certs');
          certStores.forEach((store: any) => {
            Object.keys(store).forEach((k) => {
              const certPath = certs.get(k);
              const certNew = store[k];
              Object.keys(certNew).forEach((pub) => {
                certPath.get(pub).put(certNew[pub] as never);
              });
            });
          });
        });
      });
  }
}
