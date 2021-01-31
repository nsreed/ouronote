import { Injectable } from '@angular/core';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages = this.userService.user.get('messages');
  constructor(private userService: UserService) {}
}
