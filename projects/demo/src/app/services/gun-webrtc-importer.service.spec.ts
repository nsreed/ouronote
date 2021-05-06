import { TestBed } from '@angular/core/testing';

import { GunWebrtcImporterService } from './gun-webrtc-importer.service';

describe('GunWebrtcImporterService', () => {
  let service: GunWebrtcImporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GunWebrtcImporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
