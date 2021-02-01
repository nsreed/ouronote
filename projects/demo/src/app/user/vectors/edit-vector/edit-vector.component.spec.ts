import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVectorComponent } from './edit-vector.component';

describe('EditVectorComponent', () => {
  let component: EditVectorComponent;
  let fixture: ComponentFixture<EditVectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
