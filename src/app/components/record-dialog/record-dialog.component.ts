import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialog } from '@angular/material/dialog';
import { KeycloakOperationService } from '../../services/keycloak.service';
import { CommonModule } from '@angular/common';
import { SectionEventService } from '../../services/section-event.service';
import { IndividualEventService } from '../../services/individual-event.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-record-dialog',
  standalone: true,
  imports: [MatDialogContent, CommonModule],
  templateUrl: './record-dialog.component.html',
  styleUrl: './record-dialog.component.css'
})
export class RecordDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private keycloakService: KeycloakOperationService,
    private sectionEventService: SectionEventService,
    private individualEventService: IndividualEventService,
    public dialog: MatDialog
  ){}

  role!: string;
  
  ngOnInit(): void {
    if (this.keycloakService.getUserRoles().includes("Coach")) {
      this.role = "Coach";
    }
    else {
      this.role = "Client";
    }
  }

  deleteEvent(type: string, id: string) {
    if (type == "section") {
      this.sectionEventService.deleteSectionEvent(id).subscribe((any) => {
        this.alert("Успешно!", "Занятие удалено!");
      });
    }
    else if (type == "individual") {
      this.individualEventService.deleteEvent(id).subscribe((any) => {
        this.alert("Успешно!", "Занятие удалено!");
      })
    }
    
  }

  alert(msgType: string, msg: string) {
    this.dialog.open(AlertComponent, {
      data: {
        msgType: msgType,
        msg: msg
      }
    }).afterClosed().subscribe(any => {
      window.location.reload();
    });
  }
}
