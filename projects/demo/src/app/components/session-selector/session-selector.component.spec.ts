import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSelectorComponent } from './session-selector.component';

describe('SessionSelectorComponent', () => {
  let component: SessionSelectorComponent;
  let fixture: ComponentFixture<SessionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
