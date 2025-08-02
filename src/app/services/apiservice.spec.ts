import { TestBed } from '@angular/core/testing';

import { APIservice } from './apiservice';

describe('APIservice', () => {
  let service: APIservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
