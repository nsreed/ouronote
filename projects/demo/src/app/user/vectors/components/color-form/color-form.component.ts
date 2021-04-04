import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as paper from 'paper';
import { filter } from 'rxjs/operators';

const RE_HEX = /^\#.*/;

@Component({
  selector: 'app-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.scss'],
})
export class ColorFormComponent implements OnInit {
  form = this.fb.group({
    red: [0, [Validators.min(0), Validators.max(1)]],
    green: [0, [Validators.min(0), Validators.max(1)]],
    blue: [0, [Validators.min(0), Validators.max(1)]],
    hue: 0,
    saturation: [0, [Validators.min(0), Validators.max(1)]],
    lightness: [0, [Validators.min(0), Validators.max(1)]],
    brightness: [0, [Validators.min(0), Validators.max(1)]],
    alpha: [1, [Validators.min(0), Validators.max(1)]],
  });
  controlKeys = Object.keys(this.form.controls);

  defaultMinMax = {
    min: 0,
    max: 1,
  };
  meta = {
    red: this.defaultMinMax,
    green: this.defaultMinMax,
    blue: this.defaultMinMax,
    hue: { min: -Infinity, max: Infinity },
    saturation: this.defaultMinMax,
    lightness: this.defaultMinMax,
    brightness: this.defaultMinMax,
    alpha: this.defaultMinMax,
  };

  private _color!: paper.Color;
  public get color(): paper.Color {
    return this._color;
  }
  @Input()
  public set color(value: paper.Color) {
    if (value !== this._color) {
      this._color = value;
      (value as any).changes$?.subscribe((che: any) => {
        // console.log('has changes', che);
        this.updateFromColor();
      });
      this.updateFromColor();
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    for (const key of this.controlKeys) {
      const control = this.form.get(key);
      control?.valueChanges
        .pipe(filter((v) => control.valid))
        .subscribe((v) => {
          // console.log('got local change %s: %f', key, control.value);
          (this.color as any)[key] = control.value;
        });
    }
  }

  updateFromColor() {
    if (!this.color) {
      return;
    }
    // tslint:disable-next-line: forin
    for (const key of this.controlKeys) {
      // console.log('patching %s from color', key);
      const colorKeyValue = (this.color as any)[key];

      // console.log('  %s: %d', key, colorKeyValue);
      this.form.get(key)?.patchValue(colorKeyValue, { emitEvent: false });
    }
  }
}
