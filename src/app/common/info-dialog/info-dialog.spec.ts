import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDialog } from './info-dialog';

describe('InfoDialog', () => {
  let component: InfoDialog;
  let fixture: ComponentFixture<InfoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
