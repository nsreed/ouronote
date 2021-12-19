import { Component, OnInit } from '@angular/core';
import { SystemService, CAPABILITIES } from '../../system.service';
import { VERSION } from '../../../environments/version';

import Attributions from '../../../assets/attributions.json';
@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version = VERSION;
  capabilities = CAPABILITIES;
  public attributions = Attributions;
  constructor() {}

  ngOnInit(): void {}
}
