import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLinksScreen } from './social-links-screen';

describe('SocialLinksScreen', () => {
  let component: SocialLinksScreen;
  let fixture: ComponentFixture<SocialLinksScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialLinksScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialLinksScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
