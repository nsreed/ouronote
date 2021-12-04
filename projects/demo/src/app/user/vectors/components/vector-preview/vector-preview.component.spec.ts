import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorPreviewComponent } from './vector-preview.component';

describe('VectorPreviewComponent', () => {
  let component: VectorPreviewComponent;
  let fixture: ComponentFixture<VectorPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
