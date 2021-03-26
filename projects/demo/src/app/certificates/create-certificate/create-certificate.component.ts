import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { filter } from 'rxjs/operators';

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
  constructor(private fb: FormBuilder, private ngGun: NgGunService) {
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

  removeUser(user: any) {}
}
