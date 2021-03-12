import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorFormComponent } from './vector-form.component';

describe('VectorFormComponent', () => {
  let component: VectorFormComponent;
  let fixture: ComponentFixture<VectorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
