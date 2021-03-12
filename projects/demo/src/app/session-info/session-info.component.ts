import { Component, OnInit } from '@angular/core';
import { NgGunService } from '../../../../ng-gun/src/lib/ng-gun.service';
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
    // this.user
    //   .get('alias' as never)
    //   .once()
    //   .subscribe((alias) => console.log('alias', alias));
  }

  ngOnInit(): void {}
}
