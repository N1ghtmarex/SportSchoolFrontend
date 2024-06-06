import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AddEventDialogComponent } from '../../add-event-dialog/add-event-dialog.component';
import { KeycloakOperationService } from '../../../services/keycloak.service';
import { ClientService } from '../../../services/client.service';
import { IClient } from '../../../models/client';
import { CoachService } from '../../../services/coach.service';
import { ICoach } from '../../../models/coach';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  role!: any
  name!: any
  surname!: any
  patronymic!: any
  userProfile: any | null = null;
  id!: string;
  client!: IClient;
  coach!: ICoach;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private keycloakService: KeycloakOperationService,
    private clientService: ClientService,
    private coachService: CoachService
  ) {
    
  }

  ngOnInit(): void {  
    if (this.keycloakService.isLoggedIn()){
      this.keycloakService.getUserProfile().then((data: any) => {
        this.userProfile = data;
        console.table(this.userProfile);
        
        if (this.keycloakService.getUserRoles().includes("Coach")) {
          this.role = "Coach";
          this.coachService.getCoach(data.id).subscribe(any => {
            this.coach = any;
          })
        }
        else if (this.keycloakService.getUserRoles().includes("Admin")){
          this.role = "Admin";
        }
        else {
          this.role = "Client";
          this.clientService.getClient(this.userProfile.id).subscribe(any => {
            this.client = any;
          })
        }

        var name = document.getElementById('username')
        if (name) {
          name.textContent = this.userProfile.firstName + ' ' + this.userProfile.lastName
        }
      });
    } 
  }

  openAddEventForm() {
    const dialogRef = this.dialog.open(AddEventDialogComponent);
  }

  goto(path: string) {
    window.location.href = path;
  }

  logout(){
    this.keycloakService.logout();
  }

  login(){
    this.keycloakService.login();
  }
}
