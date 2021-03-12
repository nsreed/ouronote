import { Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { MessageService } from './message.service';
import { GunChain } from '../../../../../ng-gun/src/lib/classes/GunChain';

@Directive({
  selector: '[appRouteMessage]',
})
export class RouteMessageDirective {
  chain!: GunChain;
  chain$ = this.route.data.pipe(
    map((data) => this.messageService.messages.get(data.message))
  );
  message$: Observable<any> = this.chain$.pipe(
    switchMap((chain) => chain.on())
  );
  constructor(
    protected messageService: MessageService,
    private route: ActivatedRoute
  ) {
    // this.route.data.subscribe((d) => console.log('route data', d));
    // this.message.subscribe((m) => console.log('got message', m));
  }
}
