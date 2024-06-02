import { ɵnormalizeQueryParams } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  sectionUrl = "http://localhost:5092/api/admin/sections"
  sectionEventUrl = "http://localhost:5092/api/admin/section-event"

  addSection(
    image: File, 
    name: string, 
    description: string,
    sportId: string, 
    roomId: string
  ): Observable<any> {
    let formData = new FormData();
    formData.append('Body.image', image);
    formData.append('Body.name', name);
    formData.append('Body.description', description);
    formData.append('Body.sportId', sportId);
    formData.append('Body.roomId', roomId);

    return this.http.post(this.sectionUrl, formData);
  }

  getSections(sportId: string, searchQuery: string, limit: number | string, page: number): Observable<any> {
    let offset = 0;
    if (limit != "" && page > 1) {
      offset = (page - 1) * Number(limit);
    }
    return this.http.get(this.sectionUrl + `/?SearchQuery=${searchQuery}&SportId=${sportId}&Limit=${limit}&Offset=${offset}`);
  }

  getUserSections(sportId: string, searchQuery: string, limit: number | string, page: number): Observable<any> {
    let offset = 0;
    if (limit != "" && page > 1) {
      offset = (page - 1) * Number(limit);
    }
    return this.http.get(this.sectionUrl + `/entered/?SearchQuery=${searchQuery}&SportId=${sportId}&Limit=${limit}&Offset=${offset}`);
  }

  getSection(id: string): Observable<any> {
    return this.http.get(this.sectionUrl + "/" + id);
  }

  getEnteredSections(): Observable<any> {
    return this.http.get(this.sectionUrl + "/entered");
  }

  enterSection(id: string): Observable<any> {
    return this.http.post(this.sectionUrl + "/enter", {
      sectionId: id
    })
  }

  leaveSection(id: string): Observable<any> {
    return this.http.post(this.sectionUrl + "/leave", {
      sectionId: id
    })
  }

  getSectionEvents(): Observable<any> {
    return this.http.get(this.sectionEventUrl);
  }

  deleteSection(id: string): Observable<any> {
    return this.http.delete(this.sectionUrl + "/remove/" + id);
  }

  isInSection(id: string): Observable<any> {
    return this.http.get(this.sectionUrl + "/is-entered/" + id);
  }
}
