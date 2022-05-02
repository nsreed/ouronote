import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../user.service';
import * as paper from 'paper';
import { map, shareReplay } from 'rxjs/operators';
import { RE_VALID_HEX_COLOR } from '../../functions/constants';

@Component({
  selector: 'app-favorite-colors',
  templateUrl: './favorite-colors.component.html',
  styleUrls: ['./favorite-colors.component.scss'],
})
export class FavoriteColorsComponent implements OnInit {
  readonly colors = this.userService.user.get('favorites').get('colors');

  mode = 'view';
  colors$ = this.colors.open().pipe(
    map((v: any, i) => {
      Object.keys(v)
        .filter(
          (k) =>
            v[k] === null ||
            (!RE_VALID_HEX_COLOR.test(k) && !RE_VALID_HEX_COLOR.test(v[k]))
        )
        .forEach((k) => delete v[k]);
      return v;
    }),
    map((v: any) =>
      Object.keys(v)
        .map((k) => {
          const value = RE_VALID_HEX_COLOR.test(k) ? k : v[k];

          return {
            key: k,
            value,
            color: RE_VALID_HEX_COLOR.test(value)
              ? new paper.Color(value)
              : null,
          };
        })
        .filter((c: any) => RE_VALID_HEX_COLOR.test(c.value))
        .sort((a, b) => {
          const ac = a.color as paper.Color;
          const bc = b.color as paper.Color;
          if (ac && bc) {
            const diff = ac.hue - bc.hue;
            // console.log(`comparing`, ac.saturation, bc.saturation);
            if (ac.hue === bc.hue) {
              return 0;
            } else if (ac.hue < bc.hue) {
              return -1;
            } else {
              return 1;
            }
          }

          return 0;
        })
    ),
    shareReplay(1)
  );

  @Output()
  public color$ = new EventEmitter<string>();

  constructor(public readonly userService: UserService) {
    this.colors$.subscribe((cs) => console.log('colors', cs));
  }

  ngOnInit(): void {}

  add(color: any) {
    if (color instanceof paper.Color) {
      let hex = color.toCSS(true);
      hex += color.hasAlpha() ? Math.round(color.alpha * 255).toString(16) : '';
      this.colors.get(hex).put(hex);
    }
  }

  onColorClick(key: string, value: any) {
    if (key.startsWith('#')) {
      this.color$.emit(key);
    } else {
      this.color$.emit(value);
    }
  }
}
