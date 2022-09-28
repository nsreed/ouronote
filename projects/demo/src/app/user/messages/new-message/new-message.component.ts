import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../message.service';
import { Message } from '../../model';
import { NgGunService } from 'ng-gun';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent implements OnInit {
  messageForm = this.fb.group({
    to: this.fb.control(null, Validators.required),
    text: this.fb.control(null, Validators.required),
  });
  constructor(
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private ngGun: NgGunService
  ) {}

  dst!: any;

  ngOnInit() {}

  onSelectUser(pub: string) {
    console.log('selected', pub);

    this.dst = this.ngGun.get(`~${pub}`).get('inbox');

    this.messageForm.get('to')?.patchValue(pub);
  }

  send() {
    const message: Message = {
      text: this.messageForm.value.text,
      to: this.messageForm.value.to,
    };
    this.messageService.send(message);
  }
}
