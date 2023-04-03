import { Component, Inject, OnInit } from '@angular/core';
import { VectorService } from './vector.service';
import { map, filter, shareReplay } from 'rxjs/operators';
import { gunUpdateTime } from 'ng-gun';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { CreateVectorComponent } from './components/create-vector/create-vector.component';
import { LogService } from 'log';
import { FileUploaderComponent } from '../../files/file-uploader/file-uploader.component';
import { VectorExportDialogComponent } from './components/vector-export-dialog/vector-export-dialog.component';
import { OURONOTE_DEFAULT_TITLE } from '../../constants';
import { Router } from '@angular/router';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { ShortcutInput } from 'ng-keyboard-shortcuts';

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
    private dialog: MatDialog,
    private logger: LogService,
    private router: Router,
    private matSidenav: MatSidenavContainer
  ) {}

  shortcuts: ShortcutInput[] = [
    { key: 'n', label: 'New Vector', command: () => this.create() },
    { key: 'i', label: 'Import Vector', command: () => this.importVector() },
  ];

  onOpenSidenavClick() {
    this.matSidenav.open();
  }

  ngOnInit(): void {
    document.title = OURONOTE_DEFAULT_TITLE;
  }

  async create() {
    const vector = await this.dialog
      .open(CreateVectorComponent, { width: '35em' })
      .afterClosed()
      .toPromise();

    if (!vector) {
      this.logger.log('No vector was created');
      return;
    }
    this.logger.log('Created vector %s', vector);
    this.router.navigate(['/user/vectors', `~${vector}`, 'edit']);
  }

  importVector() {
    this.dialog
      .open(FileUploaderComponent)
      .afterClosed()
      .pipe(filter((files) => files && files.length > 0))
      .subscribe((files) => {
        console.log(files);
        for (const item of files) {
          this.vectorService.importFile(item);
        }
      });
  }
}
