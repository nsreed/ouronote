import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorGradientComponent } from './color-gradient.component';

describe('ColorGradientComponent', () => {
  let component: ColorGradientComponent;
  let fixture: ComponentFixture<ColorGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorGradientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
