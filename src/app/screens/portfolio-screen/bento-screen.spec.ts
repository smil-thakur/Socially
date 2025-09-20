import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BentoScreen } from './bento-screen';

describe('BentoScreen', () => {
  let component: BentoScreen;
  let fixture: ComponentFixture<BentoScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BentoScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(BentoScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
