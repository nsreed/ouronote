import { Component, OnInit } from '@angular/core';
import { RoutePostDirective } from '../route-post.directive';

@Component({
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent extends RoutePostDirective implements OnInit {
  ngOnInit(): void {}
}
