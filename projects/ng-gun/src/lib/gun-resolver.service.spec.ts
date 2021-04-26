import { TestBed } from '@angular/core/testing';

import { GunResolverService } from './gun-resolver.service';

describe('GunResolverService', () => {
  let service: GunResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GunResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
