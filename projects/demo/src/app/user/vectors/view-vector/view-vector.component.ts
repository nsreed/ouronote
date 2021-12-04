import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
import { NgGunService } from 'projects/ng-gun/src/public-api';

@Component({
  templateUrl: './view-vector.component.html',
  styleUrls: ['./view-vector.component.scss'],
})
export class ViewVectorComponent
  extends RouteVectorDirective
  implements OnInit, AfterViewInit
{
  constructor(
    vectorService: VectorService,
    route: ActivatedRoute,
    private ngZone: NgZone,
    private fb: FormBuilder,
    ngGun: NgGunService,
    private sanitizer: DomSanitizer,
    public userService: UserService
  ) {
    super(vectorService, route, ngGun as any, userService);
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
