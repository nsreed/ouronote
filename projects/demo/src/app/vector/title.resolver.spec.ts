import { TestBed } from '@angular/core/testing';

import { TitleResolver } from './title.resolver';

describe('TitleResolver', () => {
  let resolver: TitleResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TitleResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
