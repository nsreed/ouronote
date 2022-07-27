import {
  AfterViewInit,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as paper from 'paper';
import { distinct, map, shareReplay, switchMap, take } from 'rxjs/operators';
import { GunChain } from '../../../../../../ng-gun/src/lib/classes/GunChain';
import { VectorGraph } from '../../VectorGraph';
import { ProjectPair } from '../classes/ProjectPair';
import { OURONOTE_DEFAULT_TITLE } from './../../../constants';

import { ElementRef } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { ClipboardService } from 'ngx-clipboard';
import { LogService } from 'projects/log/src/public-api';
import { timer } from 'rxjs';
import { NgGunService } from '../../../../../../ng-gun/src/lib/ng-gun.service';
import { VERSION } from '../../../../environments/version';
import { FileUploaderComponent } from '../../../files/file-uploader/file-uploader.component';
import { SettingsService } from '../../../settings.service';
import { IEnhancedPaper } from '../../../vector/IEnhancedPaper';
import { PaperEditDirective } from '../../../vector/paper-edit.directive';
import { UserService } from '../../user.service';
import { SettingsDialogComponent } from '../components/settings-dialog/settings-dialog.component';
import { getDeep } from '../functions/packaging';
import { layoutVertical } from '../functions/paper-functions';
import { RouteVectorDirective } from '../route-vector.directive';
import { VectorTool } from '../tools/paper-tool';
import { VectorService } from '../vector.service';

@Component({
  templateUrl: './edit-vector.component.html',
  styleUrls: ['./edit-vector.component.scss'],
})
export class EditVectorComponent
  extends RouteVectorDirective
  implements OnInit, AfterViewInit, OnDestroy
{
  href = window.location.href;
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
    })
  );
  requestCount$ = this.requests$.pipe(map((r) => r.length));

  @ViewChild('EditRequestsTooltip')
  editRequestsTooltip?: MatTooltip;

  editToast?: MatSnackBarRef<TextOnlySnackBar>;

  get tools(): VectorTool[] {
    return this.paperDirective.scope.tools as any;
  }

  constructor(
    private dialog: MatDialog,
    protected vectorService: VectorService,
    route: ActivatedRoute,
    private ngZone: NgZone,
    private fb: UntypedFormBuilder,
    ngGun: NgGunService,
    private sanitizer: DomSanitizer,
    private logger: LogService,
    public userService: UserService,
    private cb: ClipboardService,
    private snackbar: MatSnackBar,
    private el: ElementRef,
    public settings: SettingsService
  ) {
    super(vectorService, route, ngGun, userService);
    this.logger = logger.supplemental('edit-vector');
  }
  ngOnDestroy(): void {
    this.projectPair?.destroy();
  }

  ngAfterViewInit(): void {
    this.requestCount$.subscribe((count) => {
      if (count > 0 && this.editRequestsTooltip) {
        this.editRequestsTooltip.message = `There are ${count} edit requests.`;
        this.editRequestsTooltip.show();
        timer(5000).subscribe(() => this.editRequestsTooltip?.hide());
      }
    });
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
          this.vectorForm.get('title')?.patchValue(title, { emitEvent: false });
        });
      this.vectorNode = node;
      this.vectorForm
        .get('title')
        ?.valueChanges.pipe(distinct())
        .subscribe((title) => {
          node.get('title').put(title);
        });
    });
    this.vector$.subscribe((vector: VectorGraph) => {
      if (!this.paperDirective.project) {
        this.logger.error('vector$ but no paperDirective.project', vector);
        return;
      }
      this.project = this.paperDirective.project;
    });

    this.canEdit$.subscribe((ce) => {
      if (ce) {
        // TODO don't select pen tool if user has already panned
        this.paperDirective.pen.activate();
      }
    });
  }

  ngOnInit(): void {
    // TODO display appropriate document title
    this.vector$.subscribe((v) => {
      window.document.title = `${v.title} - ${OURONOTE_DEFAULT_TITLE}`;
    });

    this.myRequest$.subscribe((myRequest) => {
      if (myRequest) {
        this.showRequestToast();
      } else {
        this.hideRequestToast();
      }
    });
  }

  showRequestToast() {
    this.owner$
      .pipe(
        map((owners) => Object.keys(owners)),
        map((ownerKeys) => ownerKeys[0]),
        switchMap((ownerKey) => this.ngGun.findUserAlias(ownerKey))
      )
      .subscribe((owners) => {
        this.editToast = this.snackbar.open(
          `Edit access has been requested. Waiting for @${owners} to approve access.`,
          'dismiss',
          { duration: Infinity }
        );
        this.canEdit$.pipe(take(1)).subscribe((canEdit) => {
          if (canEdit) {
            this.editToast?.dismiss();
          }
        });
      });
  }

  hideRequestToast() {
    this.editToast?.dismiss();
  }

  onProjectReady(project: paper.Project, gun: GunChain<VectorGraph>) {
    this.logger.verbose(`project ready ${gun.recordPub}`);
    this.projectPair = new ProjectPair(
      gun as any,
      this.paperDirective.project as any,
      this.paperDirective.scope as any,
      new LogService()
    );
    let lastSelected: paper.Item[] = [];
    (project as IEnhancedPaper).selectedItems$.subscribe((items) => {
      lastSelected.forEach((item) => {
        // Do sanity checks?
        if (item instanceof paper.PointText) {
          if (item.content === '') {
            item.remove();
          }
        }
      });
      lastSelected = items;
    });
    project.currentStyle.strokeWidth = 3;
  }

  onFullscreenClick(event: MouseEvent) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }

    window.document.body
      .requestFullscreen()
      .catch((err) => this.logger.warn(`could not go fullscreen: ${err.name}`));
  }

  copyViewLink() {
    const linkURL = `${window.location.protocol}//${window.location.host}/view/${this.vectorNode.recordPub}`;
    this.cb.copy(linkURL);
    this.snackbar.open('Link copied to clipboard!', 'dismiss', {
      verticalPosition: 'top',
    } as MatSnackBarConfig);
  }

  copyEditLink() {
    const linkURL = `${window.location.protocol}//${window.location.host}/user/vectors/${this.vectorNode.recordPub}/edit`;
    this.cb.copy(linkURL);
    this.snackbar.open('Link copied to clipboard!', 'dismiss', {
      verticalPosition: 'top',
    } as MatSnackBarConfig);
  }

  onPaste(e: any) {
    console.log(e);
  }

  onCopyrightClick() {
    this.vector$.pipe(take(1)).subscribe((v: any) => {
      this.dialog.open(SettingsDialogComponent, {
        width: '80%',
        height: '80%',
        data: {
          vectorPub: v._['#'],
          mode: 'license',
        },
      });
    });
  }

  onContentValueChange(pt: paper.PointText, value: string) {
    pt.content = value;
    (pt as any).pair.save(['content', 'position']);
  }

  onContentBlur(pt: paper.PointText, value: any) {
    // if (pt.content === '') {
    //   pt.remove();
    // }
  }

  activateDrawLayer() {
    if (this.project.activeLayer.data.ignore) {
      const drawLayer = this.project.getItem({
        className: 'Layer',
        data: {
          ignore: undefined,
        },
      }) as paper.Layer;
      if (drawLayer) {
        drawLayer.activate();
      } else {
        const newDrawLayer = new paper.Layer();
        newDrawLayer.activate();
      }
    }
  }

  onInsertImageClick() {
    this.dialog
      .open(FileUploaderComponent, {
        data: {
          extensions: ['png', 'jpg', 'jpeg'],
        },
      })
      .afterClosed()
      .subscribe(async (files) => {
        if (!files || files.length === 0) {
          return;
        }
        this.project.deselectAll();
        this.logger.log('processing files');
        this.activateDrawLayer();

        const readers = files.map((file: File) => {
          const reader = new FileReader();
          return new Promise((res, rej) => {
            reader.onloadend = () => {
              res(reader.result);
            };
            reader.onerror = (ev: ProgressEvent<FileReader>) => {
              this.logger.error(
                'Error: %s event reading file "%s": %s',
                ev.target?.error?.name,
                file.name,
                ev.target?.error?.message,
                ev.target?.error?.stack
              );
            };
            reader.readAsDataURL(file);
          });
        });

        const results = await Promise.all(readers);
        const rasters = results.map((result) => {
          const b64 = result;
          const raster = new paper.Raster(b64 as string);
          raster.selected = true;

          return raster;
        });

        const loads = rasters
          .filter((r) => !r.loaded)
          .map(
            (raster) =>
              new Promise((res, rej) => {
                raster.onLoad = res;
                raster.onError = rej;
              })
          );
        await Promise.all(loads);
        layoutVertical(rasters, this.project.view.center);
        rasters.forEach((raster: any) => {
          raster.pair?.doSave();
        });

        this.tools.find((t: any) => t.name === 'move')?.activate();
      });
  }

  addLayer() {
    this.logger.log('adding layer');
    const layer = new paper.Layer();
    (layer as any).pair.save();
  }

  async download() {
    // console.log(this.project.exportJSON({ asString: false }));
    const username = this.userService.user.alias + '-' || '';
    const title = await this.vectorNode.get('title').once().toPromise();
    const updated = new Date(this.vectorNode.updateTime).toISOString();
    const projectJSON = {
      ...getDeep(this.project),
      title,
      ouronote: {
        ...VERSION,
      },
    }; // this.project.exportJSON();

    const jsonBlob = new Blob([JSON.stringify(projectJSON)], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(jsonBlob, `${username}${title}-${updated}.json`);
  }

  async downloadImage() {
    const canvas = this.paperDirective.canvas;
    const data = canvas.toDataURL();
    const tmpLink = document.createElement('a');
    const username = this.userService.user.alias + '-' || '';
    const title = await this.vectorNode.get('title').once().toPromise();
    const updated = new Date(this.vectorNode.updateTime).toISOString();
    tmpLink.download = `${username}${title}-${updated}.png`;
    tmpLink.href = data;
    this.el.nativeElement.appendChild(tmpLink);
    tmpLink.click();
    this.el.nativeElement.removeChild(tmpLink);
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
    if (this.paperDirective.scope?.actions) {
      const undoAction = this.paperDirective.scope.actions.pop();
      undoAction?.undoFn();
    }
  }

  onPeopleClick() {
    this.vector$.pipe(take(1)).subscribe((v: any) => {
      this.dialog.open(SettingsDialogComponent, {
        width: '80%',
        height: '80%',
        data: {
          vectorPub: v._['#'],
          mode: 'people',
        },
      });
    });
  }

  onGenerateTestPatternClick() {
    if (this.project) {
      this.logger.log('generating test pattern');
      this.activateDrawLayer();
      const r = 10;
      const max = 10;
      for (let x = 0; x < r * max; x += r) {
        const s = new paper.Shape.Rectangle(
          new paper.Rectangle(new paper.Point(x, x), new paper.Size(r, r))
        );
      }
    }
  }
}
