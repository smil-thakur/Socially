import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsScreen } from './analytics-screen';

describe('AnalyticsScreen', () => {
  let component: AnalyticsScreen;
  let fixture: ComponentFixture<AnalyticsScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
