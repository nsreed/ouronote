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
import * as paper from 'paper';
import { Point, Shape, ToolEvent, MouseEvent } from 'paper';
import { GunChain } from '../../../../../../ng-gun/src/lib/classes/GunChain';
import {
  gunifyProject as gunifyProject,
  deGunifyProject,
} from './converter-functions';

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
    this.vectorNode$.subscribe((node) => {
      this.onProjectDataChange(this.paperDirective.project as any, node as any);
      // this.paperDirective.toolUp$.subscribe((e: paper.ToolEvent) => {
      //   this.onProjectDataChange(
      //     this.paperDirective.project as any,
      //     node as any
      //   );
      // });
    });
    this.vector$.subscribe((vector: Vector) => {
      console.log('vector change', vector, this.paperDirective);
      const data = this.paperDirective.project.exportJSON();

      if (!vector.data) {
        // This is a newly imported project
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
    this.paperDirective.toolDown$.subscribe((e: paper.ToolEvent) => {
      const c = new paper.Shape.Circle(e.point as any, 20);
    });
    this.paperDirective.data$.subscribe((data) => {
      this.vector$.pipe(take(1)).subscribe((v) => {
        console.log('new data', data);
        this.vectorService.vectors.get(v).put({
          title: v.title,
          data,
        });
      });
    });
  }

  ngOnInit(): void {}

  onProjectDataChange(project: paper.Project, gun: GunChain<Vector>) {
    // From paper to gun
    // get project JSON object from paper
    // unpack all the data.# objects to their parent
    // if an object doesn't have a data.#, node.set() it on its parent.children
    // ^^ is this redundant? the step of set() ing the data then updating
    //// ^^ No, not redundant. How do we find the original object in paper to update its data?
    //// ^^ THIS MEANS WE CAN'T USE THE exportJSON()!!!
    // ^^ YES it is redundant since we're just going to re-import the data anyway, giving any created paper objects their data.# anyway
    // then, set the node's data.# to the resulting soul
    // OK, we'll have to recurse through the project
    // First, before we've loaded the gun node, we'll need to recurse through it and populate the project
    // If gun node is empty, goto export
    // export:

    gun
      .get('data')
      .once()
      .subscribe((node: any) => {
        const unsynced = project.getItems((item: any) => !item.data['#']);
        project.clear();
        project.importJSON(node);
        // bindProject(gun.get('project'), project as any);
        // console.log({ unsynced, node });
      });

    gunifyProject(gun.get('project'), project as any);
    deGunifyProject(gun.get('project'), project as any);
  }
}
