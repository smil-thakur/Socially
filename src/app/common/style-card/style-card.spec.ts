import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleCard } from './style-card';

describe('StyleCard', () => {
  let component: StyleCard;
  let fixture: ComponentFixture<StyleCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyleCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyleCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
