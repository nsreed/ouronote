import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs';
import { RouteMessageDirective } from '../route-message.directive';

@Component({
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent extends RouteMessageDirective implements OnInit {
  ngOnInit(): void {}
}
