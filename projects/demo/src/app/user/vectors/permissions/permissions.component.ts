import { Component, NgZone, OnInit, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgGunService } from 'projects/ng-gun/src/public-api';
import { UserService } from '../../user.service';
import { RouteVectorDirective } from '../route-vector.directive';
import { VectorService } from '../vector.service';

@Component({
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent
  extends RouteVectorDirective
  implements OnInit, AfterViewInit
{
  constructor(
    vectorService: VectorService,
    route: ActivatedRoute,
    private ngZone: NgZone,
    private fb: UntypedFormBuilder,
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
