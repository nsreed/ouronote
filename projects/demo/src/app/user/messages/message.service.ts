import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { Message } from '../model';
import { LogService } from '../../../../../log/src/lib/log.service';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';
import {
  GunAuthChain,
  GunChain,
} from '../../../../../ng-gun/src/lib/classes/GunChain';
import * as Gun from 'gun';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages = this.userService.user.get('messages');
  inbox = this.userService.user.get('inbox');
  constructor(
    private userService: UserService,
    private logger: LogService,
    private ngGun: NgGunService
  ) {}
  delete(message: { _: { '#': string } }) {
    const t = { _: { '#': message._['#'] } };

    // FIXME unset not working here, or for vectors
    const mn = (this.messages.gun as any).get(t);
    (this.messages.gun as any).unset(mn);
  }
  send(message: Message) {
    this.logger.log('sending message %o', message);
    // set() message in messages
    const m = this.messages.set(message);

    m.once().subscribe((mval: any) => {
      this.logger.log('created local message', mval);
      const to = this.ngGun.get(`~${message.to}`).get('inbox');
      const sent = to.set(m.gun as never);
      sent.once().subscribe((sentVal) => {
        if (sentVal === undefined) {
          this.logger.warn('could not add message to recipient inbox');
        } else {
          this.logger.log('sent %o', sentVal);
        }
      });
    });
  }
}
