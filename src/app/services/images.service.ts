import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  url = "http://localhost:5092/api/admin/images/";

  constructor(
    private http: HttpClient
  ) { }

  getImage(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }
}
