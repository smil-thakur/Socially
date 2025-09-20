import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BentoViewer } from './bento-viewer';

describe('BentoViewer', () => {
  let component: BentoViewer;
  let fixture: ComponentFixture<BentoViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BentoViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(BentoViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
