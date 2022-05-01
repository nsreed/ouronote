import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteColorsComponent } from './favorite-colors.component';

describe('FavoriteColorsComponent', () => {
  let component: FavoriteColorsComponent;
  let fixture: ComponentFixture<FavoriteColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteColorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
