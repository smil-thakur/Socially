import { TestBed } from '@angular/core/testing';

import { UserCacheManager } from './user-cache-manager';

describe('UserCacheManager', () => {
  let service: UserCacheManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCacheManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
