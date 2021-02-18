import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as paper from 'paper';
import { take } from 'rxjs/operators';
import { GunChain } from '../../../../../../ng-gun/src/lib/classes/GunChain';
import { Vector } from '../../../model';
import { ProjectPair } from '../classes/paper-chain';
import { PaperDirective } from '../paper.directive';
import { RouteVectorDirective } from '../route-vector.directive';
import { VectorService } from '../vector.service';
import { gunifyProject as gunifyProject } from './converter-functions';

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

  constructor(
    vectorService: VectorService,
    route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    super(vectorService, route);
  }

  ngAfterViewInit(): void {
    this.vectorNode$.subscribe((node) => {
      this.onProjectDataChange(this.paperDirective.project as any, node as any);
    });
    this.vector$.subscribe((vector: Vector) => {
      // console.log('vector change', vector, this.paperDirective);
      if (!this.paperDirective.project) {
        return;
      }
      // const data = this.paperDirective.project.exportJSON();

      // if (!vector.data) {
      //   // This is a newly imported project
      //   console.log('vector is probably a new project');
      //   this.vectorService.vectors.get(vector).put({
      //     title: vector.title,
      //     data,
      //   });
      // } else if (data !== vector.data) {
      //   // TODO replace with calls to new deGunifyProject and gunifyProject methods
      //   // TODO not so fast, the new methods only support load() and do not attempt to find/update items in the project
      //   // console.log('importing vector data\n%s\n%s', data, vector.data);
      //   if (this.isLoaded) {
      //     // TODO remove me
      //     return;
      //   }
      //   // this.paperDirective.project.clear();
      //   // this.paperDirective.project.importJSON(vector.data);
      //   // this.isLoaded = true;
      // }
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
    });
    const paperChain: ProjectPair = new ProjectPair(
      gun as any,
      this.paperDirective.project as any
    );
    // paperGraph.open().subscribe((graph) => {
    //   console.log('paper graph', graph);
    // });
    // graphLayerMap$.subscribe((data: any) => {
    //   console.log('graph map', data);
    //   const key = data[1];
    //   const value = data[0];
    //   const item = this.paperDirective.project.getItem({ data: { soul: key } });
    //   if (!value && item) {
    //     // we have a local item that's been deleted from the graph
    //   } else if (value && !item) {
    //     // an item has been added to the graph which we need to import
    //     // consider a "smart" way to create the new item, such as intercepting
    //     // the insertChild/removeChild/remove methods to trigger updates from local data
    //   } else if (value && item) {
    //     // we should update the existing item
    //   }

    //   console.log({ key, value, item });
    // });
  }

  addLayer() {
    console.log('adding layer');

    this.paperDirective.scope.settings.insertItems = true;
    const nestedLayerJSON = [
      'Layer',
      {
        name: 'New Layer' + Math.random(),
        data: {
          soul: 'some random string',
        },
        children: [
          [
            'Layer',
            {
              data: {
                soul: 'some random other string',
              },
            },
          ],
        ],
      },
    ];
    const l: any = this.paperDirective.project.importJSON(
      JSON.stringify(nestedLayerJSON)
    );
    // this.paperDirective.project.importJSON(JSON.stringify(nestedLayerJSON)); // SHOWS THAT PAPER CANNOT UPDATE EXISTING BY NAME
    // const l2 = new this.paperDirective.scope.Layer();

    // const l = new this.paperDirective.scope.Layer();
    // l.name = 'New Layer';
    // const p = new this.paperDirective.scope.Path();
    // p.name = 'New Path';
    // l.addChild(p);
    // this.paperDirective.scope.settings.insertItems = true;
    // const proj = this.paperDirective.project as any;
    // proj.insertLayer(l);
    console.log(this.paperDirective.project.layers);
  }
}
