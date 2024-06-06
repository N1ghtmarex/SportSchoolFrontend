import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICoach } from '../models/coach';
import { serverUrl } from '../environments/dev';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(
    private http: HttpClient
  ) { }

  url = `${serverUrl}/api/admin/coachs`;

  createCoach(
    externalId: string,
    institution: string,
    faculty: string,
    speciality: string,
    educationForm: string,
    qualification: string,
    job: string,
    jobTitle: string,
    jobPeriod: string
  ):Observable<any> {
    return this.http.post(this.url, {
      externalId: externalId,
      institution: institution,
      faculty: faculty,
      speciality: speciality,
      educationForm: educationForm,
      qualification: qualification,
      job: job,
      jobTitle: jobTitle,
      jobPeriod: jobPeriod
    })
  }

  getCoachsList(): Observable<any> {
    return this.http.get(this.url);
  }

  getCoach(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  updateCoach(coach: ICoach, image: File): Observable<any> {
    let formData = new FormData();
    formData.append('Body.name', coach.name);
    formData.append('Body.surname', coach.surname);
    formData.append('Body.phone', coach.phone);
    formData.append('Body.institution', coach.institution);
    formData.append('Body.faculty', coach.faculty);
    formData.append('Body.speciality', coach.speciality);
    formData.append('Body.educationForm', coach.educationForm);
    formData.append('Body.qualification', coach.qualification);
    formData.append('Body.job', coach.job);
    formData.append('Body.jobTitle', coach.jobTitle);
    formData.append('Body.jobPeriod', coach.jobPeriod);

    if (image) {
      formData.append('Body.image', image);
    }

    return this.http.put(this.url, formData);
  }
}
