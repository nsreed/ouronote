import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VectorGraph } from '../../../VectorGraph';
import { VectorService } from '../../vector.service';
import { UserService } from '../../../user.service';

export interface VectorSettingsData {
  mode: 'general' | 'people';
  vectorPub: string;
}

@Component({
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent implements OnInit {
  vectors = this.vectorService.vectors;
  vector = this.vectors.get(this.data.vectorPub as never);

  vector$ = this.vector.on();

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: VectorSettingsData,
    private vectorService: VectorService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
}
