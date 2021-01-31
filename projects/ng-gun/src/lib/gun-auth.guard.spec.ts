import { TestBed } from '@angular/core/testing';

import { GunAuthGuard } from './gun-auth.guard';

describe('GunAuthGuard', () => {
  let guard: GunAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GunAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
