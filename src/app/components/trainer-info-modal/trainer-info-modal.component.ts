import { Component, Inject, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-trainer-info-modal',
  standalone: true,
  imports: [MatDialogModule, MatTabsModule],
  templateUrl: './trainer-info-modal.component.html',
  styleUrl: './trainer-info-modal.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrainerInfoModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TrainerInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}
  
  ngOnInit(): void {
    
  }
}
