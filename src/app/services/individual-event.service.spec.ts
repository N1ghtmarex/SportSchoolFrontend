import { TestBed } from '@angular/core/testing';

import { IndividualEventService } from './individual-event.service';

describe('IndividualEventService', () => {
  let service: IndividualEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividualEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
