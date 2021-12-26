import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, map, shareReplay, switchMap } from 'rxjs/operators';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';
import { VectorGraph } from '../../user/VectorGraph';

@Component({
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  vectorShallow$ = this.route.data.pipe(pluck('vector'));
  vectorNode$ = this.vectorShallow$.pipe(
    map((v) => this.ngGun.get(v._['#'])),
    shareReplay(1)
  );
  layersNode$ = this.vectorNode$.pipe(map((v) => v.get('layers')));
  layersValue$ = this.layersNode$.pipe(switchMap((l) => l.open()));
  vector$ = this.vectorNode$.pipe(
    switchMap((node) => node.on()),
    shareReplay(1)
  );
  owner$ = this.vectorNode$.pipe(
    switchMap((n) => n.get('owner').on({ clean: true })),
    shareReplay(1)
  );
  vectorPub!: string;
  constructor(private route: ActivatedRoute, private ngGun: NgGunService) {
    route.data.pipe(pluck('vector')).subscribe((v) => {
      this.vectorPub = v._['#'];
    });
  }

  ngOnInit(): void {}
}
