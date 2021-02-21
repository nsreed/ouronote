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
import { ProjectPair } from '../classes/ProjectPair';
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
  project!: paper.Project;

  constructor(
    vectorService: VectorService,
    route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    super(vectorService, route);
  }

  ngAfterViewInit(): void {
    this.vectorNode$.subscribe((node) => {
      if (!this.paperDirective.project) {
        console.warn('NO PAPER PROJECT');
        return;
      }
      this.onProjectDataChange(this.paperDirective.project as any, node as any);
    });
    this.vector$.subscribe((vector: Vector) => {
      // console.log('vector change', vector, this.paperDirective);
      if (!this.paperDirective.project) {
        return;
      }
      this.project = this.paperDirective.project;
    });
    // this.paperDirective.too
    this.paperDirective.toolDown$.subscribe((e: paper.ToolEvent) => {
      const c = new paper.Shape.Circle(e.point as any, 20);
      c.strokeColor = new paper.Color(
        Math.random(),
        Math.random(),
        Math.random()
      );
      // this.paperDirective.project.activeLayer.insertChild(0, c);
    });
    // this.paperDirective.data$.subscribe((data) => {
    //   this.vector$.pipe(take(1)).subscribe((v) => {
    //     const vectorNode = this.vectorService.vectors.get(v);
    //     const paperGraph = vectorNode.get(VECTOR_PAPER_JSON_KEY as never);
    //     const gunified = gunifyProject(
    //       paperGraph,
    //       this.paperDirective.project as any
    //     );
    //     console.log({ ...gunified });
    //     paperGraph.put(gunified as never);
    //     this.vectorService.vectors.get(v).put({
    //       title: v.title,
    //       data,
    //     });
    //   });
    // });
  }

  ngOnInit(): void {}

  onProjectDataChange(project: paper.Project, gun: GunChain<Vector>) {
    console.log('setting up project graph');
    this.paperDirective.tool.activate();
    const paperChain: ProjectPair = new ProjectPair(
      gun as any,
      this.paperDirective.project as any
    );
  }

  addLayer() {
    console.log('adding layer');

    // this.paperDirective.scope.settings.insertItems = true;
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

    // this.paperDirective.scope.settings.insertItems = false;
    // const l2 = new this.paperDirective.ignore.Layer();
    // l2.data.ignore = true; // TODO the insert intercept doesn't catch this in time (unsurprisingly)
    // this.paperDirective.scope.settings.insertItems = true;
    // // this.paperDirective.scope.project.activeLayer.addChild(l2);
    // // (this.paperDirective.project as any).insertLayer(l2);
    // l2.insertAbove(l);

    const l3 = this.paperDirective.ignore(paper.Layer);

    // TODO? maybe implement a "ignored" PaperScope for creating ignored/unimported elements
    // This way, the default for a new Item is to import it to the graph
    // Items coming from the graph will be intercepted once they are load()ed
    // nope... seems objects created from "ignored" scope just get inserted into the regular scope's project anyway (what the actual F)

    // const l = new this.paperDirective.scope.Layer();
    // l.name = 'New Layer';
    const p = this.paperDirective.ignore(paper.Path);
    l.activate();
    p.name = 'New Path';
    const p2 = new paper.Path();

    // l.addChild(p);
    // this.paperDirective.scope.settings.insertItems = true;
    // const proj = this.paperDirective.project as any;
    // proj.insertLayer(l);
    console.log(this.paperDirective.project.layers);
  }
}
