import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IIndividualEvent } from '../../models/individualEvent';
import { CommonModule } from '@angular/common';
import { KeycloakOperationService } from '../../services/keycloak.service';
import { IndividualEventService } from '../../services/individual-event.service';

@Component({
  selector: 'app-individual-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './individual-event.component.html',
  styleUrl: './individual-event.component.scss'
})
export class IndividualEventComponent implements OnInit {
  individualSubscription!: Subscription;
  individualEvent!: IIndividualEvent;
  role!: string;

  isInEvent!: string

  constructor(
    private route: ActivatedRoute,
    private keycloakService: KeycloakOperationService,
    private individualEventService: IndividualEventService
  ) { }

  ngOnInit(): void {
    this.individualSubscription = this.route.data.subscribe((any) => {
      this.individualEvent = any['data'];
    });

    if (this.keycloakService.getUserRoles().includes("Coach")) {
      this.role = "Coach";
    }
    else {
      this.role = "Client";
    }

    this.individualEventService.isUserInIndividualEvent(this.individualEvent.id).subscribe((res) => {
        this.isInEvent = res;
    })
  }

  enterEvent() {
    this.individualEventService.enterEvent(this.individualEvent.id).subscribe(() => {
      window.location.reload();
    });
  }

  leaveEvent() {
    this.individualEventService.leaveEvent(this.individualEvent.id).subscribe(() => {
      window.location.reload();
    });
  }
  
  deleteEvent() {
    this.individualEventService.deleteEvent(this.individualEvent.id).subscribe(() => {
      window.location.reload();
    });
  }
}
