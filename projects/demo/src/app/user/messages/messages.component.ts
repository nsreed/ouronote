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
  ) {}

  ngOnInit() {}

  onMessageRemove(message: any) {
    this.messageService.delete(message);
  }

  newMessage() {
    this.dialog.open(NewMessageComponent);
  }
}
