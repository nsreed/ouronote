import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorLoaderComponent } from './vector-loader.component';

describe('VectorLoaderComponent', () => {
  let component: VectorLoaderComponent;
  let fixture: ComponentFixture<VectorLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
