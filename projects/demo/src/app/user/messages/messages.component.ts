import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MessageService } from './message.service';
import * as Gun from 'gun';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageComponent } from './new-message/new-message.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  outbox = this.messageService.messages.reduce();
  inbox = this.messageService.inbox.reduce();

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {
    // console.log(this.userService.user.alias);
    // this.userService.alias$.subscribe((alias) => console.log('alias', alias));
    // this.messageService.inbox.load().subscribe((inbox) => {
    //   console.log('inbox', inbox);
    // });
  }

  ngOnInit() {}

  onMessageRemove(message: any) {
    this.messageService.delete(message);
    // if (Gun.node.is(message)) {
    //   console.log('removing message', message);
    //   this.messageService.messages
    //     .get((message as any).gun as never)
    //     .once()
    //     .subscribe((togo: any) => {
    //       console.log('found removed message', togo);
    //     });
    // }
    // this.messageService.messages
    //   .unset(message.gun)
    //   .once()
    //   .subscribe((r: any) => {
    //     console.log('done removing message', r);
    //   });
    // message.put(null);
  }

  newMessage() {
    this.dialog.open(NewMessageComponent);
  }

  onMessageUpdate(message: any) {
    console.log('updating', message);
    this.messageService.messages
      .get(Gun.node.soul(message) as any)
      .put({ text: 'another update' })
      .once()
      .subscribe((m: any) => {
        console.log('would update', m);
      });
    // this.messageService.messages.get(message).put({
    //   text: 'updated',
    // });
  }
}
