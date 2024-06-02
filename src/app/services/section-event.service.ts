import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionEventService {

  constructor(
    private http: HttpClient
  ) { }

  url = "http://localhost:5092/api/admin/section-event/";

  getSectionEvents(sectionId: string): Observable<any> {
    return this.http.get(this.url + sectionId);
  }

  addSectionEvent(
    dayOfWeek: number,
    startTime: Time,
    endTime: Time,
    period: Date,
    sectionId: string,
  ): Observable<any> {
    return this.http.post(this.url, {
      dayOfWeek: dayOfWeek,
      startTime: startTime,
      endTime: endTime,
      period: period,
      sectionId: sectionId
    });
  }

  deleteSectionEvent(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
