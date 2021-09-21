import { TestBed } from '@angular/core/testing';

import { SupportVariablesService } from './support-variables.service';

describe('SupportVariablesService', () => {
  let service: SupportVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
