import { TestBed } from '@angular/core/testing';

import { TimeEndService } from './time-end.service';

describe('TimeEndService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeEndService = TestBed.get(TimeEndService);
    expect(service).toBeTruthy();
  });
});
