import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgGunFormsComponent } from './ng-gun-forms.component';

describe('NgGunFormsComponent', () => {
  let component: NgGunFormsComponent;
  let fixture: ComponentFixture<NgGunFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgGunFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgGunFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
