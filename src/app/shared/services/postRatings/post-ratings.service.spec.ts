import { TestBed } from '@angular/core/testing';

import { PostRatingsService } from './post-ratings.service';

describe('PostRatingsService', () => {
  let service: PostRatingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostRatingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
