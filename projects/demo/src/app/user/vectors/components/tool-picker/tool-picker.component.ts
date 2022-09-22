import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogService } from '../../../../../../../log/src/lib/log.service';
import { FileUploaderComponent } from '../../../../files/file-uploader/file-uploader.component';
import { EditVectorComponent } from '../../edit-vector/edit-vector.component';
import { layoutVertical } from '../../functions/paper-functions';
import { VectorTool } from '../../tools/paper-tool';
import * as paper from 'paper';
import { PaperDirective } from '../../../../vector/paper.directive';
import { PaperEditDirective } from '../../../../vector/paper-edit.directive';

@Component({
  selector: 'app-tool-picker',
  templateUrl: './tool-picker.component.html',
  styleUrls: ['./tool-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolPickerComponent implements OnInit {

  constructor(private logger: LogService, public editWorkspace: EditVectorComponent, private changes: ChangeDetectorRef, private dialog: MatDialog) { }
  @Input()
  tools: VectorTool[] = [];
  @Input()
  activeTool?: VectorTool;
  @Input()
  paper?: paper.PaperScope;
  @Input()
  paperDirective?: PaperEditDirective;

  ngOnInit(): void {
    if (this.paperDirective?.scope?.tools) {
      this.tools = this.paperDirective.scope.tools as any;
      this.changes.markForCheck();
      this.paperDirective.tool$.subscribe(tool => {
        this.activeTool = tool as any;
        this.changes.markForCheck();
      });
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
        this.editWorkspace.project.deselectAll();
        this.logger.log('processing files');
        this.editWorkspace.activateDrawLayer();

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
        layoutVertical(rasters, this.editWorkspace.project.view.center);
        rasters.forEach((raster: any) => {
          raster.pair?.doSave();
        });

        this.tools.find((t: any) => t.name === 'move')?.activate();
      });
  }
}
