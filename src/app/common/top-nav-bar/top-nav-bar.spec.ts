import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavBar } from './top-nav-bar';

describe('TopNavBar', () => {
  let component: TopNavBar;
  let fixture: ComponentFixture<TopNavBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNavBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopNavBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
