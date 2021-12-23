import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionIntersectModeFormComponent } from './selection-intersect-mode-form.component';

describe('SelectionIntersectModeFormComponent', () => {
  let component: SelectionIntersectModeFormComponent;
  let fixture: ComponentFixture<SelectionIntersectModeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionIntersectModeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionIntersectModeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
