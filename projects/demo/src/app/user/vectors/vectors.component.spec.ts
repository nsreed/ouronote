import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorsComponent } from './vectors.component';

describe('VectorsComponent', () => {
  let component: VectorsComponent;
  let fixture: ComponentFixture<VectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
