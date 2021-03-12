import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionInfoComponent } from './session-info.component';

describe('SessionInfoComponent', () => {
  let component: SessionInfoComponent;
  let fixture: ComponentFixture<SessionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
