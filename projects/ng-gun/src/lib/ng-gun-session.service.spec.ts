import { TestBed } from '@angular/core/testing';

import { NgGunSessionService } from './ng-gun-session.service';

describe('NgGunSessionService', () => {
  let service: NgGunSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgGunSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
