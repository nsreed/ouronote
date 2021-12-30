import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedUsersComponent } from './invited-users.component';

describe('InvitedUsersComponent', () => {
  let component: InvitedUsersComponent;
  let fixture: ComponentFixture<InvitedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
