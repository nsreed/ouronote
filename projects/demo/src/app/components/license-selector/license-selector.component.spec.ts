import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseSelectorComponent } from './license-selector.component';

describe('LicenseSelectorComponent', () => {
  let component: LicenseSelectorComponent;
  let fixture: ComponentFixture<LicenseSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
