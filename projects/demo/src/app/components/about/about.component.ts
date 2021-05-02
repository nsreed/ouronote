import { Component, OnInit } from '@angular/core';
import { SystemService, CAPABILITIES } from '../../system.service';
import { VERSION } from '../../../environments/version';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version = VERSION;
  capabilities = CAPABILITIES;
  constructor() {}

  ngOnInit(): void {}
}
