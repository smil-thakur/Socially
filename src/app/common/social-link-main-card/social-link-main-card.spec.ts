import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLinkMainCard } from './social-link-main-card';

describe('SocialLinkMainCard', () => {
  let component: SocialLinkMainCard;
  let fixture: ComponentFixture<SocialLinkMainCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialLinkMainCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialLinkMainCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
