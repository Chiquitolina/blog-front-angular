import { TestBed } from '@angular/core/testing';

import { LinkedinAuthService } from './linkedin-auth.service';

describe('LinkedinAuthService', () => {
  let service: LinkedinAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkedinAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
