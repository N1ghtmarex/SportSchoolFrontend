import { Component, ElementRef, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { KeycloakOperationService } from '../../services/keycloak.service';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../models/client';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ICoach } from '../../models/coach';
import { CoachService } from '../../services/coach.service';
import { serverUrl } from '../../environments/dev';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatFormField, MatInput, MatLabel, MatButton, CommonModule, NgxMaskDirective, NgxMaskPipe, FormsModule],
  providers: [provideNgxMask()],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  client!: IClient;

  coach!: ICoach;

  pic!: string;
  image!: File;
  role!: string;
  name!: string;
  surname!: string;
  phone!: string;

  constructor(
    private keycloakService: KeycloakOperationService,
    private elementRef: ElementRef,
    private clientService: ClientService,
    private coachService: CoachService
  ) {}

  ngOnInit(): void {
    this.keycloakService.getUserProfile().then((data: any) => {

      if (this.keycloakService.getUserRoles().includes("Coach")) {
        this.role = "Coach";
      }
      else {
        this.role = "Client";
      }

      if (this.role == "Client") {
        this.clientService.getClient(data.id).subscribe(any => {
          this.client = any;
          this.name = this.client.name;
          this.surname = this.client.surname;
          this.phone = this.client.phone;
          this.pic = `${serverUrl}/users/${any.imageFileName}`;
        });
      }
      if (this.role == "Coach") {
        this.coachService.getCoach(data.id).subscribe(any => {
          this.coach = any;
          this.name = this.coach.name;
          this.surname = this.coach.surname;
          this.phone = this.coach.phone;
          this.pic = `${serverUrl}/users/${any.imageFileName}`;
        })
      }
    })

    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "assets/js/addSectionScript.js";
    this.elementRef.nativeElement.appendChild(script);
  }

  initImage(event: any) {
    this.image = <File>event.target.files[0];
  }

  save() {
    if (this.client && this.client.phone.length == 10) {
      this.clientService.updateClient(this.client, this.image).subscribe(any => {
        window.location.reload();
      });
    }
    else if (this.coach && this.coach.phone.length == 10) {
      this.coachService.updateCoach(this.coach, this.image).subscribe(any => {
        window.location.reload();
      });
    }
  }

  cancel() {
    window.location.reload();
  }
}
