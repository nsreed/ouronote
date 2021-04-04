import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVectorComponent } from './create-vector.component';

describe('CreateVectorComponent', () => {
  let component: CreateVectorComponent;
  let fixture: ComponentFixture<CreateVectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
