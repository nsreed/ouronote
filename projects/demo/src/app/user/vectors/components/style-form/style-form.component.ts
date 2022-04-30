import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import * as paper from 'paper';
import { FormBuilder } from '@angular/forms';
import { serializeValue } from '../../functions/packaging';
import { Style } from 'paper';

@Component({
  selector: 'app-style-form',
  templateUrl: './style-form.component.html',
  styleUrls: ['./style-form.component.scss'],
})
export class StyleFormComponent implements OnInit {
  private _style!: paper.Style;
  public get style(): paper.Style {
    return this._style;
  }
  @Input()
  public set style(value: paper.Style) {
    if (JSON.stringify(this._style) !== JSON.stringify(value)) {
      this._style = value;
      console.log('set style', value);
      this.form.controls.strokeWidth.setValue(value.strokeWidth);
      this.form.controls.strokeColor.setValue(
        (value.strokeColor as any).toCSS(true)
      );
    }
    // const json = serializeValue(value);
    // console.log(json);
    // this.form.patchValue((value as any).exportJSON({ asString: false })[1], {
    //   onlySelf: true,
    //   emitEvent: false,
    // });
  }

  @Output()
  styleChange = new EventEmitter<paper.Style>();

  categories = {
    stroke: [
      'strokeWidth',
      'strokeColor',
      'strokeCap',
      'strokeJoin',
      'strokeScaling',
      'miterLimit',
      'dashOffset',
      'dashArray',
    ],
    text: ['fontWeight', 'fontSize', 'fontFamily', 'leading', 'justification'],
    fill: ['fillColor', 'fillRule'],
    shadow: ['shadowColor', 'shadowBlur', 'shadowOffset'],
  };

  form = this.fb.group({
    strokeWidth: null,
    strokeColor: null,
    strokeCap: 'round',
    strokeJoin: 'round',
    strokeScaling: true,
    dashOffset: null,
    dashArray: null,
    fillColor: null,
    fillRule: 'nonzero',
    shadowColor: null,
    shadowBlur: null,
    shadowOffset: null,
    fontFamily: null,
    fontWeight: null,
    fontSize: null,
    leading: null,
    justification: null,
    miterLimit: null,
  });

  constructor(private fb: FormBuilder) {
    this.form.valueChanges.subscribe((v) => {
      const ns = new paper.Style(v);
      this.styleChange.emit(ns);
    });
  }

  ngOnInit(): void {}

  colorForm(color: paper.Color) {
    const group = this.fb.group({
      mode: null,
    });
  }
}
