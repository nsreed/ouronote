import { Component, OnInit } from '@angular/core';
import { VectorService } from './vector.service';
import { map, filter } from 'rxjs/operators';
import { gunUpdateTime } from '../../../../../ng-gun/src/lib/functions/gun-utils';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { CreateVectorComponent } from './components/create-vector/create-vector.component';

@Component({
  selector: 'app-vectors',
  templateUrl: './vectors.component.html',
  styleUrls: ['./vectors.component.scss'],
})
export class VectorsComponent implements OnInit {
  vectors = this.vectorService.vectors
    .reduce()
    .pipe(
      map((v: any[]) => v.sort((a, b) => gunUpdateTime(b) - gunUpdateTime(a)))
    );
  constructor(
    private vectorService: VectorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  create() {
    this.dialog.open(CreateVectorComponent, { width: '90%', height: '90%' });
    // this.vectorService.vectors.set({
    //   title: 'new vector',
    // } as never);
  }

  remove(vector: any) {
    console.log('removing', vector);
    this.dialog
      .open(ConfirmComponent)
      .afterClosed()
      .pipe(filter((r) => r))
      .subscribe((result) => {
        this.vectorService.vectors.unset(vector);
      });
  }
}
