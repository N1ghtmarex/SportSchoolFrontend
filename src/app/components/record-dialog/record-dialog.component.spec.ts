import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDialogComponent } from './record-dialog.component';

describe('RecordDialogComponent', () => {
  let component: RecordDialogComponent;
  let fixture: ComponentFixture<RecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
