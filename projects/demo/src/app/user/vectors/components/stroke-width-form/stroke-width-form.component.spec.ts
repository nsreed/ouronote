import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrokeWidthFormComponent } from './stroke-width-form.component';

describe('StrokeWidthFormComponent', () => {
  let component: StrokeWidthFormComponent;
  let fixture: ComponentFixture<StrokeWidthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrokeWidthFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrokeWidthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
