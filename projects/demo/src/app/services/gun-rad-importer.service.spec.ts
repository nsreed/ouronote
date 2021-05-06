import { TestBed } from '@angular/core/testing';

import { GunRadImporterService } from './gun-rad-importer.service';

describe('GunRadImporterService', () => {
  let service: GunRadImporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GunRadImporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
