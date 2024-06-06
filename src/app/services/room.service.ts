import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverUrl } from '../environments/dev';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  url = `${serverUrl}/api/admin/rooms`
  
  getRoomList(): Observable<any> {
    return this.http.get(this.url);
  }
}
