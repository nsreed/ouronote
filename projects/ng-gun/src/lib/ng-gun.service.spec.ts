import { TestBed } from '@angular/core/testing';

import { NgGunService } from './ng-gun.service';

describe('NgGunService', () => {
  let service: NgGunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgGunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
