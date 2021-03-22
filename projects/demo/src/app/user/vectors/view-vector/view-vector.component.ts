import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgGunService } from 'ng-gun';
import { RouteVectorDirective } from '../route-vector.directive';
import { VectorService } from '../vector.service';
import {
  switchMap,
  mergeMapTo,
  mergeMap,
  scan,
  filter,
  map,
} from 'rxjs/operators';
import { UserService } from '../../user.service';
import { CertificatesComponent } from '../../../components/certificates/certificates.component';

@Component({
  templateUrl: './view-vector.component.html',
  styleUrls: ['./view-vector.component.scss'],
})
export class ViewVectorComponent
  extends RouteVectorDirective
  implements OnInit, AfterViewInit {
  owner$ = this.vectorNode$.pipe(
    mergeMap((node) =>
      node.get('owner').map({ includeKeys: true }).on({ includeKeys: true })
    ),
    filter(
      (ownerTuple: any) =>
        ownerTuple[0] &&
        ownerTuple[1] === this.userService.user.is.pub.replace('~', '')
    ),
    map((ownerTuple) => ownerTuple[0])
  );
  certs$ = this.vectorNode$.pipe(switchMap((node) => node.get('certs').open()));

  constructor(
    vectorService: VectorService,
    route: ActivatedRoute,
    private ngZone: NgZone,
    private fb: FormBuilder,
    ngGun: NgGunService,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {
    super(vectorService, route, ngGun as any);
    this.owner$.subscribe((owner) => console.log('owner', owner));
    this.certs$.subscribe((certs: any) => console.log('certs', certs));
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // this.vectorNode$.subscribe((node) => {
    //   console.log('got vector node', node);
    //   node
    //     .get('owner')
    //     .once()
    //     .subscribe((owner) => console.log('owned by', owner));
    //   node
    //     .get('certs')
    //     .map()
    //     .on()
    //     .subscribe((certs) => console.log('certs', certs));
    // });
  }
}
