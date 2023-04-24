import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserWarningComponent } from './browser-warning.component';

describe('BrowserWarningComponent', () => {
  let component: BrowserWarningComponent;
  let fixture: ComponentFixture<BrowserWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserWarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
