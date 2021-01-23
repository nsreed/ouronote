import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgGunComponent } from './ng-gun.component';

describe('NgGunComponent', () => {
  let component: NgGunComponent;
  let fixture: ComponentFixture<NgGunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgGunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgGunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
