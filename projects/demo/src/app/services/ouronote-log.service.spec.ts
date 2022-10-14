import { TestBed } from '@angular/core/testing';

import { OuronoteLogService } from './ouronote-log.service';

describe('OuronoteLogService', () => {
  let service: OuronoteLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OuronoteLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
