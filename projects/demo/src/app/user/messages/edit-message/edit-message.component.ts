import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { RouteMessageDirective } from '../route-message.directive';
@Component({
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.scss'],
})
export class EditMessageComponent
  extends RouteMessageDirective
  implements OnInit {
  messageForm = this.fb.group({
    text: [null, Validators.required],
  });

  constructor(
    messageService: MessageService,
    route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super(messageService, route);
    this.message$.subscribe((m) => {
      this.messageForm.patchValue(m, { onlySelf: true, emitEvent: false });
    });
    this.messageForm.valueChanges.subscribe((vc) => {
      this.message$.pipe(take(1)).subscribe((m) => {
        this.messageService.messages.get(m).put(vc);
      });
    });
  }
  ngOnInit(): void {}
}
