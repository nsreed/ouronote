import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { NgGunService } from '../../../../../../ng-gun/src/lib/ng-gun.service';
import { NgSeaService } from '../../../../../../ng-gun/src/lib/ng-sea.service';
import { RouteChainDirective } from '../../../../../../ng-gun/src/lib/route-chain.directive';
import { MessageService } from '../message.service';
@Component({
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.scss'],
})
export class EditMessageComponent
  extends RouteChainDirective
  implements OnInit {
  userSearch = this.fb.control(null);
  user: any = null;
  messageForm = this.fb.group({
    text: [null, Validators.required],
  });

  constructor(
    private messageService: MessageService,
    route: ActivatedRoute,
    ngGun: NgGunService,
    private fb: UntypedFormBuilder,
    private ngSea: NgSeaService
  ) {
    super(route, ngGun);
    this.data$.subscribe((m) => {
      console.log('got message', m);
      this.messageForm.patchValue(m, { onlySelf: true, emitEvent: false });
    });
    this.messageForm.valueChanges.subscribe((vc) => {
      this.data$.pipe(take(1)).subscribe((m) => {
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
}
