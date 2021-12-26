import { Component, Inject, OnInit } from '@angular/core';
import { VectorService } from './vector.service';
import { map, filter, shareReplay } from 'rxjs/operators';
import { gunUpdateTime } from '../../../../../ng-gun/src/lib/functions/gun-utils';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { CreateVectorComponent } from './components/create-vector/create-vector.component';
import { LogService } from '../../../../../log/src/lib/log.service';
import { FileUploaderComponent } from '../../files/file-uploader/file-uploader.component';
import { VectorExportDialogComponent } from './components/vector-export-dialog/vector-export-dialog.component';
import { OURONOTE_DEFAULT_TITLE } from '../../constants';

export function buildVectorLogger(parent: LogService) {
  return parent.supplemental('name');
}
@Component({
  selector: 'app-vectors',
  templateUrl: './vectors.component.html',
  styleUrls: ['./vectors.component.scss'],
  providers: [
    // {
    //   provide: LogService,
    //   useFactory: buildVectorLogger,
    //   deps: [LogService, 'log-name'],
    // },
  ],
})
export class VectorsComponent implements OnInit {
  // FIXME reduce() is skipping records occasionally?
  vectors = this.vectorService.vectors.reduce().pipe(
    map((v: any[]) => v.sort((a, b) => gunUpdateTime(b) - gunUpdateTime(a))),
    shareReplay(1)
  );
  count$ = this.vectorService.vectors.reduce().pipe(
    map((v) => {
      const keys = Object.keys(v).filter((k) => k !== '_');
      const pop = keys.filter((k) => v[k] !== null && v[k] !== undefined);
      return pop.length;
    }),
    shareReplay(1)
  );
  constructor(
    private vectorService: VectorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    document.title = OURONOTE_DEFAULT_TITLE;
  }

  create() {
    this.dialog.open(CreateVectorComponent, { width: '90%', height: '90%' });
    // this.vectorService.vectors.set({
    //   title: 'new vector',
    // } as never);
  }

  importVector() {
    this.dialog
      .open(FileUploaderComponent)
      .afterClosed()
      .subscribe((files) => {
        console.log(files);
        for (const item of files) {
          this.vectorService.importFile(item);
        }
      });
  }
}
