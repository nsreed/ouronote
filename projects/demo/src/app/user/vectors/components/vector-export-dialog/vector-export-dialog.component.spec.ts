import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorExportDialogComponent } from './vector-export-dialog.component';

describe('VectorExportDialogComponent', () => {
  let component: VectorExportDialogComponent;
  let fixture: ComponentFixture<VectorExportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorExportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorExportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
