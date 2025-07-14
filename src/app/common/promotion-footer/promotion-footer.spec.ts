import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionFooter } from './promotion-footer';

describe('PromotionFooter', () => {
  let component: PromotionFooter;
  let fixture: ComponentFixture<PromotionFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
