import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePageScreen } from './base-page-screen';

describe('BasePageScreen', () => {
  let component: BasePageScreen;
  let fixture: ComponentFixture<BasePageScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasePageScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasePageScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
