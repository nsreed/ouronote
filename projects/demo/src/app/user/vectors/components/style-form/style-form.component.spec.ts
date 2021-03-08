import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleFormComponent } from './style-form.component';

describe('StyleFormComponent', () => {
  let component: StyleFormComponent;
  let fixture: ComponentFixture<StyleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
