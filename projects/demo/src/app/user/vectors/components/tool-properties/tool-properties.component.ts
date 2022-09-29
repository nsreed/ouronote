import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PaperEditDirective } from '../../../../vector/paper-edit.directive';
import { EditVectorComponent } from '../../edit-vector/edit-vector.component';
import { VectorTool } from '../../tools/paper-tool';

@Component({
  selector: 'app-tool-properties',
  templateUrl: './tool-properties.component.html',
  styleUrls: ['./tool-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolPropertiesComponent implements OnInit {
  _subs = false;
  private _paperEditDirective!: PaperEditDirective;
  public get paperEditDirective(): PaperEditDirective {
    return this._paperEditDirective;
  }
  @Input()
  public set paperEditDirective(value: PaperEditDirective) {
    this._paperEditDirective = value;
    // console.log('got paper edit directive');
    this.onPaperEdit();
  }

  private _activeTool!: VectorTool;
  public get activeTool(): VectorTool {
    return this._activeTool;
  }
  @Input()
  public set activeTool(value: VectorTool) {
    this._activeTool = value;
    this.changes.markForCheck();
  }

  selectedItems: paper.Item[] = [];

  constructor(
    private workspace: EditVectorComponent,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.paperEditDirective) {
      this.onPaperEdit();
    }
  }

  onPaperEdit() {
    if (this._subs) {
      return;
    }
    this._subs = true;
    this.activeTool =
      this.activeTool || (this.paperEditDirective?.scope?.tool as any);
    this.paperEditDirective.tool$.subscribe((tool) => {
      this.activeTool = tool;
      this.changes.markForCheck();
    });
    this.paperEditDirective.selectedItemsChange.subscribe((items) => {
      this.selectedItems = items;
      this.changes.markForCheck();
    });
    this.changes.markForCheck();
  }
}
