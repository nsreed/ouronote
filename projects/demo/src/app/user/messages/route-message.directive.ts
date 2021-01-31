import { Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Directive({
  selector: '[appRouteMessage]',
})
export class RouteMessageDirective {
  message: Observable<any> = this.route.data.pipe(
    switchMap((data) => this.messageService.messages.get(data.message).on())
  );
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    // this.route.data.subscribe((d) => console.log('route data', d));
    // this.message.subscribe((m) => console.log('got message', m));
  }
}
