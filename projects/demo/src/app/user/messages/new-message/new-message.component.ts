import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../message.service';
import { Message } from '../../model';

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
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  onSelectUser(pub: string) {
    console.log('selected', pub);
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
