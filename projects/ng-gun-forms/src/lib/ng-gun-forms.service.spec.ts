import { TestBed } from '@angular/core/testing';

import { NgGunFormsService } from './ng-gun-forms.service';

describe('NgGunFormsService', () => {
  let service: NgGunFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgGunFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
