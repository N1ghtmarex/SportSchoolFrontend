import { TestBed } from '@angular/core/testing';

import { SectionEventService } from './section-event.service';

describe('SectionEventService', () => {
  let service: SectionEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
