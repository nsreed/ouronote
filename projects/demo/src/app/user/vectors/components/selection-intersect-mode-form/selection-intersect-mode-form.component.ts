import { Component, OnInit, Input } from '@angular/core';
import { VectorTool } from '../../tools/paper-tool';
import { FormBuilder } from '@angular/forms';
import { LassoSelectTool } from '../../tools/select';

@Component({
  selector: 'app-selection-intersect-mode-form',
  templateUrl: './selection-intersect-mode-form.component.html',
  styleUrls: ['./selection-intersect-mode-form.component.scss'],
})
export class SelectionIntersectModeFormComponent implements OnInit {
  inclusiveCtl = this.fb.control(true);

  private _tool!: VectorTool;
  public get tool(): VectorTool {
    return this._tool;
  }
  @Input()
  public set tool(value: VectorTool) {
    this._tool = value;
    if (this.tool instanceof LassoSelectTool) {
      this.inclusiveCtl.patchValue(
        (this.tool as LassoSelectTool).inclusiveMatch
      );
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inclusiveCtl.valueChanges.subscribe((v) => {
      if (this.tool instanceof LassoSelectTool) {
        this.tool.inclusiveMatch = v;
      }
    });
  }
}
