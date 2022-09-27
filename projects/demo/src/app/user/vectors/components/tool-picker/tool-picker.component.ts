import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogService } from '../../../../../../../log/src/lib/log.service';
import { PaperEditDirective } from '../../../../vector/paper-edit.directive';
import { EditVectorComponent } from '../../edit-vector/edit-vector.component';
import { VectorTool } from '../../tools/paper-tool';

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

  private _paperDirective?: PaperEditDirective | undefined;
  public get paperDirective(): PaperEditDirective | undefined {
    return this._paperDirective;
  }
  @Input()
  public set paperDirective(value: PaperEditDirective | undefined) {
    this._paperDirective = value;
    this.changes.markForCheck();
  }

  ngOnInit(): void {
    if (this.paperDirective?.scope?.tools) {
      this.tools = this.paperDirective.scope.tools as any;
      this.activeTool = this.paperDirective.scope.tool as any;
      this.changes.markForCheck();
      this.paperDirective.tool$.subscribe(tool => {
        this.activeTool = tool as any;
        this.changes.markForCheck();
      });
    }
  }


}
