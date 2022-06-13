import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgGunSessionService } from '../../../../../ng-gun/src/lib/ng-gun-session.service';

@Component({
  selector: 'app-session-selector',
  templateUrl: './session-selector.component.html',
  styleUrls: ['./session-selector.component.scss'],
})
export class SessionSelectorComponent implements OnInit {
  @Input()
  sessions = [];
  @Output()
  sessionSelect = new EventEmitter();
  constructor(public sessionService: NgGunSessionService) {}

  ngOnInit(): void {}
}
