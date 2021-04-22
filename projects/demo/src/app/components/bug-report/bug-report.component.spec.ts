/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BugReportComponent } from './bug-report.component';

describe('BugReportComponent', () => {
  let component: BugReportComponent;
  let fixture: ComponentFixture<BugReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
