import { TestBed } from '@angular/core/testing';

import { ActiveRouteService } from './active-route.service';

describe('ActiveRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActiveRouteService = TestBed.get(ActiveRouteService);
    expect(service).toBeTruthy();
  });
});
