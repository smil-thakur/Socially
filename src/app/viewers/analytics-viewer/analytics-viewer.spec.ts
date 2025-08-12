import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsViewer } from './analytics-viewer';

describe('AnalyticsViewer', () => {
  let component: AnalyticsViewer;
  let fixture: ComponentFixture<AnalyticsViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
