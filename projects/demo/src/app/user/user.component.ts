import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    router: Router,
    route: ActivatedRoute
  ) {
    console.log('user route', route.routeConfig?.children);
  }

  ngOnInit(): void {
    // this.messages.on().subscribe((msgs) => console.log('messages', msgs));
  }
}
