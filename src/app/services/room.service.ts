import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:5092/api/admin/rooms"
  
  getRoomList(): Observable<any> {
    return this.http.get(this.url);
  }
}
