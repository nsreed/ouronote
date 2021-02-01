/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NgSeaService } from './ng-sea.service';

describe('Service: NgSea', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgSeaService]
    });
  });

  it('should ...', inject([NgSeaService], (service: NgSeaService) => {
    expect(service).toBeTruthy();
  }));
});
