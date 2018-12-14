import { TestBed } from '@angular/core/testing';

import { SuitService } from './suit.service';

describe('SuitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuitService = TestBed.get(SuitService);
    expect(service).toBeTruthy();
  });
});
