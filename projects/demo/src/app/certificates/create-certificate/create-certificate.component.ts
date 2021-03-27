import { Component, OnInit, NgZone } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { filter, mergeMap } from 'rxjs/operators';
import { NgSeaService } from '../../../../../ng-gun/src/lib/ng-sea.service';
import { ChainDirective } from '../../../../../ng-gun/src/lib/chain.directive';
import { from } from 'rxjs';
import { SEA } from 'gun';

@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.scss'],
})
export class CreateCertificateComponent implements OnInit {
  form = this.fb.group({
    paths: this.fb.array(['comments']),
    public: true,
    people: this.fb.array([]),
    protected: true,
    options: this.fb.group({
      blacklist: 'blacklist',
      expires: null,
    }),
  });

  userCtl = this.fb.control(null);

  userResults: any[] = [];

  pathCtl = this.fb.control(null);
  constructor(
    private fb: FormBuilder,
    private ngGun: NgGunService,
    private sea: NgSeaService,
    private chain: ChainDirective,
    private ngZone: NgZone
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
    const r = this.chain.chain;
    if (!r) {
      return;
    }
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
            isProtected
          )
        ).subscribe((certStores: any) => {
          // TODO gunOpts appears to drag in values set by previous gun instance???
          const detachedGun = new NgGunService(
            {
              localStorage: false,
              peers: ['http://localhost:8765/gun'],
            },
            this.ngZone
          );
          (detachedGun.gun.user() as any).auth(recordPair, async () => {
            const v = detachedGun.gun.user();
            const certs = v.get('certs');
            certStores.forEach((store: any) => {
              console.log('create store', store);
              Object.keys(store).forEach((k) => {
                const certPath = certs.get(k);
                const certNew = store[k];
                Object.keys(certNew).forEach((pub) => {
                  console.log('insert cert at', k, pub, certNew[pub]);
                  certPath.get(pub).put(certNew[pub] as never);
                });
                // console.log('create store key', k);
                // certs.get(k).put(store[k] as never);
              });
              // certs.put(store as never);
            });
            // v.put(vector);
            // this.vectorService.vectors.set(v as never);
          });
        });
      });
  }
}
