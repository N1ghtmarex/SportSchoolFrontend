import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Calendar } from 'fullcalendar';
import { RecordDialogComponent } from '../record-dialog/record-dialog.component';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { SectionService } from '../../services/section.service';
import { ISectionEvent } from '../../models/sectionEvent';
import { IndividualEventService } from '../../services/individual-event.service';
import { IIndividualEvent } from '../../models/individualEvent';
import { DatePipe, registerLocaleData } from '@angular/common';


@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  sectionEvents!: ISectionEvent[]
  individualEvents!: IIndividualEvent[]

  constructor(
    public dialog: MatDialog,
    private sectionService: SectionService,
    private individualEventService: IndividualEventService,
    private datePipe: DatePipe)
  {}
  
  ngOnInit(): void {
    let calendar = new Calendar(document.getElementById('calendar')!, {
      plugins: [ dayGridPlugin, timeGridPlugin ],
      initialView: 'timeGridWeek',
      headerToolbar: {
        right: 'timeGridDay,timeGridWeek,prev,next',
      },
      buttonText: {
        day: 'День',
        week: 'Неделя'
      },
      slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hourCycle: 'h23'
      },
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false,
        hourCycle: 'h23'
      },
      locale: 'ru-RU',
      slotMinTime: '8:00',
      height: 'auto',
      allDaySlot: false,
      timeZone: "Asia/Yekaterinburg",
      eventClick: this.openDialog.bind(this)
    })
    //Секции
    this.sectionService.getSectionEvents().subscribe((any) => {
      
      this.sectionEvents = any.items;
      for (var i in this.sectionEvents) {
        calendar.addEvent({
          extendedProps: {
            id: this.sectionEvents[i].id,
            type: "section",
            title: "Занятие секции: " + this.sectionEvents[i].section.name,
            startTime: this.sectionEvents[i].startTime,
            endTime: this.sectionEvents[i].endTime,
            sport: this.sectionEvents[i].section.sport.name,
            room: this.sectionEvents[i].section.room.name,
            coach: this.sectionEvents[i].section.coach
          },
          title: 'Занятие секции: ' + this.sectionEvents[i].section.name,
          daysOfWeek: [this.sectionEvents[i].dayOfWeek],
          startTime: this.sectionEvents[i].startTime,
          endTime: this.sectionEvents[i].endTime,
          color: "#14A44D"
        })
      }
    })

    //Индивидуальные
    this.individualEventService.getClientsEvents().subscribe((any) => {
      this.individualEvents = any.items;
      console.log(any.items);
      let color = "";
      for (var i in this.individualEvents) {
        if (this.individualEvents[i].clientId != null) {
          color = "#14A44D";
        }
        else {
          color = "#a6acaf";
        }
        calendar.addEvent({
          extendedProps: {
            id: this.individualEvents[i].id,
            type: "individual",
            title: "Индивидуальное занятие",
            startTime: this.datePipe.transform(this.individualEvents[i].startTime, "EEEE, d MMMM, y, h:mm", "Asia/Yekaterinburg", "ru"),
            endTime: this.datePipe.transform(this.individualEvents[i].endTime, "EEEE, d MMMM, y, h:mm", "Asia/Yekaterinburg", "ru"),
            sport: this.individualEvents[i].sport.name,
            room: this.individualEvents[i].room.name,
            coach: this.individualEvents[i].coach
          },
          title: 'Индивидуальное занятие',
          start:  this.individualEvents[i].startTime,
          end: this.individualEvents[i].endTime,
          color: color
        });
      }
    })
    

    calendar.render()
  }
  
  openDialog(data: any) {
    console.log(data.event.extendedProps)
    const dialogRef = this.dialog.open(RecordDialogComponent, {
      data: data
    });
  }

  getSectionEvents() {
    this.sectionService.getSectionEvents().subscribe((any) => {
      console.log(any);
    })
  }
}

