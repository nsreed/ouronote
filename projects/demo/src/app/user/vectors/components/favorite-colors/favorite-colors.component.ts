import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../user.service';
import * as paper from 'paper';
import { map } from 'rxjs/operators';

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
        .filter((k) => v[k] === null)
        .forEach((k) => delete v[k]);
      return v;
    })
  );

  @Output()
  public color$ = new EventEmitter<string>();

  constructor(public readonly userService: UserService) {}

  ngOnInit(): void {}

  add(color: any) {
    if (color instanceof paper.Color) {
      const hex = color.toCSS(true);
      console.log('saving', hex);
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
