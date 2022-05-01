import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ObjectPropertyDirective } from '../../../../directives/object-property.directive';
import * as paper from 'paper';
import { Color } from '@angular-material-components/color-picker';

function paperColorToPicker(color: paper.Color) {
  return new Color(
    color?.red || 0,
    color?.green || 0,
    color?.blue || 0,
    color?.alpha || 1
  );
}

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
  colorCtr = this.fb.control('#000000');
  colorForm = this.fb.group({
    color: this.fb.control('#000000'),
  });

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

  @Input()
  public paperStyle?: paper.Style;

  private _color!: paper.Color;
  public get color(): paper.Color {
    return this._color;
  }
  @Input()
  public set color(value: paper.Color) {
    if (value !== this._color) {
      this._color = value;
      // (value as any).changes$?.subscribe((che: any) => {
      //   // console.log('has changes', che);
      //   this.updateFromColor();
      // });
      this.updateFromColor();
    }
  }

  public get pickerColor() {
    return new Color(
      this.color?.red || 0,
      this.color?.green || 0,
      this.color?.blue || 0,
      this.color?.alpha || 1
    );
  }

  constructor(private fb: FormBuilder, public prop: ObjectPropertyDirective) {}

  ngOnInit(): void {
    // TODO re-enable for rgb/cymk editor
    // for (const key of this.controlKeys) {
    //   const control = this.form.get(key);
    //   control?.valueChanges
    //     .pipe(filter((v) => control.valid))
    //     .subscribe((v) => {
    //       // console.log('got local change %s: %f', key, control.value);
    //       (this.color as any)[key] = control.value;
    //     });
    // }

    this.colorCtr.valueChanges.subscribe((v) => {
      // FIXME this is broken for fillColor (the color passed in was null)
      // this.color?.set([v.r / 255, v.g / 255, v.b / 255, v.a]);
      if (!this.prop.value) {
        this.prop.value = new paper.Color(v.r / 255, v.g / 255, v.b / 255, v.a);
      } else {
        this.prop.value.set([v.r / 255, v.g / 255, v.b / 255, v.a]);
      }
    });
  }

  updateFromColor() {
    this.colorCtr.patchValue(
      this.color ? paperColorToPicker(this.color) : null
    );
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

  onSubmit(evt: Event) {
    evt.stopPropagation();
    evt.preventDefault();
  }
}
