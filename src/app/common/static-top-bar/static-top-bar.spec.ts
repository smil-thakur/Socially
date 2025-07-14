import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticTopBar } from './static-top-bar';

describe('StaticTopBar', () => {
  let component: StaticTopBar;
  let fixture: ComponentFixture<StaticTopBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticTopBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticTopBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
