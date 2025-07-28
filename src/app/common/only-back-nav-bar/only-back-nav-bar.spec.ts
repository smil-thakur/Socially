import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyBackNavBar } from './only-back-nav-bar';

describe('OnlyBackNavBar', () => {
  let component: OnlyBackNavBar;
  let fixture: ComponentFixture<OnlyBackNavBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlyBackNavBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlyBackNavBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
