import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteRequestsComponent } from './invite-requests.component';

describe('InviteRequestsComponent', () => {
  let component: InviteRequestsComponent;
  let fixture: ComponentFixture<InviteRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
