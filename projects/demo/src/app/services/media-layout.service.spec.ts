import { TestBed } from '@angular/core/testing';

import { MediaLayoutService } from './media-layout.service';

describe('MediaLayoutService', () => {
  let service: MediaLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
