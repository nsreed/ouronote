import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as paper from 'paper';
import { take, distinct, map } from 'rxjs/operators';
import { GunChain } from '../../../../../../ng-gun/src/lib/classes/GunChain';
import { VectorGraph } from '../../VectorGraph';
import { ProjectPair } from '../classes/ProjectPair';
import { PaperDirective } from '../paper.directive';
import { RouteVectorDirective } from '../route-vector.directive';
import { VectorService } from '../vector.service';
import { gunifyProject as gunifyProject } from './converter-functions';
import { FormBuilder, Validators } from '@angular/forms';
import { NgGunService } from '../../../../../../ng-gun/src/lib/ng-gun.service';
import { unpack } from '../classes/packaging';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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

  @ViewChild('preview')
  private preview!: PaperDirective;

  previewSVG?: SafeHtml;

  private isLoaded = false;
  project!: paper.Project;

  vectorForm = this.fb.group({
    title: [null, Validators.required],
  });

  constructor(
    vectorService: VectorService,
    route: ActivatedRoute,
    private ngZone: NgZone,
    private fb: FormBuilder,
    ngGun: NgGunService,
    private sanitizer: DomSanitizer
  ) {
    super(vectorService, route, ngGun);
  }

  ngAfterViewInit(): void {
    this.vectorNode$.subscribe((node) => {
      if (!this.paperDirective.project) {
        console.warn('NO PAPER PROJECT');
        return;
      }

      // const p = new paper.Project(new paper.Size(300, 300));
      node
        .get('layers')
        .open()
        .subscribe((layers) => {
          // const layersJSON = JSON.stringify(unpack(layers));
          // // console.log('layers', layersJSON);
          // p.clear();
          // p.importJSON(layersJSON);
          // const layersSVG = p.exportSVG({ asString: true }) as string;
          // // console.log('SVG', layersSVG);
          // this.preview.project.activate();
          // this.preview.project.clear();
          // this.preview.project.importSVG(layersSVG);
          // this.preview.project.view.update();
          // // (this.preview.project as any).draw();
          // this.paperDirective.project.activate();
          // this.previewSVG = this.sanitizer.bypassSecurityTrustHtml(
          //   layersSVG
          // ) as string;
          // this.preview.project.activate();
          // this.preview.project.clear();
          // try {
          //   this.preview.project.importJSON(layersJSON);
          // } catch (e: any) {
          //   console.log('problem importing', e);
          // }
          // this.paperDirective.project.activate();
        });
      this.onProjectReady(this.paperDirective.project as any, node as any);
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
    this.vector$.subscribe((vector: VectorGraph) => {
      // console.log('vector change', vector, this.paperDirective);
      if (!this.paperDirective.project) {
        return;
      }
      this.project = this.paperDirective.project;
      this.paperDirective.pen.activate();
    });
  }

  ngOnInit(): void {}

  onProjectReady(project: paper.Project, gun: GunChain<VectorGraph>) {
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
}
