import { CommonModule, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../services/section.service';
import { ISection } from '../../models/section';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ISectionEvent } from '../../models/sectionEvent';
import { SectionEventService } from '../../services/section-event.service';
import { ISport } from '../../models/sport';
import { SportService } from '../../services/sport.service';
import { IRoom } from '../../models/room';
import { RoomService } from '../../services/room.service';
import { IndividualEventService } from '../../services/individual-event.service';

@Component({
  selector: 'app-add-event-dialog',
  standalone: true,
  imports: [CommonModule, MatFormField, MatLabel, MatSelect, MatOption, MatInput, MatButtonModule, FormsModule],
  templateUrl: './add-event-dialog.component.html',
  styleUrl: './add-event-dialog.component.css'
})
export class AddEventDialogComponent implements OnInit {
  constructor(
    private sectionService: SectionService,
    private sectionEventService: SectionEventService,
    private sportService: SportService,
    private roomService: RoomService,
    private individualEventService: IndividualEventService
  ){}

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

  ngOnInit(): void {
    this.sectionService.getSections("", "", "", 0).subscribe((any) => {
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
    this.sectionEventService.addSectionEvent(
      this.dayOfWeek,
      this.startTime,
      this.endTime,
      this.period,
      this.sectionId
    ).subscribe((any) => {
      console.log(any);
    })
  }

  addIndividualEvent() {
    this.individualEventService.addIndividualEvent(
      this.startDateOnly.toString() + " " + this.startTimeOnly,
      this.duration,
      this.sportId,
      this.roomId
    ).subscribe((any) => {
      console.log(any);
    })
  }
}
