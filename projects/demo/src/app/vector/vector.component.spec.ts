import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorComponent } from './vector.component';

describe('VectorComponent', () => {
  let component: VectorComponent;
  let fixture: ComponentFixture<VectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
