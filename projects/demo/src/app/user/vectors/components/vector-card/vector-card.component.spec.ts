import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorCardComponent } from './vector-card.component';

describe('VectorCardComponent', () => {
  let component: VectorCardComponent;
  let fixture: ComponentFixture<VectorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
