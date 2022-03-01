import { Component, OnInit } from '@angular/core';
import { EditVectorComponent } from '../../edit-vector/edit-vector.component';

@Component({
  selector: 'app-selected-items',
  templateUrl: './selected-items.component.html',
  styleUrls: ['./selected-items.component.scss'],
})
export class SelectedItemsComponent implements OnInit {
  constructor(public editVectorComponent: EditVectorComponent) {}

  ngOnInit(): void {}
}
