import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../models/client';
import { ICoach } from '../../models/coach';
import { CoachService } from '../../services/coach.service';

@Component({
  selector: 'app-create-coach',
  standalone: true,
  imports: [MatFormField, MatLabel, MatSelect, MatOption, CommonModule, MatInput, MatButtonModule, FormsModule, MatHint],
  templateUrl: './create-coach.component.html',
  styleUrl: './create-coach.component.scss'
})
export class CreateCoachComponent implements OnInit {
  constructor(
    private clientService: ClientService,
    private coachService: CoachService
  ) {}

  clients!: IClient[];

  clientId!: string;
  institution!: string;
  faculty!: string;
  speciality!: string;
  educationForm!: string;
  qualification!: string;
  job!: string;
  jobTitle!: string;
  jobPeriod!: string;

  ngOnInit(): void {
    this.clientService.getClientsList().subscribe(any => {
      this.clients = any.items;
    })
  }

  createCoach() {
    this.coachService.createCoach(
      this.clientId,
      this.institution,
      this.faculty,
      this.speciality,
      this.educationForm,
      this.qualification,
      this.job, 
      this.jobTitle, 
      this.jobPeriod
    ).subscribe(any => {
      console.log(any);
    })
  }
}
