import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { pluck, map, shareReplay, switchMap, mapTo } from 'rxjs/operators';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';
import { VectorGraph } from '../../user/VectorGraph';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '../../components/about/about.component';

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

  is$ = timer(0, 1000).pipe(map(() => (this.ngGun.gun.user() as any).is));

  editClicked = false;

  vectorPub!: string;
  constructor(
    private route: ActivatedRoute,
    private ngGun: NgGunService,
    private dialog: MatDialog
  ) {
    route.data.pipe(pluck('vector')).subscribe((v) => {
      this.vectorPub = v._['#'];
    });
  }

  ngOnInit(): void {}

  about() {
    this.dialog.open(AboutComponent);
  }
}
