import { TestBed } from '@angular/core/testing';

import { OuronoteGunService } from './ouronote-gun.service';

describe('OuronoteGunService', () => {
  let service: OuronoteGunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OuronoteGunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
