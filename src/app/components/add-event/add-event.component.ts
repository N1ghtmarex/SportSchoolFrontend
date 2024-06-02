import { CommonModule, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ISection } from '../../models/section';
import { IRoom } from '../../models/room';
import { ISport } from '../../models/sport';
import { IndividualEventService } from '../../services/individual-event.service';
import { RoomService } from '../../services/room.service';
import { SectionEventService } from '../../services/section-event.service';
import { SectionService } from '../../services/section.service';
import { SportService } from '../../services/sport.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { Observable, catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IError } from '../add-section/add-section.component';
import { error } from 'console';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    CommonModule, 
    MatFormField, 
    MatLabel, 
    MatSelect, 
    MatOption, 
    MatInput, 
    MatButtonModule, 
    FormsModule, 
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss',
  providers: [provideNgxMask()]
})
export class AddEventComponent implements OnInit {
  constructor(
    private sectionService: SectionService,
    private sectionEventService: SectionEventService,
    private sportService: SportService,
    private roomService: RoomService,
    private individualEventService: IndividualEventService,
    public dialog: MatDialog
  ) {}

  filter = 'section';

  sections!: ISection[];
  sectionId!: string;
  startTime!: Time;
  endTime!: Time;
  period!: Date;
  dayOfWeek!: number;

  sports!: ISport[];
  sportId!: string;

  rooms!: IRoom[];
  roomId!: string;
  startDateOnly!: Date;
  startTimeOnly!: Time;
  duration!: Time;

  errorMessage!: IError;

  ngOnInit(): void {
    this.sectionService.getUserSections("", "", "", 0).subscribe((any) => {
      this.sections = any.items;
    });

    this.sportService.getSportList().subscribe((any) => {
      this.sports = any.items;
    });

    this.roomService.getRoomList().subscribe((any) => {
      this.rooms = any.items;
    });
  }

  addSectionEvent() {    
    if (this.sectionId == undefined) {
      this.alert("Ошибка!", "Выберите секцию!");
    }
    else if (this.dayOfWeek == undefined) {
      this.alert("Ошибка!", "Выберите день недели!");
    }
    else if (this.startTime == undefined) {
      this.alert("Ошибка!", "Укажите время начала занятия!");
    }
    else if (this.endTime == undefined) {
      this.alert("Ошибка!", "Укажите время окончания занятия!");
    }
    else if (this.endTime <= this.startTime) {
      this.alert("Ошибка!", "Время окончания должно превышать время начала!");
    }
    else if (this.period == undefined) {
      this.alert("Ошибка!", "Укажите период проведения занятия!");
    }
    else {
      this.sectionEventService.addSectionEvent(
        this.dayOfWeek,
        this.startTime,
        this.endTime,
        this.period,
        this.sectionId
      )
      .pipe(catchError((error: HttpErrorResponse): Observable<any> => {
        this.errorMessage = error.error;
        this.alert("Ошибка!", this.errorMessage.Message);

        return of();
      }))
      .subscribe((any) => {
        this.alert("Успешно!", "Занятие добавлено!");
      });
    }
  }

  addIndividualEvent() {
    if (this.sportId == undefined) {
      this.alert("Ошибка!", "Выберите вид спорта!");
    }
    else if (this.roomId == undefined) {
      this.alert("Ошибка!", "Выберите зал!");
    }
    else if (this.startDateOnly == undefined) {
      this.alert("Ошибка!", "Укажите дату проведения занятия!");
    }
    else if (this.startTimeOnly == undefined) {
      this.alert("Ошибка!", "Укажите время начала занятия!");
    }
    else if (this.duration == undefined) {
      this.alert("Ошибка!", "Укажите время окончания занятия!");
    }
    else if (this.duration <= this.startTimeOnly) {
      this.alert("Ошибка!", "Время окончания должно превышать время начала!");
    }
    else {
      this.individualEventService.addIndividualEvent(
        this.startDateOnly.toString() + " " + this.startTimeOnly,
        this.duration,
        this.sportId,
        this.roomId
      )
      .pipe(catchError((error: HttpErrorResponse): Observable<any> => {
        this.errorMessage = error.error;
        this.alert("Ошибка!", this.errorMessage.Message);

        return of();
      }))
      .subscribe((any) => {
        this.alert("Успешно!", "Занятие добавлено!");
      });
    }
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
