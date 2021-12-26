import { Component, OnInit } from '@angular/core';
import { OURONOTE_DEFAULT_TITLE } from '../constants';

@Component({
  selector: 'app-vector',
  templateUrl: './vector.component.html',
  styleUrls: ['./vector.component.scss'],
})
export class VectorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    document.title = OURONOTE_DEFAULT_TITLE;
  }
}
