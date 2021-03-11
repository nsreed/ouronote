import { Component, OnInit } from '@angular/core';
import { VectorService } from './vector.service';

@Component({
  selector: 'app-vectors',
  templateUrl: './vectors.component.html',
  styleUrls: ['./vectors.component.scss'],
})
export class VectorsComponent implements OnInit {
  vectors = this.vectorService.vectors.reduce();
  constructor(private vectorService: VectorService) {}

  ngOnInit(): void {}

  create() {
    this.vectorService.vectors.set({
      title: 'new vector',
    } as never);
  }
}
