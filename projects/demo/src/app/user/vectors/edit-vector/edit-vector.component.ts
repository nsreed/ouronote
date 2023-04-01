import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GunChain } from 'ng-gun';
import * as paper from 'paper';
import { distinct, map, shareReplay, switchMap, take } from 'rxjs/operators';
import { VectorGraph } from '../../VectorGraph';
import { ProjectPair } from '../classes/ProjectPair';
import { OURONOTE_DEFAULT_TITLE } from './../../../constants';

import { CdkDragMove, DragDrop } from '@angular/cdk/drag-drop';
import { TemplatePortal } from '@angular/cdk/portal';
import { ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { LogService } from 'log';
import { NgGunService } from 'ng-gun';
import { ClipboardService } from 'ngx-clipboard';
import { timer } from 'rxjs';
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
import { EraserTool } from '../tools/eraser';
import { EyedropperTool } from '../tools/eyedropper';
import { LineTool } from '../tools/line';
import { MoveTool } from '../tools/move';
import { PanTool } from '../tools/pan';
import { VectorTool } from '../tools/paper-tool';
import { PenTool } from '../tools/pen';
import { ResizeTool } from '../tools/resize';
import { RotateTool } from '../tools/rotate';
import { LassoSelectTool, RectangleSelectTool } from '../tools/select';
import { ShapeTool } from '../tools/shape';
import { TextTool } from '../tools/text';
import { VectorService } from '../vector.service';
import { ShortcutInput } from 'ng-keyboard-shortcuts';

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
  public paperDirective!: PaperEditDirective;

  state = {
    showToolProperties: false,
  };

  previewSVG?: SafeHtml;
  project!: paper.Project;
  projectPair!: ProjectPair;

  selectedItems: paper.Item[] = [];

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

  media$ = this.media.asObservable().pipe();
  mediaAlias$ = this.media$.pipe(
    map((mc) => {
      return mc.reduce(
        (sizeDict, change) => ({ ...sizeDict, [change.mqAlias]: change }),
        {}
      );
    }),
    shareReplay(1)
  );

  editToast?: MatSnackBarRef<TextOnlySnackBar>;
  activeTool?: VectorTool;

  get toolClasses(): any[] {
    return [
      PenTool,
      EraserTool,
      ShapeTool,
      LineTool,
      TextTool,
      EyedropperTool,
      PanTool,
      RectangleSelectTool,
      LassoSelectTool,
      MoveTool,
      RotateTool,
      ResizeTool,
    ];
  }

  get tools(): VectorTool[] {
    return this.paperDirective.scope.tools as any;
  }

  portify(content: TemplateRef<any>) {
    return new TemplatePortal(content, this._viewContainerRef);
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
    public settings: SettingsService,
    private changes: ChangeDetectorRef,
    public matBottomSheet: MatBottomSheet,
    public dragDrop: DragDrop,
    private matSidenav: MatSidenavContainer,
    private media: MediaObserver,
    private _viewContainerRef: ViewContainerRef
  ) {
    super(vectorService, route, ngGun, userService);
    this.logger = logger.supplemental('edit-vector');
  }

  ngOnDestroy(): void {
    this.projectPair?.destroy();
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

  ngAfterViewInit(): void {
    this.toolPickerPortal = this.portify(this.toolPickerContent);
    this.titleBarPortal = this.portify(this.titleBarContent);
    this.menusPortal = this.portify(this.menusContent);
    this.toolPropertiesPortal = this.portify(this.toolPropertiesContent);

    // this.matBottomSheet.open(this.bottomSheet as any);

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
        this.changes.detectChanges();
      }
    });
  }

  shortcuts: ShortcutInput[] = [
    { key: 'ctrl', command: () => this.tools[1].activate() },
    { key: 'ctrl + 1', command: () => this.tools[0].activate() },
  ];

  onOpenSidenavClick() {
    this.matSidenav.open();
  }

  onRightChevronClick(e: any, sideNav: MatSidenav) {
    // if (this.selectedItems.length === 0) {
    //   sideNav.close();
    //   return;
    // }
    sideNav.toggle();
  }

  @ViewChild('BottomSheet')
  bottomSheet?: TemplateRef<any>;

  // onConstrainDrag(
  //   upp: Point,
  //   dragRef: DragRef,
  //   dimensions: ClientRect,
  //   pickupPositionInEl: Point
  // ) {
  //   return {
  //     x: dragRef.getRootElement().offsetLeft,
  //     y: dragRef.getRootElement().offsetTop,
  //   };
  // }
  onBottomBarDrag(event: CdkDragMove) {
    if (Math.abs(event.distance.y) > 40) {
      console.log('you did it!');
      if (this.bottomSheet && !this.matBottomSheet._openedBottomSheetRef) {
        this.matBottomSheet
          .open(this.bottomSheet, { backdropClass: '' })
          .afterDismissed()
          .subscribe(() => {
            this.dragDrop.createDrag(event.source.element);
          });
        event.source._dragRef.reset();
        event.source.reset();
        event.source._dragRef.dispose();
      }
    }
  }

  onToolContainerScroll(event: WheelEvent, container: HTMLElement) {
    container.scrollLeft += event.deltaY;
  }

  toggleToolProperties() {
    this.state.showToolProperties = !this.state.showToolProperties;
    if (this.state.showToolProperties) {
      // this.leftSide.open();
      // this.matBottomSheet
      //   .open(this.toolPropertiesContent, {
      //     backdropClass: 'mat-card',
      //   })
      //   .afterDismissed()
      //   .subscribe(() => {
      //     this.state.showToolProperties = true;
      //     this.toggleToolProperties();
      //   });
    } else {
      // this.leftSide.close();
      // this.matBottomSheet.dismiss();
    }
  }

  onToolDoubleClick(tool: VectorTool) {
    this.logger.log(`someone wants to open tool details`);
    this.toggleToolProperties();
  }

  @ViewChild('RightSide')
  rightSide!: MatSidenav;

  @ViewChild('LeftSide')
  leftSide!: MatSidenav;
  toolPickerPortal!: TemplatePortal;
  toolPropertiesPortal!: TemplatePortal;
  titleBarPortal!: TemplatePortal;
  menusPortal!: TemplatePortal;

  @ViewChild('TitleBar')
  titleBarContent!: TemplateRef<any>;

  @ViewChild('Menus')
  menusContent!: TemplateRef<any>;

  @ViewChild('ToolProperties')
  toolPropertiesContent!: TemplateRef<any>;

  @ViewChild('ToolPicker')
  toolPickerContent!: TemplateRef<unknown>;

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
    let count = 0;
    // around(project.view, 'update', (...args: any[]) => {
    //   if (count++ % 8 === 0) {
    //     return;
    //   }
    //   const n = args.pop();
    //   n(...args);
    // });
    // this.logger.monitor(project.view, 'update', 1000 / 60, 1000);
    let lastSelected: paper.Item[] = [];
    (project as IEnhancedPaper).selectedItems$.subscribe((items) => {
      this.logger.verbose('selected items change', items.length);
      lastSelected.forEach((item) => {
        // Do sanity checks?
        if (item instanceof paper.PointText) {
          if (item.content === '') {
            item.remove();
          }
        }
      });
      lastSelected = items;
      this.selectedItems = items;
      if (items.length === 0) {
        this.rightSide.close();
      } else {
        this.rightSide.open();
      }
    });
    project.currentStyle.strokeWidth = 3;
    this.activeTool = this.paperDirective.scope.tool as any;
    this.paperDirective.tool$.subscribe((tool) => {
      this.activeTool = tool;
    });
    this.changes.detectChanges();
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
    if (this.project?.activeLayer.data.ignore) {
      const drawLayer = this.project?.getItem({
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
  onUndoClick() {
    if (this.paperDirective?.scope?.actions) {
      const undoAction = this.paperDirective.scope.actions.pop();
      undoAction?.undoFn();
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
        this.project?.deselectAll();
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
        layoutVertical(rasters, this.project?.view.center);
        rasters.forEach((raster: any) => {
          raster.pair?.doSave();
        });

        this.tools.find((t: any) => t.name === 'move')?.activate();
      });
  }
}
