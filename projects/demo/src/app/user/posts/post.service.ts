import { Injectable } from '@angular/core';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts = this.userService.user.get('posts');
  constructor(private userService: UserService) {}
}
