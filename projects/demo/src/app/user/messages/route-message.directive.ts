import { Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map, tap, shareReplay } from 'rxjs/operators';
import { MessageService } from './message.service';
import { GunChain } from '../../../../../ng-gun/src/lib/classes/GunChain';
import { Message } from '../model';
import * as Gun from 'gun';

@Directive({
  selector: '[appRouteMessage]',
})
export class RouteMessageDirective {
  chain!: GunChain;
  message!: Message;
  chain$ = this.route.data.pipe(
    map((data) =>
      this.messageService.messages.auth().root.get(Gun.node.soul(data.message))
    ),
    tap((chain: any) => (this.chain = chain)),
    shareReplay(1)
  );
  message$: Observable<any> = this.chain$.pipe(
    switchMap((chain) => chain.on()),
    tap((message) => (this.message = message))
  );
  constructor(
    protected messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((d) => console.log('route data', d));
    // this.message.subscribe((m) => console.log('got message', m));
  }
}
