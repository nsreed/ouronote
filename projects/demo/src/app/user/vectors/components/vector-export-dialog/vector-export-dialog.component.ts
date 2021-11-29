import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { GunChain } from 'projects/ng-gun/src/lib/classes/GunChain';
import { LogService } from '../../../../../../../log/src/lib/log.service';
import { UserService } from '../../../user.service';
import { PaperEditDirective } from '../../paper-edit.directive';
import { VectorService } from '../../vector.service';
import { VectorPreviewComponent } from '../vector-preview/vector-preview.component';

@Component({
  templateUrl: './vector-export-dialog.component.html',
  styleUrls: ['./vector-export-dialog.component.scss'],
})
export class VectorExportDialogComponent implements OnInit, AfterViewInit {
  vector!: any;
  @ViewChild(VectorPreviewComponent)
  vectorPreview!: VectorPreviewComponent;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<GunChain, any>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private userService: UserService,
    private vectorService: VectorService,
    private logger: LogService
  ) {
    logger.name = 'vector-export-dialog';
    console.log(data);
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    const v = this.data.vector;
    this.vector = this.vectorService.vectors.get(v._['#']);
  }

  async download() {
    // TODO expand download options to include full metadata
    const jsonBlob = new Blob([this.vectorPreview.project.exportJSON()], {
      type: 'text/plain;charset=utf-8',
    });
    const username = this.userService.user.alias;
    const title = await this.vector.get('title').once().toPromise();
    const updated = new Date(this.vector.updateTime).toISOString();
    saveAs(jsonBlob, `${username}-${title}-${updated}.json`);
  }
}
