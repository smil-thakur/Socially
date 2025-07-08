import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLinkViewer } from './social-link-viewer';

describe('SocialLinkViewer', () => {
  let component: SocialLinkViewer;
  let fixture: ComponentFixture<SocialLinkViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialLinkViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialLinkViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
