import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliasAutocompleteComponent } from './alias-autocomplete.component';

describe('AliasAutocompleteComponent', () => {
  let component: AliasAutocompleteComponent;
  let fixture: ComponentFixture<AliasAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AliasAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AliasAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
