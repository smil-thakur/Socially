import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeScreen } from './resume-screen';

describe('ResumeScreen', () => {
  let component: ResumeScreen;
  let fixture: ComponentFixture<ResumeScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
