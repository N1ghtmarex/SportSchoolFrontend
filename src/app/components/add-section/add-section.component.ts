import { Component, ElementRef, OnInit } from '@angular/core';
import { IRoom } from '../../models/room';
import { ISport } from '../../models/sport';
import { MatDialog } from '@angular/material/dialog';
import { RoomService } from '../../services/room.service';
import { SectionService } from '../../services/section.service';
import { SportService } from '../../services/sport.service';
import { Observable, catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-section',
  standalone: true,
  imports: [MatFormField, MatLabel, MatSelect, MatOption, CommonModule, MatInput, MatButtonModule, FormsModule, MatHint],
  templateUrl: './add-section.component.html',
  styleUrl: './add-section.component.scss'
})
export class AddSectionComponent implements OnInit {
  sectionName!: string;
  description = "";

  image!: File;

  rooms!: IRoom[];
  roomId!: string;

  sports!: ISport[];
  sportId!: string;
  errorMessage!: IError;
  
  constructor(
    private roomService: RoomService,
    private sportService: SportService,
    private sectionService: SectionService,
    public dialog: MatDialog,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "assets/js/addSectionScript.js";
    this.elementRef.nativeElement.appendChild(script);

    this.roomService.getRoomList().subscribe((any) => {
      this.rooms = any.items;
    });

    this.sportService.getSportList().subscribe((any) => {
      this.sports = any.items;
    });
  }

  addSection() {
    console.log(this.description);
    this.sectionService.addSection(this.image, this.sectionName, this.description, this.sportId, this.roomId)
    .pipe(catchError((error: HttpErrorResponse, caught: Observable<any>): Observable<any> => {
      this.errorMessage = error.error;
      if (this.errorMessage.Message == undefined) {
        this.errorMessage.Message = "Ошибка при создании!";
      }
      this.alert("Ошибка!", this.errorMessage.Message);

      return of();
    }))
    .subscribe((data) => {
      this.dialog.open(AlertComponent, { data: {
        msgType: "Успешно!",
        msg: "Секция добавлена!"
      }}).afterClosed().subscribe(() => {
        window.location.reload();
      });
    }
    )
  }

  initImage(event: any) {
    this.image = <File>event.target.files[0];
  }

  alert(msgType: string, msg: string) {
    this.dialog.open(AlertComponent, {
      data: {
        msgType: msgType,
        msg: msg
      }
    });
  }
}

export interface IError {
  Message: string
}
