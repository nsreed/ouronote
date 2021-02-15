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
import { deGunifyLoaded } from './converter-functions';
import { Observable } from 'rxjs';
import {
  gunifyProject as gunifyProject,
  deGunifyProject,
} from './converter-functions';

const VECTOR_PAPER_JSON_KEY = 'graph';

@Component({
  templateUrl: './edit-vector.component.html',
  styleUrls: ['./edit-vector.component.scss'],
})
export class EditVectorComponent
  extends RouteVectorDirective
  implements OnInit, AfterViewInit {
  @ViewChild('paper')
  private paperDirective!: PaperDirective;

  private isLoaded = false;

  paperGraph!: GunChain;

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
      // console.log('vector change', vector, this.paperDirective);
      if (!this.paperDirective.project) {
        return;
      }
      const data = this.paperDirective.project.exportJSON();

      if (!vector.data) {
        // This is a newly imported project
        console.log('vector is probably a new project');
        this.vectorService.vectors.get(vector).put({
          title: vector.title,
          data,
        });
      } else if (data !== vector.data) {
        // TODO replace with calls to new deGunifyProject and gunifyProject methods
        // TODO not so fast, the new methods only support load() and do not attempt to find/update items in the project
        // console.log('importing vector data\n%s\n%s', data, vector.data);
        if (this.isLoaded) {
          // TODO remove me
          return;
        }
        this.paperDirective.project.clear();
        this.paperDirective.project.importJSON(vector.data);
        this.isLoaded = true;
      }
    });
    this.paperDirective.toolDown$.subscribe((e: paper.ToolEvent) => {
      const c = new paper.Shape.Circle(e.point as any, 20);
    });
    this.paperDirective.data$.subscribe((data) => {
      this.vector$.pipe(take(1)).subscribe((v) => {
        const vectorNode = this.vectorService.vectors.get(v);
        const paperGraph = vectorNode.get(VECTOR_PAPER_JSON_KEY as never);
        const gunified = gunifyProject(
          paperGraph,
          this.paperDirective.project as any
        );
        console.log({ ...gunified });
        paperGraph.put(gunified as never);
        this.vectorService.vectors.get(v).put({
          title: v.title,
          data,
        });
      });
    });
  }

  ngOnInit(): void {}

  onProjectDataChange(project: paper.Project, gun: GunChain<Vector>) {
    console.log('setting up project graph');
    const paperGraph = gun.get(VECTOR_PAPER_JSON_KEY);
    const graphLayerMap$ = paperGraph.map().on({
      includeKeys: true,
    }) as Observable<any>;
    // paperGraph.open().subscribe((graph) => {
    //   console.log('paper graph', graph);
    // });
    graphLayerMap$.subscribe((data: any) => {
      console.log('graph map', data);
      const key = data[1];
      const value = data[0];
      const item = this.paperDirective.project.getItem({ data: { soul: key } });
      console.log({ key, value, item });
    });
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
    // gun
    //   .get('data')
    //   .once()
    //   .subscribe((node: any) => {
    //     const unsynced = project.getItems((item: any) => !item.data['#']);
    //     project.clear();
    //     project.importJSON(node);
    //     // bindProject(gun.get('project'), project as any);
    //     // console.log({ unsynced, node });
    //   });
    // gunifyProject(gun.get(VECTOR_PAPER_JSON_KEY), project as any);
    // deGunifyProject(gun.get(VECTOR_PAPER_JSON_KEY), project as any);
  }
}
