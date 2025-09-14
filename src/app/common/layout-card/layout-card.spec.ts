import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCard } from './layout-card';

describe('LayoutCard', () => {
  let component: LayoutCard;
  let fixture: ComponentFixture<LayoutCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
