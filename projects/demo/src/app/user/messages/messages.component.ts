import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MessageService } from './message.service';
import * as Gun from 'gun';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  inbox = this.messageService.messages.reduce();

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}
  ngOnInit() {}

  onMessageClick() {
    this.messageService.messages.set({
      text: 'hello',
    });
  }

  onMessageRemove(message: any) {
    if (Gun.node.is(message)) {
      console.log('removing message', message);
      this.messageService.messages
        .get(message as never)
        .once()
        .subscribe((togo) => {
          console.log('found removed message', togo);
        });
    }
    this.messageService.messages
      .unset(message)
      .once()
      .subscribe((r) => {
        console.log('done removing message', r);
      });
  }

  onMessageUpdate(message: any) {
    console.log('updating', message);
    this.messageService.messages
      .get(Gun.node.soul(message) as any)
      .put({ text: 'another update' })
      .once()
      .subscribe((m) => {
        console.log('would update', m);
      });
    // this.messageService.messages.get(message).put({
    //   text: 'updated',
    // });
  }
}
