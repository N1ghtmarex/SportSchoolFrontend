import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerInfoModalComponent } from './trainer-info-modal.component';

describe('TrainerInfoModalComponent', () => {
  let component: TrainerInfoModalComponent;
  let fixture: ComponentFixture<TrainerInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerInfoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
