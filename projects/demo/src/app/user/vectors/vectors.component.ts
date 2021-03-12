import { Component, OnInit } from '@angular/core';
import { VectorService } from './vector.service';
import { map } from 'rxjs/operators';
import { gunUpdateTime } from '../../../../../ng-gun/src/lib/functions/gun-utils';

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
  constructor(private vectorService: VectorService) {}

  ngOnInit(): void {}

  create() {
    this.vectorService.vectors.set({
      title: 'new vector',
    } as never);
  }
}
