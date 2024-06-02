import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  register(
    image: File,
    email: string,
    password: string,
    phone: string,
    name: string,
    surname: string
  ): Observable<any> {
    let formData = new FormData();
    formData.append('Body.image', image);
    formData.append('Body.email', email);
    formData.append('Body.password', password);
    formData.append('Body.phone', phone);
    formData.append('Body.name', name);
    formData.append('Body.surname', surname);

    return this.http.post("http://localhost:5092/api/admin/register", formData);
  }
  
}
