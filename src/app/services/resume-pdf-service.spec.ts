import { TestBed } from '@angular/core/testing';

import { ResumePdfService } from './resume-pdf-service';

describe('ResumePdfService', () => {
  let service: ResumePdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumePdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
