import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  message: Observable<any> = this.route.data.pipe(
    switchMap((data) => this.messageService.messages.get(data.message).on())
  );
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((d) => console.log('route data', d));
    this.message.subscribe((m) => console.log('got message', m));
  }

  ngOnInit(): void {}
}
