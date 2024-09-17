import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/user';
  constructor(private http: HttpClient) { }

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(user: {
    email: string, password: string,
    firstName: string,
    lastName: string, phoneNumber: string
  }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  editUser(id: number, user: {
    email: string, password: string,
    firstName: string,
    lastName: string, phoneNumber: string
  }): Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }

}
