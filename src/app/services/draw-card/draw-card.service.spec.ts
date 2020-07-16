import { TestBed } from '@angular/core/testing';

import { DrawCardService } from './draw-card.service';

describe('DrawCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrawCardService = TestBed.get(DrawCardService);
    expect(service).toBeTruthy();
  });
});
