import { TestBed } from '@angular/core/testing';

import { DamService } from './dam.service';

describe('DamService', () => {
  let service: DamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
