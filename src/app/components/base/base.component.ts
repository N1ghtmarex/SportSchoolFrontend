import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { register } from 'swiper/element/bundle';
import { TrainerInfoModalComponent } from '../trainer-info-modal/trainer-info-modal.component';
import { KeycloakOperationService } from '../../services/keycloak.service';
import { RouterModule } from '@angular/router';
import { ICoach } from '../../models/coach';
import { CoachService } from '../../services/coach.service';
import { CommonModule } from '@angular/common';
import { serverUrl } from '../../environments/dev';



register();

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class BaseComponent implements OnInit {
  trainer!: Array<any>;
  coachs!: ICoach[];
  
  constructor(
    public dialog: MatDialog,
    private keycloakService: KeycloakOperationService,
    private coachService: CoachService
  ) {}


  ngOnInit(): void {
    this.coachService.getCoachsList().subscribe(any => {
      this.coachs = any.items;      
    })

    var btn = document.getElementById('btn');

    if (this.keycloakService.isLoggedIn()){
      btn!.style.visibility = 'hidden';
    }
  }

  test(id: string) {
    console.log(id);
  }

  login(){
    this.keycloakService.login();
  }

  register(){
    this.keycloakService.register();
  }


  openDialog(coach: ICoach) {
    console.log(coach);
    const dialogRef = this.dialog.open(TrainerInfoModalComponent, {
      data: coach,
      width: '900px',
      height: '500px',
      panelClass: 'dialog-panel',
      autoFocus: true,
      restoreFocus: false
    });
  }
}
