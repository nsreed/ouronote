import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VectorTool } from '../../tools/paper-tool';
import { PenTool } from '../../tools/pen';

@Component({
  selector: 'app-stroke-width-form',
  templateUrl: './stroke-width-form.component.html',
  styleUrls: ['./stroke-width-form.component.scss'],
})
export class StrokeWidthFormComponent implements OnInit {
  min = 1;
  max = 30;
  widthCtl = this.fb.control([
    5,
    Validators.min(this.min),
    Validators.max(this.max),
  ]);

  private _tool!: PenTool;
  public get tool(): PenTool {
    return this._tool;
  }
  @Input()
  public set tool(value: PenTool) {
    this._tool = value;
    this.widthCtl.patchValue(value.style?.strokeWidth);
    // console.log((value as any).___PROPERTIES);
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.widthCtl.valueChanges.subscribe((v) => {
      // this.style.strokeWidth = v;
      if (this.tool.style) {
        this.tool.style.strokeWidth = v;
      }
    });
  }

  formatLabel(value: number) {
    return `${value}px`;
  }
}
