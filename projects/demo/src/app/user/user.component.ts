import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  messages = this.userService.user.get('messages');

  inbox = this.messages.reduce();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.messages.on().subscribe((msgs) => console.log('messages', msgs));
  }

  onMessageClick() {
    this.messages.set({
      text: 'hello',
    });
  }
}
