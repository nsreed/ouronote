import { TestBed } from '@angular/core/testing';

import { MessageResolver } from './message.resolver';

describe('MessageResolver', () => {
  let resolver: MessageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MessageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
