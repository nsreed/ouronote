import { Component, Input, OnInit } from '@angular/core';
import { EditVectorComponent } from '../../edit-vector/edit-vector.component';
import * as paper from 'paper';

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.scss'],
})
export class LayerListComponent implements OnInit {
  @Input()
  layers!: paper.Layer[];

  constructor(public vectorComponent: EditVectorComponent) {}

  ngOnInit(): void {}
}
