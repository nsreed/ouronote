import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VectorGraph } from '../../../VectorGraph';
import { VectorService } from '../../vector.service';
import { UserService } from '../../../user.service';
import { shareReplay, map } from 'rxjs/operators';
import { GunChain } from '../../../../../../../ng-gun/src/lib/classes/GunChain';

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
  vector: GunChain<VectorGraph> = this.vectors.get(
    this.data.vectorPub as never
  ) as any;

  vector$ = this.vector.on();
  requests$ = this.vector
    .get('inviteRequests')
    .open()
    .pipe(
      // TODO make sure this open() call isn't making the program die
      map((requests: any) => Object.keys(requests).filter((k) => requests[k])),
      shareReplay(1)
    );
  requestCount$ = this.requests$.pipe(map((r) => r.length));

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: VectorSettingsData,
    private vectorService: VectorService,
    private userService: UserService,
    public dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit(): void {}
}
