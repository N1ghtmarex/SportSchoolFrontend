import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndividualEventService {
  url = "http://localhost:5092/api/admin/individual-event/";

  constructor(
    private http: HttpClient
  ) { }


  getIndividualEvents(filter:string, sportId: string, searchQuery: string, limit: number | string, page: number): Observable<any> {
    let offset = 0;
    if (limit != "" && page > 1) {
      offset = (page - 1) * Number(limit);
    }

    return this.http.get(this.url + `filter=${filter}?SearchQuery=${searchQuery}&SportId=${sportId}&Limit=${limit}&Offset=${offset}`);
  }

  getClientsEvents(): Observable<any> {
    return this.http.get(this.url + "my")
  }

  getIndividualEvent(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  addIndividualEvent(
    startDate: string,
    endTime: Time,
    sportId: string,
    roomId: string
  ): Observable<any> {
    return this.http.post(this.url, {
      startDate: startDate,
      endTime: endTime,
      sportId: sportId,
      roomId: roomId
    });
  }

  isUserInIndividualEvent(eventId: string): Observable<string> {
    return this.http.get<string>(this.url + `is-entered/${eventId}`);
  }

  enterEvent(eventId: string): Observable<any> {
    return this.http.post(this.url + `enter/${eventId}`, null);
  }

  leaveEvent(eventId: string): Observable<any> {
    return this.http.post(this.url + `leave/${eventId}`, null);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(this.url + `delete/${eventId}`);
  }
}
