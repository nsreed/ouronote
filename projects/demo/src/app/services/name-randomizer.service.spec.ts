import { TestBed } from '@angular/core/testing';

import { NameRandomizerService } from './name-randomizer.service';

describe('NameRandomizerService', () => {
  let service: NameRandomizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameRandomizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
