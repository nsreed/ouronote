import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable, timer } from 'rxjs';
import {
  pluck,
  map,
  shareReplay,
  switchMap,
  mapTo,
  delay,
  mergeAll,
  take,
  takeUntil,
  takeWhile,
} from 'rxjs/operators';
import { NgGunService } from 'ng-gun';
import { VectorGraph } from '../../user/VectorGraph';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '../../components/about/about.component';
import { LicenseDialogComponent } from '../../components/license-dialog/license-dialog.component';
import { License } from '../../License';

@Component({
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit, AfterViewInit {
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

  is$ = timer(0, 1000).pipe(
    map(() => (this.ngGun.gun.user() as any).is),
    takeWhile(() => this.editLink !== null && this.editLink !== undefined)
  );

  editClicked = false;

  vectorPub!: string;

  @ViewChild('EditLink')
  editLink?: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private ngGun: NgGunService,
    private dialog: MatDialog
  ) {
    route.data.pipe(pluck('vector')).subscribe((v) => {
      this.vectorPub = v._['#'];
    });
  }

  onCopyrightClick() {
    this.route.data.pipe(pluck('vector')).subscribe((v) => {
      this.vectorPub = v._['#'];
      this.dialog.open(LicenseDialogComponent, {
        data: {
          vectorPub: this.vectorPub,
        },
      });
    });
    // this.vectorNode$.subscribe((vectorNode) => {
    //   const licenseNode = vectorNode.get('license');
    //   licenseNode.open().subscribe((l) => {
    //     console.log(l);
    //   });
    //   from([
    //     licenseNode.open().pipe(take(1)),
    //     licenseNode.not().pipe(mapTo(undefined)),
    //   ])
    //     .pipe(mergeAll(), take(1))
    //     .subscribe((l) => {
    //       this.dialog.open(LicenseDialogComponent, {
    //         data: {
    //           license: l,
    //         },
    //       });
    //     });
    // });
  }

  ngAfterViewInit(): void {
    this.is$.subscribe((is) => {
      if (!is) {
        this.vector$.pipe(delay(1000)).subscribe(() => {
          (this.editLink as any).show();
        });
      }
    });
  }
  ngOnInit(): void {}

  about() {
    this.dialog.open(AboutComponent);
  }
}
