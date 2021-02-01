import { TestBed } from '@angular/core/testing';

import { VectorResolver } from './vector.resolver';

describe('VectorResolver', () => {
  let resolver: VectorResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VectorResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
