import { TestBed } from '@angular/core/testing';

import { PendingShiftService } from './pending-shift.service';

describe('PendingShiftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingShiftService = TestBed.get(PendingShiftService);
    expect(service).toBeTruthy();
  });
});
