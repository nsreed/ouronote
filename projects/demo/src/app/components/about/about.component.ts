import { Component, OnInit } from '@angular/core';
import { SystemService, CAPABILITIES } from '../../system.service';
import { VERSION } from '../../../environments/version';

import Attributions from '../../../assets/attributions.json';
import Licenses from '../../../assets/licenses.json';
import { MatDialog } from '@angular/material/dialog';
@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version = VERSION;
  capabilities = CAPABILITIES;
  public attributions = Attributions;
  public licenses = Licenses;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  close() {
    this.dialog.closeAll();
  }
}
