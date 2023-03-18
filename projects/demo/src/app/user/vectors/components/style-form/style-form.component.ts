import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import * as paper from 'paper';
import { UntypedFormBuilder } from '@angular/forms';
import { serializeValue } from '../../functions/packaging';
import { Style } from 'paper';

function getColorValue(value: any) {
  if (!value) {
    return null;
  }
  if ('string' === typeof value) {
    return value;
  }
  if (value instanceof paper.Color) {
    const css = value.toCSS(true);
    const alpha = Math.round(value.alpha * 255).toString(16);
    return value.alpha < 1 ? css + alpha : css;
  }
  return value === null
    ? value
    : typeof value === 'string'
    ? value
    : value.toCSS(true);
}

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
    if (JSON.stringify(this._style) === JSON.stringify(value)) {
      return;
    }
    this._style = value;

    console.log('set style', value);

    // TODO find a much better way to do this
    this.form.controls.strokeWidth.patchValue(value.strokeWidth, {
      onlySelf: true,
      emitEvent: false,
    });
    this.form.controls.fillColor.patchValue(getColorValue(value.fillColor), {
      onlySelf: true,
      emitEvent: false,
    });
    this.form.controls.strokeColor.patchValue(
      getColorValue(value.strokeColor),
      {
        onlySelf: true,
        emitEvent: false,
      }
    );
    this.form.controls.shadowColor.patchValue(
      getColorValue(value.shadowColor),
      {
        onlySelf: true,
        emitEvent: false,
      }
    );
    this.form.controls.fontSize.patchValue(value.fontSize, {
      onlySelf: true,
      emitEvent: false,
    });

    this.changeDetectorRef.detectChanges();
  }

  @Output()
  styleChange = new EventEmitter<paper.Style>();

  @Output()
  stylePropChange = new EventEmitter<[string, any]>();

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
    dashArray: null,
    dashOffset: null,
    fillColor: null,
    fillRule: 'nonzero',
    fontFamily: null,
    fontSize: null,
    fontWeight: null,
    justification: null,
    leading: null,
    miterLimit: null,
    shadowBlur: null,
    shadowColor: null,
    shadowOffset: null,
    strokeCap: 'round',
    strokeColor: null,
    strokeJoin: 'round',
    strokeScaling: true,
    strokeWidth: null,
  });

  constructor(
    private fb: UntypedFormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.form.valueChanges.subscribe((v) => {
      const ns = new paper.Style(v);
      this.styleChange.emit(ns);
    });
    // tslint:disable-next-line: forin
    for (const k in this.form.controls) {
      const control = this.form.controls[k];
      control.valueChanges.subscribe((vc) => {
        this.stylePropChange.emit([k, vc]);
        this.changeDetectorRef.markForCheck();
      });
    }
  }

  ngOnInit(): void {}

  colorForm(color: paper.Color) {
    const group = this.fb.group({
      mode: null,
    });
  }

  onChange(name: string, value: any) {
    this.form.get(name)?.setValue(value);
  }
}
