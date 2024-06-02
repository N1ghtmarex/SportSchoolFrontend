import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { individualEventResolver } from './individual-event.resolver';

describe('individualEventResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => individualEventResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
