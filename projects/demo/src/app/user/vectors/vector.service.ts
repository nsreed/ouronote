import { Injectable } from '@angular/core';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class VectorService {
  vectors = this.userService.user.get('vectors');
  constructor(private userService: UserService) {}
}
