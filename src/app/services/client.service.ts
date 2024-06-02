import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url = "http://localhost:5092/api/admin/clients/";

  constructor(
    private http: HttpClient
  ) { }

  getClient(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  updateClient(client: IClient, image: File): Observable<any> {
    let formData = new FormData();
    formData.append('Body.name', client.name);
    formData.append('Body.surname', client.surname);
    formData.append('Body.phone', client.phone);

    if (image) {
      formData.append('Body.image', image);
    }

    return this.http.put(this.url, formData);
  }

  getClientsList(): Observable<any> {
    return this.http.get(this.url);
  }
}
