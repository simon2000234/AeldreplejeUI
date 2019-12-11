import { TestBed } from '@angular/core/testing';

import { TimeStartService } from './time-start.service';

describe('TimeStartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeStartService = TestBed.get(TimeStartService);
    expect(service).toBeTruthy();
  });
});
