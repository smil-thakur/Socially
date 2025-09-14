import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioScreen } from './portfolio-screen';

describe('PortfolioScreen', () => {
  let component: PortfolioScreen;
  let fixture: ComponentFixture<PortfolioScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
