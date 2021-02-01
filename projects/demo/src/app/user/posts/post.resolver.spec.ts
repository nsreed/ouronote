import { TestBed } from '@angular/core/testing';

import { PostResolver } from './post.resolver';

describe('PostResolver', () => {
  let resolver: PostResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PostResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
