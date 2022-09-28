import { Component, OnInit } from '@angular/core';
import { RouteChainDirective } from 'ng-gun';

@Component({
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent
  extends RouteChainDirective<any>
  implements OnInit
{
  ngOnInit(): void {}
}
