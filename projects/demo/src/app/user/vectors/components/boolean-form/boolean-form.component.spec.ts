import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanFormComponent } from './boolean-form.component';

describe('BooleanFormComponent', () => {
  let component: BooleanFormComponent;
  let fixture: ComponentFixture<BooleanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooleanFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
