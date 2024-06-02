import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISection } from '../../models/section';
import { Subscription } from 'rxjs';
import { SectionEventService } from '../../services/section-event.service';
import { ISectionEvent } from '../../models/sectionEvent';
import { Calendar } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { SectionService } from '../../services/section.service';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakOperationService } from '../../services/keycloak.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent implements OnInit {
  schedule = false;

  section!: ISection;
  sectionSubscription!: Subscription;
  sectionEvents!: ISectionEvent[];
  userSections!: ISection[];
  entered!: boolean;
  role!: string;
  userProfile!: any;

  amICoach!: boolean;

  sectionName!: string;

  constructor(
    private route: ActivatedRoute,
    private sectionEventService: SectionEventService,
    private sectionService: SectionService,
    private keycloakService: KeycloakOperationService
  ) {}

  ngOnInit(): void {
    if (this.keycloakService.getUserRoles().includes("Coach")) {
      this.role = "Coach";
    }
    else {
      this.role = "Client";
      //this.getEnteredSections();
      
    }
    

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
      allDaySlot: false
    })

    this.sectionSubscription = this.route.data.subscribe((data) => {
      this.section = data["data"];
      console.log(data['data']);

      this.keycloakService.getUserProfile().then((data: any) => {
        if (data.id == this.section.coach.externalId){
          this.amICoach = true;
        }
        else {
          this.amICoach = false;
        }
      })

      this.sectionService.isInSection(this.section.id).subscribe((any) => {
        this.entered = any;
      })
      
      this.sectionEventService.getSectionEvents(this.route.snapshot.params["id"]).subscribe((any) => {
        this.sectionEvents = any.items;
        console.log(any);
        if (this.sectionEvents) {
          for (var item in this.sectionEvents) {
            
            calendar.addEvent({
              extendedProps: this.sectionEvents[item],
              title: 'Занятие секции: ' + this.sectionEvents[item].section.name,
              daysOfWeek: [this.sectionEvents[item].dayOfWeek],
              startTime: this.sectionEvents[item].startTime,
              endTime: this.sectionEvents[item].endTime
            })
          }
        }

        calendar.render();
      })
    });

  }

  getSectionEvents() {
    this.sectionEventService.getSectionEvents(this.route.snapshot.params["id"]).subscribe((any) => {
      this.sectionEvents = any.items;
    })
  }

  getEnteredSections() {
    this.sectionService.getEnteredSections().subscribe((any) => {
      this.userSections = any.items;
      for (var i in this.userSections) {
        if (this.userSections[i].id == this.section.id)
          this.entered = true;
      }
    })
  }

  enterSection() {
    this.sectionService.enterSection(this.section.id).subscribe((any) => {
      window.location.reload();
    })
  }

  leaveSection() {
    this.sectionService.leaveSection(this.section.id).subscribe((any) => {
      window.location.reload();
    })
  }

  deleteSection() {
    this.sectionService.deleteSection(this.section.id).subscribe((any) => {
      window.location.href = 'sections/page/1';
    })
  }
}
