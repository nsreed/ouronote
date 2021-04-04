import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVectorComponent } from './view-vector.component';

describe('ViewVectorComponent', () => {
  let component: ViewVectorComponent;
  let fixture: ComponentFixture<ViewVectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
