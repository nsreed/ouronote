import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as paper from 'paper';
import { take, distinct } from 'rxjs/operators';
import { GunChain } from '../../../../../../ng-gun/src/lib/classes/GunChain';
import { Vector } from '../../../model';
import { ProjectPair } from '../classes/ProjectPair';
import { PaperDirective } from '../paper.directive';
import { RouteVectorDirective } from '../route-vector.directive';
import { VectorService } from '../vector.service';
import { gunifyProject as gunifyProject } from './converter-functions';
import { FormBuilder, Validators } from '@angular/forms';

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

  vectorForm = this.fb.group({
    title: [null, Validators.required],
  });

  constructor(
    vectorService: VectorService,
    route: ActivatedRoute,
    private ngZone: NgZone,
    private fb: FormBuilder
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
      node
        .get('title')
        .on()
        .subscribe((title: any) => {
          console.log('title change', title);
          this.vectorForm.get('title')?.patchValue(title, { emitEvent: false });
        });
      this.vectorForm
        .get('title')
        ?.valueChanges.pipe(distinct())
        .subscribe((title) => {
          console.log('local title change', title);
          node.get('title').put(title);
        });
    });
    this.vector$.subscribe((vector: Vector) => {
      // console.log('vector change', vector, this.paperDirective);
      if (!this.paperDirective.project) {
        return;
      }
      this.project = this.paperDirective.project;
      this.paperDirective.pen.activate();
    });
  }

  ngOnInit(): void {}

  onProjectDataChange(project: paper.Project, gun: GunChain<Vector>) {
    console.log('setting up project graph');
    // this.paperDirective.tool.activate();
    const paperChain: ProjectPair = new ProjectPair(
      gun as any,
      this.paperDirective.project as any,
      this.paperDirective.scope as any
    );
  }

  addLayer() {
    console.log('adding layer');
    const layer = new paper.Layer();
    console.log(this.paperDirective.project.layers);
    (layer as any).pair.save();
  }

  onIgnored() {
    const layer = new paper.Layer();
    layer.data.ignored = true;
  }
}
