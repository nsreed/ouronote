import { Component, OnInit } from '@angular/core';
import { NgGunService } from 'ng-gun';
import { User } from '../user/model';

@Component({
  selector: 'app-session-info',
  templateUrl: './session-info.component.html',
  styleUrls: ['./session-info.component.scss'],
})
export class SessionInfoComponent implements OnInit {
  user = this.ngGun.auth();
  data: any;
  constructor(private ngGun: NgGunService<User>) {
    this.user.once().subscribe((u) => {
      console.log('user', u);
      this.data = u;
    });
    this.user.auth$.subscribe((event) => this.onAuthEvent(event));
    // this.user
    //   .get('alias' as never)
    //   .once()
    //   .subscribe((alias) => console.log('alias', alias));
  }

  ngOnInit(): void {}

  onAuthEvent(event: any) {
    console.log('auth event', event);
    this.data = event.put;
  }
}
