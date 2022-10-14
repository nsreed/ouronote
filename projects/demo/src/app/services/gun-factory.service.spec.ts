import { TestBed } from '@angular/core/testing';

import { GunFactoryService } from './gun-factory.service';

describe('GunFactoryService', () => {
  let service: GunFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GunFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
