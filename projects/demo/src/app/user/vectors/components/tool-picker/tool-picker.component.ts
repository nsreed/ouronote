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
  private _activeTool?: VectorTool | undefined;
  public get activeTool(): VectorTool | undefined {
    return this._activeTool;
  }
  @Input()
  public set activeTool(value: VectorTool | undefined) {
    this._activeTool = value;
    this.changes.markForCheck();
  }
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


}
