import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as paper from 'paper';
import {
  take,
  distinct,
  map,
  shareReplay,
  switchMap,
  filter,
} from 'rxjs/operators';
import { GunChain } from '../../../../../../ng-gun/src/lib/classes/GunChain';
import { VectorGraph } from '../../VectorGraph';
import { ProjectPair } from '../classes/ProjectPair';
import { PaperDirective } from '../paper.directive';
import { RouteVectorDirective } from '../route-vector.directive';
import { VectorService } from '../vector.service';
import { gunifyProject as gunifyProject } from './converter-functions';
import { FormBuilder, Validators } from '@angular/forms';
import { NgGunService } from '../../../../../../ng-gun/src/lib/ng-gun.service';
import { getDeep, unpack } from '../functions/packaging';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LogService } from 'projects/log/src/public-api';
import { saveAs } from 'file-saver';
import { UserService } from '../../user.service';
import { gunUpdateTime } from 'projects/ng-gun/src/lib/functions/gun-utils';
import { FileUploaderComponent } from '../../../files/file-uploader/file-uploader.component';
import { MatDialog } from '@angular/material/dialog';
import { PaperEditDirective } from '../paper-edit.directive';
import { ClipboardService } from 'ngx-clipboard';

const VECTOR_PAPER_JSON_KEY = 'graph';

@Component({
  templateUrl: './edit-vector.component.html',
  styleUrls: ['./edit-vector.component.scss'],
})
export class EditVectorComponent
  extends RouteVectorDirective
  implements OnInit, AfterViewInit
{
  @ViewChild('paper')
  private paperDirective!: PaperEditDirective;

  previewSVG?: SafeHtml;
  project!: paper.Project;
  projectPair!: ProjectPair;

  vectorForm = this.fb.group({
    title: [null, Validators.required],
  });
  requests$ = this.vectorNode$.pipe(
    // TODO make sure this open() call isn't making the program die
    switchMap((chain) => chain.get('inviteRequests').open()),
    map((requests: any) => Object.keys(requests).filter((k) => requests[k])),
    shareReplay(1)
  );
  myRequest$ = this.requests$.pipe(
    map((pks) => {
      return pks.includes(this.userService.user.is.pub);
      // return pks === this.userService.user.is.pub;
    })
  );
  requestCount$ = this.requests$.pipe(map((r) => r.length));

  constructor(
    private dialog: MatDialog,
    protected vectorService: VectorService,
    route: ActivatedRoute,
    private ngZone: NgZone,
    private fb: FormBuilder,
    ngGun: NgGunService,
    private sanitizer: DomSanitizer,
    private logger: LogService,
    public userService: UserService,
    private cb: ClipboardService
  ) {
    super(vectorService, route, ngGun, userService);
    this.logger = logger.supplemental('edit-vector.component');
  }

  ngAfterViewInit(): void {
    this.vectorNode$.subscribe((node) => {
      if (!this.paperDirective.project) {
        console.warn('NO PAPER PROJECT');
        return;
      }

      // const p = new paper.Project(new paper.Size(300, 300));
      // node
      //   .get('layers')
      //   .open()
      //   .subscribe((layers) => {
      //     // const layersJSON = JSON.stringify(unpack(layers));
      //     // // console.log('layers', layersJSON);
      //     // p.clear();
      //     // p.importJSON(layersJSON);
      //     // const layersSVG = p.exportSVG({ asString: true }) as string;
      //     // // console.log('SVG', layersSVG);
      //     // this.preview.project.activate();
      //     // this.preview.project.clear();
      //     // this.preview.project.importSVG(layersSVG);
      //     // this.preview.project.view.update();
      //     // // (this.preview.project as any).draw();
      //     // this.paperDirective.project.activate();
      //     // this.previewSVG = this.sanitizer.bypassSecurityTrustHtml(
      //     //   layersSVG
      //     // ) as string;
      //     // this.preview.project.activate();
      //     // this.preview.project.clear();
      //     // try {
      //     //   this.preview.project.importJSON(layersJSON);
      //     // } catch (e: any) {
      //     //   console.log('problem importing', e);
      //     // }
      //     // this.paperDirective.project.activate();
      //   });
      this.onProjectReady(this.paperDirective.project as any, node as any);
      node
        .get('title')
        .on()
        .subscribe((title: any) => {
          // console.log('title change', title);
          this.vectorForm.get('title')?.patchValue(title, { emitEvent: false });
        });
      this.vectorNode = node;
      this.vectorForm
        .get('title')
        ?.valueChanges.pipe(distinct())
        .subscribe((title) => {
          // console.log('local title change', title);
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
    // console.log('setting up project graph');
    // this.paperDirective.tool.activate();
    this.logger.log('project ready');
    this.projectPair = new ProjectPair(
      gun as any,
      this.paperDirective.project as any,
      this.paperDirective.scope as any,
      new LogService()
    );
  }

  copyLink() {
    this.cb.copy(window.location.href);
  }

  onPaste(e: any) {
    console.log(e);
  }

  addLayer() {
    this.logger.log('adding layer');
    const layer = new paper.Layer();
    (layer as any).pair.save();
  }

  async download() {
    const jsonBlob = new Blob([this.project.exportJSON()], {
      type: 'text/plain;charset=utf-8',
    });
    const username = this.userService.user.alias;
    const title = await this.vectorNode.get('title').once().toPromise();
    const updated = new Date(this.vectorNode.updateTime).toISOString();
    saveAs(jsonBlob, `${username}-${title}-${updated}.json`);
  }

  importPaper() {
    this.dialog
      .open(FileUploaderComponent)
      .afterClosed()
      .subscribe((files) => {
        for (const file of files) {
          const fr: FileReader = new FileReader();
          fr.readAsText(file);
          fr.onload = () => {
            try {
              // const parsed = JSON.parse(fr.result as any);
              this.paperDirective.project.importJSON(fr.result as string);
            } catch (e: any) {
              this.logger.error('Error parsing JSON file');
            }
          };
          fr.onerror = () => {
            console.error('Error while reading reading file');
          };
        }
      });
  }

  logDeep() {
    console.log(getDeep(this.paperDirective.project));
  }

  requestAccess() {
    this.vectorNode
      .get('inviteRequests')
      .get(this.userPub)
      .put(true as never);
    this.favorite();
  }

  favorite() {
    this.userService.user.get('vectors').set(this.vectorNode.gun as never);
  }

  onUndoClick() {
    this.logger.log('would undo');
    console.log(this.paperDirective.scope);
    if (this.paperDirective.scope?.actions) {
      const undoAction = this.paperDirective.scope.actions.pop();
      undoAction?.undoFn();
    }
  }
}
