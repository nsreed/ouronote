import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorControlComponent } from './selector-control.component';

describe('SelectorControlComponent', () => {
  let component: SelectorControlComponent;
  let fixture: ComponentFixture<SelectorControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
