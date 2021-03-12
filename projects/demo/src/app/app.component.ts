import { Component } from '@angular/core';
import { NgGunService } from '../../../ng-gun/src/lib/ng-gun.service';
import { User } from './user/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: any;
  constructor(public ngGun: NgGunService<User>) {
    // NOTE gun.user(pub) does *not* provide auth() method
    const a = ngGun.auth();
    const b = ngGun.auth();
    ngGun.findAlias('tedddddd').subscribe((data: any) => {
      console.log('found user', data);
    });

    // a.login('alice', '1234')?.subscribe((ack: any) => {
    //   console.log('login() ack', ack);
    //   a.get('name')
    //     .on()
    //     .subscribe((v) => {
    //       console.log('name change', v);
    //     });
    //   a.get('name').put(('alice' + Math.random()) as never);
    //   // bob: ~VrEQ5DzIHnVoWk0vzp7FFCVzjYwMhSrFxcHTZw8_IP4.X6Kt40eR5STMbUgO5mge19o_NxGezx6SMsJ6W0bHaec
    //   a.root.get(
    //     '~VrEQ5DzIHnVoWk0vzp7FFCVzjYwMhSrFxcHTZw8_IP4.X6Kt40eR5STMbUgO5mge19o_NxGezx6SMsJ6W0bHaec'
    //   );
    //   this.user = a;
    //   // b.login('bob', '1234').subscribe((bobAck) => {
    //   //   console.log('bob ack', bobAck, a.gun, b.gun, b.SEA);
    //   //   // TODO store certificate - this is needed for the eventual put(val, cb, opts: {certificate})
    //   //   b.certify(
    //   //     [ack.put.pub],
    //   //     {
    //   //       '*': 'inbox',
    //   //       '+': '*',
    //   //     },
    //   //     bobAck.sea
    //   //   ).subscribe((cert) =>
    //   //     console.log('certify got', JSON.parse(cert.replace(/^SEA/, '')))
    //   //   );
    //   // });
    // });
  }
}
