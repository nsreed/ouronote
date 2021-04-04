import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { RouteMessageDirective } from '../route-message.directive';
import { NgGunService } from '../../../../../../ng-gun/src/lib/ng-gun.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NgSeaService } from '../../../../../../ng-gun/src/lib/ng-sea.service';
import * as Gun from 'gun';
@Component({
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.scss'],
})
export class EditMessageComponent
  extends RouteMessageDirective
  implements OnInit {
  userSearch = this.fb.control(null);
  user: any = null;
  messageForm = this.fb.group({
    text: [null, Validators.required],
  });

  constructor(
    messageService: MessageService,
    route: ActivatedRoute,
    private ngGun: NgGunService,
    private fb: FormBuilder,
    private ngSea: NgSeaService
  ) {
    super(messageService, route);
    this.message$.subscribe((m) => {
      console.log('got message', m);
      this.messageForm.patchValue(m, { onlySelf: true, emitEvent: false });
    });
    this.messageForm.valueChanges.subscribe((vc) => {
      this.message$.pipe(take(1)).subscribe((m) => {
        this.messageService.messages.get(m).put(vc);
      });
    });
    this.userSearch.valueChanges.subscribe((alias) => {
      this.user = null;
      if (this.userSearch.invalid) {
        return;
      }
      // console.log('should search for', alias);
      this.ngGun.findAlias(alias).subscribe((found: any) => {
        // console.log('found user', found);
        if (!found) {
          return;
        }
        const foundPub = Object.keys(found).find((k) => k !== '_');
        this.user = {
          alias,
          pub: foundPub,
        };
      });
    });
  }
  ngOnInit(): void {}

  onSelectUser(event: MatAutocompleteSelectedEvent) {
    const addPubKey = event.option.value;
    console.log('selected', addPubKey);
    this.ngGun
      .user(addPubKey.replace(/^~/, ''))
      .once()
      .subscribe((user: any) => {
        console.log('adding user', user.alias, user.pub);
        const epub = user.epub;
        const me = this.ngGun.auth().is.alias; // FIXME I think this will break when not recall()ing a session
        console.log('I am', me);
        const certificants = [user.pub];
        const messageSoul = Gun.node.soul(this.message as any);
        const policies = `^${messageSoul}*`;
        const authority = me;
        this.ngSea
          .certify(certificants, policies, authority)
          .subscribe((certificate) => {
            console.log('generated certificate', certificate);
            this.chain$.pipe(take(1)).subscribe((chain) => {
              console.log('chain', chain);
              // chain
              //   .get('certificates' as never)
              //   .get(user.pub)
              //   .put(certificate as never);
              // chain
              //   .get('certificates' as never)
              //   .once()
              //   .subscribe((cs: any) => console.log('all certs', cs));
            });
          });
      });
    // this.message$.subscribe((mn) => {
    //   console.log('updating', mn);
    // // });
    // this.messageService.messages.get()
  }
}
