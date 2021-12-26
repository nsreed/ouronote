import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { ProjectPair } from '../../user/vectors/classes/ProjectPair';
import { LogService } from 'projects/log/src/public-api';
import { PaperDirective } from 'projects/demo/src/app/vector/paper.directive';

@Component({
  selector: 'app-vector-preview',
  templateUrl: './vector-preview.component.html',
  styleUrls: ['./vector-preview.component.scss'],
})
export class VectorPreviewComponent implements OnInit, AfterViewInit {
  private _vector!: any;
  @ViewChild(PaperDirective)
  private paperDirective!: PaperDirective;
  private projectPair!: ProjectPair;
  public get vector(): any {
    return this._vector;
  }
  @Input('vector')
  public set vector(value: any) {
    this._vector = value;
  }
  public get project(): paper.Project {
    return this.paperDirective.project;
  }
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.paperDirective);
    // TODO improve preview speed by not loading a full ProjectPair
    this.projectPair = new ProjectPair(
      this.vector,
      this.paperDirective.project,
      this.paperDirective.scope,
      new LogService()
    );
  }
}
