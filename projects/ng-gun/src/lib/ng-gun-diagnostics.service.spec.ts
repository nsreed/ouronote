/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NgGunDiagnosticsService } from './ng-gun-diagnostics.service';

describe('Service: NgGunDiagnostics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgGunDiagnosticsService]
    });
  });

  it('should ...', inject([NgGunDiagnosticsService], (service: NgGunDiagnosticsService) => {
    expect(service).toBeTruthy();
  }));
});
