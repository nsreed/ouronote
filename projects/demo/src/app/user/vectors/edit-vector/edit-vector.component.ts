import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouteVectorDirective } from '../route-vector.directive';
import { PaperDirective } from '../paper.directive';
import { Vector } from '../../../model';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: './edit-vector.component.html',
  styleUrls: ['./edit-vector.component.scss'],
})
export class EditVectorComponent
  extends RouteVectorDirective
  implements OnInit, AfterViewInit {
  @ViewChild(PaperDirective)
  private paperDirective!: PaperDirective;
  ngAfterViewInit(): void {
    this.vector$.subscribe((vector: Vector) => {
      console.log('vector change', vector, this.paperDirective);
      const data = this.paperDirective.project.exportJSON();
      if (!vector.data) {
        console.log('vector has no data!');
        this.vectorService.vectors.get(vector).put({
          title: vector.title,
          data,
        });
      } else if (data !== vector.data) {
        console.log('importing vector data\n%s\n%s', data, vector.data);
        this.paperDirective.project.clear();
        this.paperDirective.project.importJSON(vector.data);
      }
    });
    this.paperDirective.project.view.onMouseUp = (e: paper.MouseEvent) => {
      console.log('paper mouse up', e);
      const data = this.paperDirective.project.exportJSON();
      this.vector$.pipe(take(1)).subscribe((v) => {
        this.vectorService.vectors.get(v).put({
          title: v.title,
          data,
        });
      });
    };
  }
  ngOnInit(): void {}
}
