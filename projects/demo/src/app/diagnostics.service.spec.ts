import { TestBed } from '@angular/core/testing';

import { DiagnosticsService } from './diagnostics.service';

describe('DiagnosticsService', () => {
  let service: DiagnosticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
