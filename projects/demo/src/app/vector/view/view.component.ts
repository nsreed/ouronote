import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, map, shareReplay, switchMap } from 'rxjs/operators';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';

@Component({
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  vectorShallow$ = this.route.data.pipe(pluck('vector'));
  vectorNode$ = this.vectorShallow$.pipe(map((v) => this.ngGun.get(v._['#'])));
  layersNode$ = this.vectorNode$.pipe(map((v) => v.get('layers')));
  layersValue$ = this.layersNode$.pipe(switchMap((l) => l.open()));
  constructor(private route: ActivatedRoute, private ngGun: NgGunService) {
    route.data.pipe(pluck('vector')).subscribe(console.log);
    this.layersValue$.subscribe(console.log);
  }

  ngOnInit(): void {}
}
