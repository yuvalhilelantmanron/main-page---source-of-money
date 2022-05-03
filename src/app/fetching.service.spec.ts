import { TestBed } from '@angular/core/testing';

import { FetchingService } from './fetching.service';

describe('FetchingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchingService = TestBed.get(FetchingService);
    expect(service).toBeTruthy();
  });
});
