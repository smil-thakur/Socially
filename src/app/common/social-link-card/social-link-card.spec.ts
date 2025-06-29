import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLinkCard } from './social-link-card';

describe('SocialLinkCard', () => {
  let component: SocialLinkCard;
  let fixture: ComponentFixture<SocialLinkCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialLinkCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialLinkCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
