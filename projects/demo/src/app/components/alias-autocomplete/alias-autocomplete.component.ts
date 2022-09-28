import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { NgGunService } from 'ng-gun';

@Component({
  selector: 'app-alias-autocomplete',
  templateUrl: './alias-autocomplete.component.html',
  styleUrls: ['./alias-autocomplete.component.scss'],
})
export class AliasAutocompleteComponent implements OnInit {
  userResults: any[] = [];
  aliasCtl = this.fb.control(null);
  @Output()
  select$ = new EventEmitter<string>();

  constructor(private fb: UntypedFormBuilder, private ngGun: NgGunService) {
    this.aliasCtl.valueChanges
      .pipe(filter((alias) => alias !== null))
      .subscribe((alias) => {
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

  onSelectUser(event: any) {
    const selectedValue = event.option.value;
    console.log('selected', selectedValue);
    // this.form.controls.people.value.push(selectedValue.replace('~', ''));
    this.select$.emit(selectedValue.replace(/~/g, ''));
    this.aliasCtl.reset();
    this.userResults = [];
  }
}
